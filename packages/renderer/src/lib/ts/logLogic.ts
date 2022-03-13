import { get } from "svelte/store";
import { PowerState } from "./powerLogic";
import { kernelLog } from "./stores";

export function notifyStartService(name: string, forControl = "") {
  let today = new Date();
  let hour = today.getHours().toString().padStart(2, "0");
  let minute = today.getMinutes().toString().padStart(2, "0");
  let second = today.getSeconds().toString().padStart(2, "0");
  let milisecond = today.getMilliseconds().toString().padStart(3, "0");
  if (!forControl) {
    console.info(
      `%c${hour}:${minute}:${second}.${milisecond}%cSTATUS%c Started ${name}`,
      "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
      "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#83a598;",
      "color: #83a598"
    );
  } else {
    console.info(
      `%c${hour}:${minute}:${second}.${milisecond}%cSTATUS%c Started ${name} for ${forControl}`,
      "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
      "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#83a598;",
      "color: #83a598"
    );
  }
}

export function changePwrState(powerState: PowerState) {
  let today = new Date();
  let hour = today.getHours().toString().padStart(2, "0");
  let minute = today.getMinutes().toString().padStart(2, "0");
  let second = today.getSeconds().toString().padStart(2, "0");
  let milisecond = today.getMilliseconds().toString().padStart(3, "0");
  console.info(
    `%c${hour}:${minute}:${second}.${milisecond}%cPWR%c PowerState changed: ${PowerState[powerState]}`,
    "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
    "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#fabd2f;",
    "color: #fabd2f"
  );
}

export function Log(log:KernelLog) {
  const kLog = get(kernelLog);

  log.timestamp = new Date().getTime();

  kLog.push(log)
}

export interface KernelLog {
  title:string;
  content:string;
  priority:LogPriority;
  timestamp?:number;
}

export enum LogPriority {
  status,
  warning,
  critical,
  fatal
}