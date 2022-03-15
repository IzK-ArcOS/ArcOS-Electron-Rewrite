import type { SvelteComponentDev } from "svelte/internal";
import debuggerApp from "../apps/debugger.svelte";
import testapp1 from "../apps/testapp1.svelte";
import testapp2 from "../apps/testapp2.svelte";
import { closeWindow, getWindowData } from "./windowLogic";

export const DefaultAppImports: WindowData[] = [
  {
    content: debuggerApp,
    id: "debugger",
    name: "ArcOS Debugger",
    builtin: true,
    headless: false,
    resizable: true,
    controls: { min: true, max: true, cls: true },
    pos: { x: 810, y: 390 },
    minSize: { w: 500, h: 300 },
    state: { min: true, max: false, cls: true },
    register: true,
    menubar: {
      leftItems: [
        {
          caption:"Close",
          click: () => {
            closeWindow(getWindowData("ArcOS Debugger","debugger") as WindowData)
          }
        }
      ],
      rightItems: [
        {
          caption:"Alert!",
          click: () => {
            alert("Alert!!!")
          }
        }
      ]
    }
  },  {
    content: testapp1,
    id: "test1",
    name: "Test Application",
    builtin: true,
    headless: true,
    resizable: true,
    controls: { min: true, max: false, cls: true },
    pos: { x: 810, y: 390 },
    maxSize: { w: 100, h: 100 },
    state: { min: true, max: false, cls: true },
    register: true,
  },
  {
    content: testapp2,
    id: "test2",
    name: "Test Application (2)",
    builtin: true,
    headless: false,
    resizable: false,
    controls: { min: true, max: true, cls: true },
    pos: { x: 510, y: 390 },
    maxSize: { w: 100, h: 100 },
    state: { min: false, max: false, cls: true },
    register: false,
  },
];

export interface WindowData {
  content: typeof SvelteComponentDev;
  id: string;
  name: string;
  builtin: boolean;
  headless: boolean;
  resizable: boolean;
  minSize?: { w: number; h: number };
  maxSize?: { w: number; h: number };
  size?: { w: number; h: number };
  pos?: { x: number; y: number };
  controls: { min: boolean; max: boolean; cls: boolean };
  state: { min: boolean; max: boolean; cls: boolean };
  register: boolean;
  menubar?: WindowMenuBar|false;
}

export interface WindowMenuBar {
  leftItems: WindowMenuBarItem[];
  rightItems?: WindowMenuBarItem[];
}

export interface WindowMenuBarItem {
  caption: string;
  click?: () => void;
  menuItems?: {
    caption: string;
    sep?: boolean;
    click: () => void;
  }[];
  sep?: boolean;
}
