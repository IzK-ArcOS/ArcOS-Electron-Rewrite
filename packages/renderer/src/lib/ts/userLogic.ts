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

const defaultUserData: UserTemplate = {
  name: "",
  admin: false,
  pswd: "",
  theme: Theme.darkround,
};

export type UserTemplate = {
  name: string;
  admin: boolean;
  pswd: string;
  theme: Theme;
};
