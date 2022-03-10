<script lang="ts">
  import "../../css/general.scss";
  import systemIcon from "../../img/systemIcon.svg";
  import {
    getUserData,
    setUserPreference,
    TaskbarPosition,
    Theme,
  } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import ActionCenter from "./ActionCenter.svelte";
  import Startmenu from "./Startmenu.svelte";
  import { Themes } from "../ts/themeLogic";
  import {
    actCenterOpened,
    startMenuOpened,
    userDataStore,
  } from "../ts/stores";

  export let username: string;

  let theme: Theme = Theme.darkround;
  let tbbtm: boolean = false;
  let backg: string;
  let docked: boolean = false;
  let startMenuOpen: boolean;
  let actCenterOpen: boolean;

  function update(input: UserTemplate | boolean) {
    const userData: UserTemplate = input as UserTemplate;

    theme = userData.theme;
    tbbtm = userData.taskbar.position
      ? userData.taskbar.position == TaskbarPosition.bottom
      : false;
    backg = Themes.get(theme)!.variables.taskbarBackground;
    docked = userData.taskbar.docked as boolean;
  }

  update(getUserData(username));

  userDataStore.subscribe(update);
  startMenuOpened.subscribe((value) => (startMenuOpen = value));
  actCenterOpened.subscribe((value) => (actCenterOpen = value));

  const toggleStart = () => startMenuOpened.set(!startMenuOpen);
  const toggleActCenter = () => actCenterOpened.set(!actCenterOpen);

  startMenuOpened.set(false);
  actCenterOpened.set(false);
</script>

<div
  class="taskbar"
  class:ontop={!tbbtm}
  class:docked
  style="background-color: {backg};"
>
  <button class="startbutton" on:click={toggleStart}>
    <img src={systemIcon} alt="startButton" />
  </button>
</div>

<Startmenu visible={startMenuOpen} {username} />
<ActionCenter />

<style scoped>
  div.taskbar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 40px;
    border-radius: 7.5px;
  }

  div.taskbar.ontop {
    top: 10px;
    bottom: unset;
  }

  div.taskbar.docked {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    border-radius: 0;
  }

  button.startbutton {
    background-color: transparent;
    border: none;
    padding: 8px;
  }

  button.startbutton:hover {
    background-color: #0003;
  }

  button.startbutton img {
    height: 25px;
  }
</style>
