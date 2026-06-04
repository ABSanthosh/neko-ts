#!/usr/bin/env python3
"""
Process all breed PNGs in src/breeds/:
  - Make the cyan-blue background (0, 174, 240) fully transparent via tRNS
  - Crop to the top 4 sprite rows (4×32 + 3×1px gaps = 131px height)
Uses only Python stdlib — no external packages needed.
"""
import struct, zlib, os

BACKGROUND_COLOR = (0, 174, 240)
KEEP_HEIGHT = 4 * 32 + 3 * 1  # 131px
BREEDS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "breeds")
PNG_SIG = b"\x89PNG\r\n\x1a\n"


def crc32(data):
    return struct.pack(">I", zlib.crc32(data) & 0xFFFFFFFF)


def encode_chunk(ctype, data):
    return struct.pack(">I", len(data)) + ctype + data + crc32(ctype + data)


def decode_chunks(raw):
    assert raw[:8] == PNG_SIG, "Not a PNG file"
    chunks, pos = [], 8
    while pos < len(raw):
        length = struct.unpack(">I", raw[pos : pos + 4])[0]
        ctype = raw[pos + 4 : pos + 8]
        data = raw[pos + 8 : pos + 8 + length]
        chunks.append((ctype, data))
        pos += 12 + length
    return chunks


def process(path):
    with open(path, "rb") as f:
        raw = f.read()

    chunks = decode_chunks(raw)
    by_type = {}
    for ctype, data in chunks:
        by_type.setdefault(ctype, data)

    # Parse IHDR
    ihdr = by_type[b"IHDR"]
    width, height = struct.unpack(">II", ihdr[:8])
    rest_ihdr = ihdr[8:]
    color_type = rest_ihdr[1]
    assert color_type == 3, f"{path}: expected indexed color (type 3), got {color_type}"

    # Find palette indices that match the background color
    plte = by_type[b"PLTE"]
    palette = [(plte[i * 3], plte[i * 3 + 1], plte[i * 3 + 2]) for i in range(len(plte) // 3)]
    bg_indices = [i for i, c in enumerate(palette) if c == BACKGROUND_COLOR]

    # Build updated tRNS (set bg color entries to alpha=0)
    old_trns = bytearray(by_type.get(b"tRNS", b""))
    for idx in bg_indices:
        if idx >= len(old_trns):
            old_trns.extend(b"\xff" * (idx + 1 - len(old_trns)))
        old_trns[idx] = 0
    new_trns = bytes(old_trns)

    # Decompress pixel data and crop to KEEP_HEIGHT rows
    idat = b"".join(d for ct, d in chunks if ct == b"IDAT")
    pixels = zlib.decompress(idat)
    row_bytes = 1 + width  # 1 filter byte + 1 byte/pixel (8-bit indexed)
    crop_h = min(KEEP_HEIGHT, height)
    new_idat = zlib.compress(pixels[: row_bytes * crop_h], 9)

    # Reassemble PNG
    out = [PNG_SIG]
    trns_written = idat_written = False
    for ctype, data in chunks:
        if ctype == b"IHDR":
            out.append(encode_chunk(b"IHDR", struct.pack(">II", width, crop_h) + rest_ihdr))
        elif ctype == b"PLTE":
            out.append(encode_chunk(b"PLTE", data))
            if new_trns and not trns_written:
                out.append(encode_chunk(b"tRNS", new_trns))
                trns_written = True
        elif ctype == b"tRNS":
            if not trns_written:
                out.append(encode_chunk(b"tRNS", new_trns))
                trns_written = True
        elif ctype == b"IDAT":
            if not idat_written:
                out.append(encode_chunk(b"IDAT", new_idat))
                idat_written = True
        else:
            out.append(encode_chunk(ctype, data))

    with open(path, "wb") as f:
        f.write(b"".join(out))

    print(f"  {os.path.basename(path):20s}  {width}x{height} → {width}x{crop_h}  bg_indices={bg_indices}")


print(f"Processing {BREEDS_DIR}\n")
for fn in sorted(os.listdir(BREEDS_DIR)):
    if fn.endswith(".png"):
        process(os.path.join(BREEDS_DIR, fn))
print("\nDone.")
