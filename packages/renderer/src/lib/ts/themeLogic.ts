import { Theme } from "./userLogic";

export const Themes = new Map<Theme, ThemeData>([
  [
    Theme.darkround,
    {
      name: "Dark Rounded",
      builtin: true,
      variables: {
        windowBackground: "#00091dd2",
        windowBorder: "#fff3 1px solid",
        taskbarBackground: "#00091dd2",
        fontColor: "#fff",
      },
    },
  ],
]);

export interface ThemeData {
  name: string;
  builtin: boolean;
  variables: ThemeVariables;
}

export interface ThemeVariables {
  windowBackground: string;
  windowBorder: string;
  taskbarBackground: string;
  fontColor: string;
}
