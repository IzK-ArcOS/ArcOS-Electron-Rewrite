<script lang="ts">
  import { userDataStore, Windows } from "../ts/stores";
  import { Themes } from "../ts/themeLogic";
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import defIcon from "../../img/systemIcon.svg";
  import type { WindowData } from "../ts/appLogic";
  import "../../css/general.scss";
  import { onMount } from "svelte";
  import {
    dragWindow,
    generateWindowStyle,
    toFront,
    maximizeWindow,
    closeWindow,
    minimizeWindow,
  } from "../ts/windowLogic";
  import { closeStart } from "../ts/startMenuLogic";
  import { get } from "svelte/store";

  export let app: WindowData;
  export let username: string;

  let cssString: string;
  let rounded: boolean;
  let mind: boolean;
  let maxd: boolean;
  let clsd: boolean;
  let ndkd: boolean;
  let elmnt: HTMLElement;

  function update(uData: UserTemplate | boolean) {
    const userData = uData as UserTemplate;

    cssString = generateWindowStyle(userData, app);

    rounded = Themes.get(userData.theme)
      ? Themes.get(userData.theme)?.rounded!
      : true;

    ndkd = !userData.taskbar.docked!;

    if (!get(Windows).includes(app)) {
      const newWindowList = get(Windows);

      newWindowList.push(app);

      Windows.set(newWindowList);
    }

    Windows.subscribe((list) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == app.id && list[i].name == app.name) {
          mind = list[i].state.min;
          maxd = list[i].state.max;
          clsd = list[i].state.cls;
        }
      }
    });
  }

  update(getUserData(username));

  userDataStore.subscribe(update);

  onMount(() => {
    dragWindow(elmnt);
    elmnt.focus();
  });

  function clk() {
    closeStart();

    toFront(elmnt);
  }

  function max() {
    if (app.controls.max && !app.headless) maximizeWindow(elmnt, app);
  }

  function cls() {
    closeWindow(app);
  }

  function min() {
    minimizeWindow(app);
  }
</script>

<div
  class="window"
  style={cssString}
  class:sharp={!rounded}
  class:headless={app.headless}
  class:maxd
  class:mind
  class:clsd
  class:ndkd
  id="window#{app.id}"
  on:mousedown={clk}
  bind:this={elmnt}
>
  {#if !app.headless}
    <div class="titlebar" on:dblclick={max}>
      <img class="icon" alt="Program Icon" src={defIcon} />
      <p class="title">{app.name}</p>
      <div class="controls">
        <button
          class="min material-icons"
          disabled={!app.controls.min}
          on:click={min}>minimize</button
        >
        <button
          class="max material-icons"
          disabled={!app.controls.max}
          on:click={max}>crop_square</button
        >
        <button
          class="cls material-icons"
          disabled={!app.controls.cls}
          on:click={cls}>close</button
        >
      </div>
    </div>
  {/if}
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
    transition: opacity 0.3s, visibility 0.3s;
    backdrop-filter: blur(30px);
  }

  div.window.maxd {
    position: fixed;
    top: 0px !important;
    left: 0px !important;
    width: 100% !important;
    min-width: 100% !important;
    min-height: calc(100% - 40px) !important;
    max-height: calc(100% - 40px) !important;
    max-width: 100% !important;
    resize: none !important;
    height: calc(100% - 40px) !important;
    border-radius: 0 !important;
    border: none !important;
    box-sizing: border-box;
  }

  div.window.maxd.ndkd {
    height: calc(100% - 60px) !important;
    min-height: calc(100% - 60px) !important;
    max-height: calc(100% - 60px) !important;
  }

  div.window.mind {
    opacity: 0;
    visibility: hidden;
  }

  div.window.clsd {
    opacity: 0;
    visibility: hidden;
  }

  div.window.headless div.body {
    height: 100%;
    top: 0;
    box-sizing: border-box;
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
    vertical-align: middle;
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
    color: inherit;
    padding: 0;
    transition: opacity 0.3s, background-color 0.3s;
    border-radius: 2.5px;
  }

  div.window div.titlebar div.controls button:hover {
    opacity: 0.8;
    background-color: #0001;
  }

  div.window div.titlebar div.controls button:active {
    opacity: 0.5;
    background-color: #0002;
  }

  div.window div.titlebar div.controls button:disabled {
    opacity: 0.3;
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
    overflow: auto;
    max-height: calc(100% - 30px);
    width: 100%;
  }
</style>
