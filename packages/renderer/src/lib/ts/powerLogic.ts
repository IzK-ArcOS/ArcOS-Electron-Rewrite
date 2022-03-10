import { BSODMessg, BSODTitle, powerState } from "./stores";

export function shutdown() {
  powerState.set(PowerState.shutting_down);
}

export function logoff() {
  powerState.set(PowerState.logging_off)
}

export function crash(title:string,messg:string) {
  BSODTitle.set(title);
  BSODMessg.set(messg);

  powerState.set(PowerState.crashed);
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