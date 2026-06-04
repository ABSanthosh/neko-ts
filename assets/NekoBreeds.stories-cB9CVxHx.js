import{r as e}from"./preload-helper-Dcl5TOAQ.js";import{c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./storyStyle-BBTl-8tQ.js";function c(){document.querySelectorAll(`[data-neko]`).forEach(e=>e.remove()),clearInterval(window.nekoInterval)}var l,u,d,f,p,m,h;e((()=>{i(),a(),s(),l=Object.entries(r),u={title:`Neko/Breeds`,parameters:{layout:`fullscreen`}},d=null,f=null,p={name:`Breed Picker`,parameters:{controls:{disable:!0}},render:()=>{c(),d=null;let e=document.createElement(`div`);e.id=`app`;let n=document.createElement(`p`);n.className=`story-desc`,n.textContent=`Click a breed to swap it in. All 35 presets are imported from neko-ts/breeds.`;let r=document.createElement(`code`);r.className=`story-code`,r.textContent=`import { _____ } from 'neko-ts/breeds'`;let i=document.createElement(`div`);i.className=`breed-grid`;function a(e,n,i){d?d.setBreed(n):(c(),d=new o({nekoId:1,breed:n,nekoSize:t.MEDIUM})),r.textContent=`import { ${e} } from 'neko-ts/breeds'`,f&&f.classList.remove(`active`),f=i,i.classList.add(`active`)}l.forEach(([e,t])=>{let n=document.createElement(`button`);n.textContent=e,n.className=`breed-btn`,n.onclick=()=>a(e,t,n),i.appendChild(n)}),e.appendChild(n),e.appendChild(r),e.appendChild(i);let[s,u]=l[0],p=i.firstElementChild;return a(s,u,p),e}},m={name:`Custom Breed (breedSpriteSets)`,parameters:{controls:{disable:!0}},render:()=>{c(),new o({nekoId:1,breed:n,nekoSize:t.MEDIUM});let e=document.createElement(`div`);e.id=`app`;let r=document.createElement(`p`);r.className=`story-desc`,r.textContent=`You can supply your own sprite sheet via BreedConfig. Use breedSpriteSets for a PNG sheet with 8 cols × 4 rows and 1 px gap, or gifSpriteSets for the bundled neko.gif layout (8 cols × 4 rows, no gap). The marmalade breed is running live above as a reference.`;let i=document.createElement(`pre`);return i.className=`story-code story-pre`,i.textContent=[`import { breedSpriteSets } from 'neko-ts';`,``,`const myBreed: BreedConfig = {`,`  src: '/my-cat.png',`,`  spriteSets: breedSpriteSets,`,`  gap: 1,`,`  cols: 8,`,`  rows: 4,`,`};`,``,`new Neko({ breed: myBreed });`].join(`
`),e.appendChild(r),e.appendChild(i),e}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "Breed Picker",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    nukeAll();
    activeNeko = null;
    const root = document.createElement("div");
    root.id = "app";
    const heading = document.createElement("p");
    heading.className = "story-desc";
    heading.textContent = "Click a breed to swap it in. All 35 presets are imported from neko-ts/breeds.";
    const importLine = document.createElement("code");
    importLine.className = "story-code";
    importLine.textContent = \`import { _____ } from 'neko-ts/breeds'\`;
    const grid = document.createElement("div");
    grid.className = "breed-grid";
    function spawn(name: string, breed: BreedConfig, clickedBtn: HTMLButtonElement) {
      if (activeNeko) {
        activeNeko.setBreed(breed);
      } else {
        nukeAll();
        activeNeko = new Neko({
          nekoId: 1,
          breed,
          nekoSize: NekoSizeVariations.MEDIUM
        });
      }
      importLine.textContent = \`import { \${name} } from 'neko-ts/breeds'\`;
      if (activeBtn) activeBtn.classList.remove("active");
      activeBtn = clickedBtn;
      clickedBtn.classList.add("active");
    }
    ALL_BREEDS.forEach(([name, breed]) => {
      const b = document.createElement("button");
      b.textContent = name;
      b.className = "breed-btn";
      b.onclick = () => spawn(name, breed, b);
      grid.appendChild(b);
    });
    root.appendChild(heading);
    root.appendChild(importLine);
    root.appendChild(grid);

    // Spawn the first breed on initial render
    const [firstName, firstBreed] = ALL_BREEDS[0];
    const firstBtn = grid.firstElementChild as HTMLButtonElement;
    spawn(firstName, firstBreed, firstBtn);
    return root;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "Custom Breed (breedSpriteSets)",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    nukeAll();

    // Marmalade as a live example of a custom-supplied BreedConfig
    new Neko({
      nekoId: 1,
      breed: breeds.marmalade,
      nekoSize: NekoSizeVariations.MEDIUM
    });
    const root = document.createElement("div");
    root.id = "app";
    const descEl = document.createElement("p");
    descEl.className = "story-desc";
    descEl.textContent = "You can supply your own sprite sheet via BreedConfig. " + "Use breedSpriteSets for a PNG sheet with 8 cols × 4 rows and 1 px gap, " + "or gifSpriteSets for the bundled neko.gif layout (8 cols × 4 rows, no gap). " + "The marmalade breed is running live above as a reference.";
    const snippet = document.createElement("pre");
    snippet.className = "story-code story-pre";
    snippet.textContent = [\`import { breedSpriteSets } from 'neko-ts';\`, \`\`, \`const myBreed: BreedConfig = {\`, \`  src: '/my-cat.png',\`, \`  spriteSets: breedSpriteSets,\`, \`  gap: 1,\`, \`  cols: 8,\`, \`  rows: 4,\`, \`};\`, \`\`, \`new Neko({ breed: myBreed });\`].join("\\n");
    root.appendChild(descEl);
    root.appendChild(snippet);
    return root;
  }
}`,...m.parameters?.docs?.source}}},h=[`BreedPicker`,`CustomBreed`]}))();export{p as BreedPicker,m as CustomBreed,h as __namedExportsOrder,u as default};