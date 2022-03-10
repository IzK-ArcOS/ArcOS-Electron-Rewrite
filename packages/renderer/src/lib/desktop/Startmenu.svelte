<script lang="ts">
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import { Themes } from "../ts/themeLogic";
  import { userDataStore } from "../ts/stores";
  import { startMenuActions } from "../ts/startMenuLogic";

  export let visible: boolean;
  export let username: string;

  let bgcolor: string;
  let bottomPane: string;
  let rightPane: string;
  let taskbarDocked: boolean;
  let border: string;

  function update(data: UserTemplate | boolean) {
    const userData = data as UserTemplate;
    const themeVariables = Themes.get(userData.theme)!.variables;

    bgcolor = themeVariables.taskbarBackground;
    rightPane = themeVariables.startMenuRightPane;
    bottomPane = themeVariables.startMenuBottomPane;
    taskbarDocked = userData.taskbar.docked as boolean;
    border = themeVariables.windowBorder;
  }

  update(getUserData(username));

  userDataStore.subscribe(update);
</script>

<div
  class="startmenu small"
  class:visible
  class:docked={taskbarDocked}
  style="background-color: {bgcolor}; border: {border}"
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
  <div class="leftPane" />
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
    z-index: 1000000003;
    transition: opacity 0.3s, visibility 0.3s;
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
    color: white;
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

  .rightPane hr {
    border: #fff2 1px solid;
  }
</style>
