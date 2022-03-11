<script lang="ts">
  import defIcon from "../../../img/systemIcon.svg";
  import type { UserTemplate } from "../../ts/userLogic";
  import type { WindowData } from "../../ts/appLogic";
  import type { ThemeData } from "../../ts/themeLogic";
  import { closeStart } from "../../ts/startMenuLogic";
  import { openWindow } from "../../ts/windowLogic";
  import { Themes } from "../../ts/themeLogic";
  import { userDataStore } from "../../ts/stores";

  export let app: WindowData;
  export let userData: UserTemplate;

  let theme: ThemeData;
  let color:string;

  function update(v: UserTemplate | boolean) {
    userData = v as UserTemplate;

    theme = Themes.get(userData.theme)!;
    color = theme.variables.fontColor
  }

  userDataStore.subscribe(update);

  update(userData);

  function handleClick() {
    closeStart();

    openWindow(app);
  }
</script>

<button class="app-item" on:click={handleClick} style="color: {color}">
  <img src={defIcon} alt="Application Icon" /><span>{app.name}</span>
</button>

<style scoped>
  img {
    height: 20px;
  }

  button.app-item * {
    vertical-align: middle;
    color: inherit;
    display: inline-block;
    padding: 5px;
  }

  button.app-item {
    text-align: left;
    background-color: transparent;
    border: none;
    display: block;
    border-radius: 5px;
    width: 100%;
  }

  button.app-item:hover {
    background-color: #0003;
  }
</style>
