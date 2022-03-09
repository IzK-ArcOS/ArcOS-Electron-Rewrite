console.warn = (e, c) => {
  if (e != "%cElectron Security Warning (Insecure Content-Security-Policy)") {
    let today = new Date();
    let hour = today.getHours().toString().padStart(2, "0");
    let minute = today.getMinutes().toString().padStart(2, "0");
    let second = today.getSeconds().toString().padStart(2, "0");
    let milisecond = today.getMilliseconds().toString().padStart(3, "0");
    console.info(
      `%c${hour}:${minute}:${second}.${milisecond}%c${e}`,
      "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
      "color:#fe8019;"
    );
  }
};

let loadedModules = [];

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

export function notifyLoadApp(
  app: string,
  mod: string = "windowLogic.loadWindow"
) {
  let today = new Date();
  let hour = today.getHours().toString().padStart(2, "0");
  let minute = today.getMinutes().toString().padStart(2, "0");
  let second = today.getSeconds().toString().padStart(2, "0");
  let milisecond = today.getMilliseconds().toString().padStart(3, "0");
  console.info(
    `%c${hour}:${minute}:${second}.${milisecond}%c${mod}%c Importing ${app}`,
    "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
    "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#d3869b;",
    "color: #d3869b"
  );
}
export function startModule(mod: string) {
  let today = new Date();
  let hour = today.getHours().toString().padStart(2, "0");
  let minute = today.getMinutes().toString().padStart(2, "0");
  let second = today.getSeconds().toString().padStart(2, "0");
  let milisecond = today.getMilliseconds().toString().padStart(3, "0");
  loadedModules.push(mod);
  console.info(
    `%c${hour}:${minute}:${second}.${milisecond}%cJS%c Module registered: ${mod}`,
    "color: #fff;padding:2.5px 5px;border-radius:2.5px;background-color:#666;margin-right:10px",
    "color: #000;padding:2.5px 5px;border-radius:2.5px;background-color:#fabd2f;",
    "color: #fabd2f"
  );
}
