import { Theme } from "./userLogic";

export const Themes = new Map<Theme, ThemeData>([
  [
    Theme.darkround,
    {
      name: "Dark Rounded",
      builtin: true,
      rounded: true,
      variables: {
        windowBackground: "#222",
        windowBorder: "#fff3 1px solid",
        taskbarBackground: "#111",
        fontColor: "#fff",
        startMenuBottomPane: "#00000025",
        startMenuRightPane: "#00000025",
      },
    },
  ],
  [
    Theme.lightsharp,
    {
      name: "Light Sharp",
      builtin: true,
      rounded: false,
      variables: {
        windowBackground: "#ffffff9a",
        windowBorder: "rgb(160, 160, 160) 1px solid",
        taskbarBackground: "#ffffff9a",
        fontColor: "#000",
        startMenuBottomPane: "#ffffff13",
        startMenuRightPane: "#ffffff13",
      },
    },
  ],
]);

export interface ThemeData {
  name: string;
  builtin: boolean;
  variables: ThemeVariables;
  rounded?: boolean;
}

export interface ThemeVariables {
  windowBackground: string;
  windowBorder: string;
  taskbarBackground: string;
  fontColor: string;
  startMenuRightPane: string;
  startMenuBottomPane: string;
}
