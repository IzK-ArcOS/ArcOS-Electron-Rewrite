import type { SvelteComponentDev } from "svelte/internal";
import testApp from "../apps/testApp.svelte";

export const DefaultAppImports: Window[] = [
  {
    content: testApp,
    id: "testapp",
    name: "Test Application",
    builtin: true,
    headless: false,
    resizable: true,
    controls: { min: true, max: false, cls: false },
    startPos: {x: 810, y: 390},
    maxSize: {w:100, h: 100}
  },  {
    content: testApp,
    id: "testapp",
    name: "Test Application",
    builtin: true,
    headless: false,
    resizable: true,
    controls: { min: true, max: false, cls: false },
    startPos: {x: 510, y: 390},
    maxSize: {w:100, h: 100}
  },
];

export interface Window {
  content: typeof SvelteComponentDev;
  id: string;
  name: string;
  builtin: boolean;
  headless: boolean;
  resizable: boolean;
  minSize?: { w: number; h: number };
  maxSize?: { w: number; h: number };
  startSize?: { w: number; h: number };
  startPos?: { x: number; y: number };
  controls: { min: boolean; max: boolean; cls: boolean };
}
