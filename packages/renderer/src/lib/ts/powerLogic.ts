import { powerState } from "./stores";

export function shutdown() {
  powerState.set(PowerState.logging_off);
}

export enum PowerState {
  on,
  off,
  desktop,
  booting,
  login,
  logging_in,
  logging_off,
  restarting,
  shutting_down,
  crashed
}