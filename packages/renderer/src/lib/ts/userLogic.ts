import buf from "buffer/";
import { notifyStartService } from "./logLogic";
import { userDataStore } from "./stores";
const Buffer = buf.Buffer;

export function isUser(username: string | null): boolean {
  if (!username) return false;

  let userData;

  try {
    userData = JSON.parse(
      Buffer.from(localStorage.getItem(username) || "e30=", "base64").toString()
    );
  } catch {
    userData = {};
  }

  return !!userData.name;
}

export function createUser(username: string): boolean {
  notifyStartService(`UserLogic: CreateUser: Creating user ${username}...`);
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
  notifyStartService(
    `UserLogic: getUserData: Getting userData for ${username}...`
  );
  username = Buffer.from(username).toString("base64");

  if (isUser(username)) {
    return JSON.parse(
      Buffer.from(localStorage.getItem(username)!, "base64").toString()
    ) as UserTemplate;
  }
  return false;
}

export function setUserPreference(
  username: string,
  key: string,
  value: any
): boolean {
  let userData = getUserData(username);

  if (userData) {
    userData = userData as UserTemplate;

    if (typeof value == typeof userData[key]) {
      userData[key] = value;

      localStorage.setItem(
        Buffer.from(username).toString("base64"),
        Buffer.from(JSON.stringify(userData)).toString("base64")
      );

      userDataStore.set(userData);

      return true;
    }
    return false;
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

export interface UserTemplate {
  theme: Theme;
  wallpaper: string;
  fullname: string;
  admin: boolean;
  taskbar: TaskbarData;
  startmenu: StartMenuData;
  [string: string]: any;
}

export interface TaskbarData {
  position: TaskbarPosition;
  docked?: boolean;
  captions: boolean;
}

export interface StartMenuData {
  small: boolean;
}

const defaultUserData: UserTemplate = {
  theme: Theme.darkround,
  wallpaper: "default_darkmode",
  fullname: "",
  admin: false,
  taskbar: {
    position: TaskbarPosition.bottom,
    docked: false,
    captions: true,
  },
  startmenu: {
    small: false,
  },
};
