import { writable } from "svelte/store";

import type { UserTemplate } from "./userLogic";

export const userDataStore = writable<UserTemplate | undefined>();
export const startMenuOpened = writable<boolean>(false); // Start Menu
export const actCenterOpened = writable<boolean>(false); // Action Center