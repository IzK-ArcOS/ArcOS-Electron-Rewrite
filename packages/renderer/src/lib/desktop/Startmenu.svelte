<script lang="ts">
  import { getUserData, setUserPreference, Theme } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import { Themes } from "../ts/themeLogic";
  import { userDataStore, Windows } from "../ts/stores";
  import { startMenuActions } from "../ts/startMenuLogic";
  import "../../css/general.scss";
  import type { WindowData } from "../ts/appLogic";
  import ShowApp from "./Startmenu/ShowApp.svelte";

  export let visible: boolean;
  export let username: string;

  let bgcolor: string;
  let bottomPane: string;
  let rightPane: string;
  let taskbarDocked: boolean;
  let border: string;
  let color: string;
  let rounded: boolean;
  let appList: WindowData[];
  let userData: UserTemplate;

  function update(data: UserTemplate | boolean) {
    userData = data as UserTemplate;
    const themeVariables = Themes.get(userData.theme)!.variables;

    bgcolor = themeVariables.taskbarBackground;
    rightPane = themeVariables.startMenuRightPane;
    bottomPane = themeVariables.startMenuBottomPane;
    taskbarDocked = userData.taskbar.docked as boolean;
    border = themeVariables.windowBorder;
    rounded = Themes.get(userData.theme)
      ? Themes.get(userData.theme)?.rounded!
      : true;

    color = themeVariables.fontColor;
  }

  update(getUserData(username));

  setUserPreference(username, "theme", Theme.darkround);

  userDataStore.subscribe(update);

  Windows.subscribe((data) => (appList = data));
</script>

<div
  class="startmenu small"
  class:visible
  class:docked={taskbarDocked}
  class:sharp={!rounded}
  style="background-color: {bgcolor}; border: {border}; color: {color};"
  tabindex="-1"
>
  <div class="bottomPane" style="background-color: {bottomPane};">
    <h3 class="username">{username}</h3>
    <div class="actions">
      {#each startMenuActions as action}
        <button on:click={action.action} title={action.name}>
          <span class="material-icons">{action.icon}</span>
        </button>
      {/each}
    </div>
  </div>
  <div class="leftPane">
    {#each appList as app}
      <ShowApp {app} {userData} />
    {/each}
  </div>
  <div class="rightPane" style="background-color: {rightPane}" />
</div>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Inter&display=swap");
  .startmenu:root {
    --rightPane: #0003;
    --bottmPane: #0005;
    --color: white;
  }
  .startmenu {
    position: fixed;
    bottom: 65px;
    left: 10px;
    border-radius: 10px;
    padding: 40px;
    backdrop-filter: blur(20px);
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
    width: 500px;
    height: 600px;
    opacity: 0;
    visibility: hidden;
    z-index: 1000000003;
    transition: opacity 0.3s, visibility 0.3s;
    color: #f0f;
  }

  div.startmenu * {
    color: inherit;
  }
  .startmenu.docked {
    bottom: 50px;
  }

  *:not(.material-icons) {
    box-sizing: border-box;
    font-family: "IBM Plex Sans", sans-serif;
  }

  .startmenu.visible {
    opacity: 1;
    visibility: visible;
  }

  .leftPane,
  .rightPane,
  .bottomPane,
  .startmenu {
    box-sizing: border-box;
  }

  .rightPane {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 200px;
    height: calc(100% - 75px);
    padding: 20px;
    background-color: var(--rightPane);
  }

  .leftPane {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 200px);
    height: calc(100% - 75px);
    background-color: #ffffff02;
    border-radius: 10px;
    padding: 20px;
    color: inherit;
  }

  .bottomPane {
    position: absolute;
    background-color: var(--bottmPane);
    height: 75px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 25px;
  }

  .bottomPane h3.username {
    margin: 0;
  }

  .bottomPane .actions {
    position: absolute;
    right: 25px;
    bottom: 20px;
  }

  .bottomPane .actions button {
    color: var(--color);
    transition: background-color 0.2s;
  }
  .bottomPane .actions button:hover {
    color: deepskyblue;
  }

  button {
    background-color: transparent;
    border: none;
    color: var(--color);
  }

  .rightPane button * {
    vertical-align: middle;
    font-size: inherit;
    margin-bottom: 5px;
  }

  .rightPane button span.material-icons {
    font-size: 20px;
  }
  /* 
  .rightPane hr {
    border: #fff2 1px solid;
  } */
</style>
