import { PowerState, shutdown } from "./powerLogic";
import { powerState, startMenuOpened } from "./stores";

export const startMenuActions: StartMenuAction[] = [
  {
    name: "Power Options",
    icon: "power_settings_new",
    action: shutdown,
  },  {
    name: "Log Off",
    icon: "power_settings_new",
    action: () =>   powerState.set(PowerState.logging_off),
  },
];

export interface StartMenuAction {
  name: string;
  icon: string;
  action: () => void;
}

export function openStart() {
  startMenuOpened.set(true);
}

export function closeStart() {
  startMenuOpened.set(false);
}
