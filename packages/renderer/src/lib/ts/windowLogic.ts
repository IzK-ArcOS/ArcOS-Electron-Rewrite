import { Themes } from "./themeLogic";
import type { UserTemplate } from "./userLogic";
import type { Window } from "./appLogic";

export function dragWindow(elmnt: HTMLElement) {
  elmnt = elmnt as HTMLDivElement;

  elmnt.addEventListener("mousedown", () => {
    const titlebar = elmnt.childNodes[0]! as HTMLDivElement;
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (titlebar) {
      titlebar.onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      toFront(elmnt);
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchmove = null;
      document.ontouchend = null;
    }
  });
}

export function generateWindowStyle(
  userData: UserTemplate,
  app: Window
): string {
  const theme = Themes.get(userData.theme)!;

  const backgr = theme.variables.windowBackground;
  const color = theme.variables.fontColor;
  const border = theme.variables.windowBorder;

  let str = "";

  const colorCSS = `background-color: ${backgr}; color: ${color};`;

  const startPosCSS = ``; /* `top: ${app.startPos?.y || 50}px; left: ${
    app.startPos?.x || 50
  }px;` */

  const maxSizeCSS = app.maxSize
    ? `max-width: ${app.maxSize?.w}; max-height: ${app.maxSize?.h}`
    : "";

  str = `border: ${border}; ${colorCSS} resize: ${
    app.resizable ? "both" : "none"
  }; ${startPosCSS} ${maxSizeCSS};`;

  return str;
}

export function toFront(element: HTMLElement) {
  element = element as HTMLDivElement;

  maxZIndex += 10;

  element.style.zIndex = `${maxZIndex}`;
}

export let maxZIndex: number = 10;
