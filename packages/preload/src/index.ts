import { contextBridge } from "electron";

const api: ElectronApi = {
  versions: process.versions,
};

contextBridge.exposeInMainWorld("electron", api);
