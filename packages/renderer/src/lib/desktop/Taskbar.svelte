<script lang="ts">
  import "../../css/general.scss";
  import systemIcon from "../../img/systemIcon.svg";
  import { getUserData, setUserPreference, TaskbarPosition, Theme } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import ActionCenter from "./ActionCenter.svelte";
  import Startmenu from "./Startmenu.svelte";
  import buf from "buffer/";
  import { Themes } from "../ts/themeLogic";
  import {
    actCenterOpened,
    startMenuOpened,
    userDataStore,
  } from "../ts/stores";
  import type { Writable } from "svelte/store";

  export let username: string;

  const Buffer = buf.Buffer;

  let theme: Theme = Theme.darkround;
  let tbbtm: boolean = false;
  let backg: string;
  let docked: boolean = false;
  let startMenuOpen: boolean;
  let actCenterOpen: boolean;

  function update(input: UserTemplate | undefined) {
    const userData: UserTemplate = input as UserTemplate;

    theme = userData.theme;
    tbbtm = userData.taskbar.position
      ? userData.taskbar.position == TaskbarPosition.bottom
      : false;
    backg = Themes.get(theme)!.variables.taskbarBackground;
    docked = userData.taskbar.docked as boolean;
  }

  update(getUserData(username) as UserTemplate);

  userDataStore.subscribe(update);
  startMenuOpened.subscribe((value) => (startMenuOpen = value));
  actCenterOpened.subscribe((value) => (actCenterOpen = value));

  console.log(startMenuOpened);
  const toggleStart = () => startMenuOpened.set(!startMenuOpen);

  setTimeout(() => {
    const taskbarData = (getUserData(username) as UserTemplate).taskbar;

    taskbarData.docked = true;

    setUserPreference(username,"taskbar",taskbarData)
  }, 3000);
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
    height: 35px;
  }

  button.startbutton {
    background-color: transparent;
    border: none;
    padding: 7px;
  }

  button.startbutton img {
    height: 25px;
  }
</style>
