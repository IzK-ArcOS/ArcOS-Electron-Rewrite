import type { SvelteComponentDev } from "svelte/internal";
import testApp from "../apps/testApp.svelte";

export const DefaultAppImports: WindowData[] = [
  {
    content: testApp,
    id: "test1",
    name: "Test Application",
    builtin: true,
    headless: false,
    resizable: true,
    controls: { min: true, max: true, cls: true },
    pos: { x: 810, y: 390 },
    maxSize: { w: 100, h: 100 },
    state: { min: true, max: false, cls: true },
    register: true,
  },
  {
    content: testApp,
    id: "test2",
    name: "Test Application (2)",
    builtin: true,
    headless: true,
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
}
