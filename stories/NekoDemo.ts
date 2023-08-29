import "./storyStyle.css";
import { Neko, NekoSizeVariations } from "./dist/neko-ts";
// import { Neko, NekoSizeVariations } from "../src";

export function RenderPage() {
  const app = document.createElement("div");
  app.id = "app";

  // Neko
  const nekoContainer = document.createElement("div");
  nekoContainer.id = "nekoContainer";
  app.appendChild(nekoContainer);

  const restingPlace = document.createElement("div");
  restingPlace.id = "restingPlace";
  nekoContainer.appendChild(restingPlace);

  let neko: Neko | null = null;

  document.addEventListener("DOMContentLoaded", () => {
    neko = new Neko({
      nekoId: 1,
      nekoSize: NekoSizeVariations.SMALL,
      speed: 10,
      origin: {
        x: restingPlace.offsetLeft + restingPlace.offsetWidth / 2,
        y: restingPlace.offsetTop + restingPlace.offsetHeight / 2,
      },
      parent: nekoContainer,
      defaultState: "sleep",
    });
  });

  // Neko end

  const disableButton = document.createElement("button");
  const enableButton = document.createElement("button");
  enableButton.disabled = neko && (neko as Neko).isAwake ? true : false;
  disableButton.disabled = neko && (neko as Neko).isAwake ? false : true;

  disableButton.id = "disable";
  disableButton.innerText = "Sleep";
  disableButton.onclick = () => {
    if (neko && neko.isAwake) {
      neko.sleep();
      disableButton.disabled = true;
      enableButton.disabled = false;
    }
  };

  enableButton.id = "enable";
  enableButton.innerText = "Wake up ";
  enableButton.onclick = () => {
    if (neko && !neko.isAwake) {
      neko.wake();
      disableButton.disabled = false;
      enableButton.disabled = true;
    }
  };

  const content = document.createElement("div");
  content.className = "row";
  content.appendChild(disableButton);
  content.appendChild(enableButton);

  app.appendChild(content);

  return app;
}
