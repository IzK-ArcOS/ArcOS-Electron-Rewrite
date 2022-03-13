import { Themes } from "./themeLogic";
import type { UserTemplate } from "./userLogic";
import type { WindowData as WindowData } from "./appLogic";
import { openedWindows, Windows } from "./stores";
import { get } from "svelte/store";

export function dragWindow(elmnt: HTMLElement) {
  elmnt = elmnt as HTMLDivElement;
  const titlebar = elmnt.childNodes[0]! as HTMLDivElement;

  elmnt.addEventListener("mousedown", (e: MouseEvent) => {
    if (e.composedPath().includes(titlebar)) {
      const target = elmnt;
      let xA: number, yA: number, xB: number, yB: number;

      e.preventDefault();

      document.onmousemove = (e: MouseEvent) => {
        xA = xB - e.clientX;
        yA = yB - e.clientY;

        xB = e.clientX;
        yB = e.clientY;

        target.style.top = target.offsetTop - yA + "px";
        target.style.left = target.offsetLeft - xA + "px";
      };

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };

      toFront(elmnt);
    }
  });
}

export function generateWindowStyle(
  userData: UserTemplate,
  app: WindowData
): string {
  const theme = Themes.get(userData.theme)!;

  let str = "";

  if (theme) {
    const backgr = theme.variables.windowBackground;
    const color = theme.variables.fontColor;
    const border = theme.variables.windowBorder;

    const colorCSS = `background-color: ${backgr}; color: ${color};`;

    const startPosCSS = `top: ${app.pos?.y || 50}px; left: ${
      app.pos?.x || 50
    }px;`;

    const maxSizeCSS = app.maxSize
      ? `max-width: ${app.maxSize?.w}px; max-height: ${app.maxSize?.h}px`
      : "";

      const minSizeCSS = app.minSize
      ? `min-width: ${app.minSize?.w}px; min-height: ${app.minSize?.h}px`
      : "";

    const sizeCSS = app.size
      ? `width: ${app.size?.w}px; height: ${app.size?.h}px`
      : "";

    console.log(backgr,color,border,startPosCSS,maxSizeCSS,sizeCSS,minSizeCSS)


    str = `border: ${border}; ${colorCSS} resize: ${
      app.resizable ? "both" : "none"
    }; ${startPosCSS} ${maxSizeCSS}; ${sizeCSS}; ${minSizeCSS}`;
  }

  return str;
}

export function toFront(element: HTMLElement) {
  element = element as HTMLDivElement;

  maxZIndex += 10;

  element.style.zIndex = `${maxZIndex}`;
}

export function minimizeWindow(wD: WindowData) {
  const lW = get(Windows);

  for (let i = 0; i < lW.length; i++) {
    if (lW[i].id == wD.id && lW[i].name == wD.name) {
      lW[i].state.min = !lW[i].state.min;
    }
  }

  Windows.set(lW);
}

export function openWindow(wD: WindowData) {
  const lW = get(Windows);

  for (let i = 0; i < lW.length; i++) {
    if (lW[i].id == wD.id && lW[i].name == wD.name) {
      lW[i].state.min = false;
      lW[i].state.cls = false;

      toFront(document.getElementById(`window#${wD.id}`)!);

      const openWin = get(openedWindows);
      const winData = { name: lW[i].name, id: lW[i].id };

      if (!isOpenedWindow(winData.id, winData.name)) {
        openWin.push(winData);
      }

      openedWindows.set(openWin);
    }
  }

  Windows.set(lW);
}

export function isOpenedWindow(id: string, name: string): boolean {
  const openWin = get(openedWindows);

  for (let i = 0; i < openWin.length; i++) {
    if (openWin[i].name == name && openWin[i].id == id) {
      return true;
    }
    continue;
  }
  return false;
}

export function closeWindow(wD: WindowData) {
  const lW = get(Windows);

  for (let i = 0; i < lW.length; i++) {
    if (lW[i].id == wD.id && lW[i].name == wD.name) {
      lW[i].state.cls = true;

      const openWin = get(openedWindows);
      const winData = { name: lW[i].name, id: lW[i].id };

      for (let i = 0; i < openWin.length; i++) {
        if (openWin[i].id == winData.id && openWin[i].name == winData.name) {
          openWin.splice(i, 1);
        }
        continue;
      }

      openedWindows.set(openWin);
    }
  }

  Windows.set(lW);
}

export function maximizeWindow(e: HTMLElement, wD: WindowData) {
  const lW = get(Windows);

  for (let i = 0; i < lW.length; i++) {
    if (lW[i].id == wD.id && lW[i].name == wD.name) {
      if (!lW[i].state.max) {
        lW[i].size = {
          w: e.clientWidth,
          h: e.clientHeight,
        };
        lW[i].pos = {
          x: parseInt(e.style.left.replace("px", "")),
          y: parseInt(e.style.top.replace("px", "")),
        };
      } else {
        e.style.top = `${lW[i].pos!.y || 50}px`;
        e.style.left = `${lW[i].pos!.x || 50}px`;
        e.style.width = `${lW[i].size!.w || 300}px`;
        e.style.height = `${lW[i].size!.h || 300}px`;
      }

      lW[i].state.max = !lW[i].state.max;
    }
  }

  Windows.set(lW);
}

export function getWindowData(name: string, id: string): WindowData | false {
  for (let i = 0; i < get(Windows).length; i++) {
    const window = get(Windows)[i];
    if (window.id == id && window.name == name) {
      return window;
    }
    continue;
  }
  return false;
}

export let maxZIndex: number = 10;
