import { powerState } from "./stores";

export function shutdown() {
  powerState.set(PowerState.shutting_down);
}

export enum PowerState {
  on,
  off,
  booting,
  login,
  logging_in,
  logging_off,
  restarting,
  shutting_down,
  crashed
}