import { writable } from "svelte/store";
import type { WindowData } from "./appLogic";
import type { KernelLog } from "./logLogic";
import type { PowerState } from "./powerLogic";
import type { UserTemplate } from "./userLogic";
export const userDataStore = writable<UserTemplate | boolean>();
export const powerState = writable<PowerState>(0);
export const startMenuOpened = writable<boolean>(false); // Start Menu
export const actCenterOpened = writable<boolean>(false); // Action Center
export const BSODTitle = writable<string>(""); // Crash Title
export const BSODMessg = writable<string>(""); // Crash Message
export const Windows = writable<WindowData[]>([]);
export const openedWindows = writable<{ name: string; id: string }[]>([]);
export const kernelLog = writable<KernelLog[]>([]);