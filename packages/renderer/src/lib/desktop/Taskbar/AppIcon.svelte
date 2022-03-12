<script lang="ts">
  import defIcon from "../../../img/systemIcon.svg";
  import { Themes } from "../../ts/themeLogic";
  import { userDataStore } from "../../ts/stores";
  import { get } from "svelte/store";
  import type { WindowData } from "../../ts/appLogic";
  import type { ThemeData } from "../../ts/themeLogic";
  import type { UserTemplate } from "../../ts/userLogic";

  export let app: WindowData;
  export let userData: UserTemplate;

  let theme: ThemeData;

  function update(v: UserTemplate|boolean) {
    userData = v as UserTemplate;

    theme = Themes.get(userData.theme)!;

  }

  update(userData);

  userDataStore.subscribe(update);

  userData = get(userDataStore) as UserTemplate;

  theme = Themes.get(userData.theme)!;

  let css: string = `color: ${theme.variables.fontColor};`;

  function click() {}
</script>

<button on:click={click} style={css}>
  <img src={defIcon} alt="Application Icon" />
  <span class:hidden={!userData.taskbar.captions}>{app.name}</span>
</button>

<style scoped>
  button {
    background-color: transparent;
    border: none;
  }

  button * {
    height: 20px;
    vertical-align: middle;
    color: inherit;
  }
</style>
