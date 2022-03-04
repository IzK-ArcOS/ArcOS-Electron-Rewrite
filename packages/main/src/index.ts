import { app, BrowserWindow, globalShortcut } from "electron";
import { join } from "path";
import { URL } from "url";

const env = import.meta.env;
const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: join(__dirname, "../../preload/dist/index.cjs"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Disable menu bar
  mainWindow.setMenu(null);

  mainWindow.on("ready-to-show", () => {
    globalShortcut.register("CmdOrCtrl+Shift+I", () => {
      mainWindow?.webContents.toggleDevTools();
    });

    mainWindow?.show();
  });

  const pageUrl =
    env.MODE === "development"
      ? (env.VITE_DEV_SERVER_URL as string)
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  await mainWindow.loadURL(pageUrl);
};

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed to create window:", e));

if (env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error("Failed to check for updates:", e));
}
