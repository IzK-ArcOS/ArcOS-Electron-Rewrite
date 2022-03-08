import { writable } from "svelte/store";

import type { UserTemplate } from "./userLogic";

export const userDataStore = writable<UserTemplate | undefined>();
