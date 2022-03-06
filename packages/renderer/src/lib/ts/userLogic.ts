import buf from "buffer/";
const Buffer = buf.Buffer;

export function isUser(username: string | null): boolean {
  if (!username) return false;

  console.warn("old", username);

  console.warn(username);

  let userData;

  try {
    userData = JSON.parse(
      Buffer.from(localStorage.getItem(username) || "e30=", "base64").toString()
    );
  } catch {
    userData = {};
  }

  console.log(userData);

  return userData.name && Theme[userData.theme];
}

export function createUser(username: string): boolean {
  username = Buffer.from(username).toString("base64");

  if (localStorage.getItem(username)) return false;

  const userData = defaultUserData;

  userData.name = Buffer.from(username).toString("utf-8");

  localStorage.setItem(
    username,
    Buffer.from(JSON.stringify(userData)).toString("base64")
  );

  return true;
}

export function getUserData(username: string): UserTemplate | boolean {
  username = Buffer.from(username).toString("base64");

  if (isUser(username)) {
    return JSON.parse(
      Buffer.from(localStorage.getItem(username)!, "base64").toString()
    ) as UserTemplate;
  }
  return false;
}

export enum Theme {
  darkround,
  darksharp,
  lightround,
  lightsharp,
}

export enum TaskbarPosition {
  top,
  bottom,
}

const defaultUserData: UserTemplate = {
  enabled: true,
  dispWelcome: true,
  enableAnimations: true,
  globalVolume: 1,
  muted: false,
  noTaskbarButtonLabels: true,
  showDesktopIcons: true,
  taskbarPos: TaskbarPosition.bottom,
  theme: Theme.darkround,
  titlebarButtonsLeft: false,
  profilePicture: null,
  isAdmin: false,
  smallStart: false,
  centeredTaskbarButtons: false,
  wallpaper: "theme",
  name: "",
};

export type UserTemplate = {
  enabled: boolean;
  dispWelcome: boolean;
  enableAnimations: boolean;
  globalVolume: number;
  muted: boolean;
  noTaskbarButtonLabels: boolean;
  showDesktopIcons: boolean;
  taskbarPos: TaskbarPosition;
  theme: Theme;
  titlebarButtonsLeft: boolean;
  profilePicture: null | number;
  isAdmin: boolean;
  smallStart: boolean;
  centeredTaskbarButtons: boolean;
  wallpaper: string;
  name: string;
  pswd?: string;
};
