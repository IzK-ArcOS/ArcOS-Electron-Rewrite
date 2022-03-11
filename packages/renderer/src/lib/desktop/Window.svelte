<script lang="ts">
  import { userDataStore } from "../ts/stores";
  import { Themes } from "../ts/themeLogic";
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import defIcon from "../../img/systemIcon.svg";
  import type { Window } from "../ts/appLogic";
  import "../../css/general.scss";
  import { closeStart } from "../ts/startMenuLogic";
  import { onMount } from "svelte";
  import { dragWindow, generateWindowStyle, toFront } from "../ts/windowLogic";

  export let app: Window;
  export let username: string;

  let cssString: string;
  let rounded: boolean;
  let elmnt: HTMLElement;

  function update(uData: UserTemplate | boolean) {
    const userData = uData as UserTemplate;

    cssString = generateWindowStyle(userData, app);

    rounded = Themes.get(userData.theme)
      ? Themes.get(userData.theme)?.rounded!
      : true;
  }

  update(getUserData(username));

  userDataStore.subscribe(update);

  onMount(() => {
    console.log(elmnt);
    dragWindow(elmnt);
  });

  console.warn();

  function onClick() {
/*     dragWindow(elmnt);
    closeStart();

    toFront(elmnt); */
  }
</script>

<div
  class="window"
  style={cssString}
  class:sharp={!rounded}
  on:mousedown={() => onClick()}
  bind:this={elmnt}
>
  <div class="titlebar">
    <img class="icon" alt="Program Icon" src={defIcon} />
    <p class="title" />
    <div class="controls">
      <button class="min material-icons" class:hidden={!app.controls.min}
        >minimize</button
      >
      <button class="max material-icons" class:hidden={!app.controls.max}
        >crop_square</button
      >
      <button class="cls material-icons" class:hidden={!app.controls.cls}
        >close</button
      >
    </div>
  </div>
  <div class="body">
    <svelte:component this={app.content} />
  </div>
</div>

<style>
  div.window {
    position: fixed;
    top: 50px;
    left: 50px;
    min-width: 300px;
    min-height: 300px;
    overflow: auto;
    border-radius: 10px;
  }

  div.window.sharp {
    border-radius: 0;
  }

  div.window div.titlebar {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
  }

  div.window div.titlebar * {
    min-height: 20px;
    vertical-align: baseline;
  }

  div.window div.titlebar div.controls {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  div.window div.titlebar div.controls button {
    background-color: transparent;
    width: 20px;
    height: 20px;
    border: none;
    font-size: 15px;
    color: white;
    padding: 0;
  }

  div.window div.titlebar div.controls button.hidden {
    display: none;
  }

  div.window div.titlebar img.icon {
    height: 20px;
  }

  div.window div.titlebar p.title {
    margin: 0;
    display: inline-block;
  }

  div.window div.body {
    position: absolute;
    top: 30px;
    box-sizing: border-box;
    padding: 10px;
  }
</style>
