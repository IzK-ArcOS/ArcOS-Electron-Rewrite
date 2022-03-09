import { startMenuOpened } from "./stores";

export const startMenuActions: StartMenuAction[] = [
  {
    name: "Power Options",
    icon: "power_settings_new",
    action: () => {
      alert("Power settings? Yes.");
    },
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
