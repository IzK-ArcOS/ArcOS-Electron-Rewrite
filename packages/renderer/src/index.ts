import App from "./App.svelte";
import { encryptPassword } from "./lib/ts/passwordLogic";

const app = new App({
  target: document.getElementById("app")!,
});

console.log(encryptPassword("argon2ishere!!"))

export default app;
