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
  import Startmenu from "./Startmenu.svelte";
  import { Themes } from "../ts/themeLogic";
  import {
    actCenterOpened,
    openedWindows,
    startMenuOpened,
    userDataStore,
    Windows,
  } from "../ts/stores";
  import type { WindowData } from "../ts/appLogic";
  import AppIcon from "./Taskbar/AppIcon.svelte";
  import app from "../..";
  import { getWindowData } from "../ts/windowLogic";
  import { get } from "svelte/store";

  export let username: string;

  let theme: Theme = Theme.darkround;
  let tbbtm: boolean = false;
  let backg: string;
  let docked: boolean = false;
  let tbCapts: boolean;
  let startMenuOpen: boolean;
  let actCenterOpen: boolean;
  let rounded: boolean;
  let appList: { id: string; name: string }[];
  let userData: UserTemplate;

  function update(input: UserTemplate | boolean) {
    userData = input as UserTemplate;

    theme = userData.theme;
    tbbtm = userData.taskbar
      ? userData.taskbar.position == TaskbarPosition.bottom
      : false;
    backg = Themes.get(theme)!.variables.taskbarBackground;
    docked = userData.taskbar.docked as boolean;
    rounded = Themes.get(userData.theme)
      ? Themes.get(userData.theme)?.rounded!
      : true;
    tbCapts = userData.taskbar.captions;
  }

  update(getUserData(username));

  userDataStore.subscribe(update);
  startMenuOpened.subscribe((value) => (startMenuOpen = value));
  actCenterOpened.subscribe((value) => (actCenterOpen = value));
  openedWindows.subscribe((v) => {
    appList = v;
  });

  const toggleStart = () => startMenuOpened.set(!startMenuOpen);
  const toggleActCenter = () => actCenterOpened.set(!actCenterOpen);

  startMenuOpened.set(false);
  actCenterOpened.set(false);
</script>

<div
  class="taskbar"
  class:ontop={!tbbtm}
  class:sharp={!rounded}
  class:docked
  style="background-color: {backg};"
>
  <button class="startbutton" on:click={toggleStart}>
    <img src={systemIcon} alt="startButton" />
  </button>
  <div class="windows">
    {#each appList as app}
      <AppIcon app={getWindowData(app.name, app.id)} {userData} />
    {/each}
  </div>
</div>

<Startmenu visible={startMenuOpen} {username} />

<style scoped>
  div.taskbar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 40px;
    border-radius: 7.5px;
  }

  div.taskbar * {
    vertical-align: middle;
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
    max-height: 40px;
    border-radius: 5px;
  }

  button.startbutton:hover {
    background-color: #0003;
  }

  button.startbutton img {
    height: 25px;
  }

  div.windows {
    display: inline-block;
  }
</style>
