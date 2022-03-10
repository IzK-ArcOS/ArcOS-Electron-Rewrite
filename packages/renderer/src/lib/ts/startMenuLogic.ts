import { crash, PowerState, shutdown } from "./powerLogic";
import { powerState, startMenuOpened } from "./stores";

export const startMenuActions: StartMenuAction[] = [
  {
    name: "Shut Down",
    icon: "power_settings_new",
    action: shutdown,
  },  {
    name: "Log Off",
    icon: "lock",
    action: () => powerState.set(PowerState.logging_off),
  },  {
    name: "Crash",
    icon: "cancel",
    action: () => crash("MANUALLY_INITIATED_CRASH","The system crashed because of a user performed crash."),
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
