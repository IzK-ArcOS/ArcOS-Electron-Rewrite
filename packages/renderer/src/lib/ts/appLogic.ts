import type { SvelteComponentDev } from "svelte/internal";
import debuggerApp from "../apps/debugger.svelte";

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
}
