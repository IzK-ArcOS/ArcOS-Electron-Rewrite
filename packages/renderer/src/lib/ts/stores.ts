import { writable } from "svelte/store";
import type { PowerState } from "./powerLogic";

import type { UserTemplate } from "./userLogic";

export const userDataStore = writable<UserTemplate | boolean>();
export const powerState = writable<PowerState>(0);
export const startMenuOpened = writable<boolean>(false); // Start Menu
export const actCenterOpened = writable<boolean>(false); // Action Center
export const BSODTitle = writable<string>(""); // Crash Title
export const BSODMessg = writable<string>(""); // Crash Message