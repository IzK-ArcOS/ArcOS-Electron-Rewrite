<script lang="ts">
  import { userDataStore, Windows } from "../ts/stores";
  import { Themes } from "../ts/themeLogic";
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import defIcon from "../../img/systemIcon.svg";
  import type { WindowData, WindowMenuBar } from "../ts/appLogic";
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
  let mbar: boolean;
  let mDat: WindowMenuBar;
  let elmnt: HTMLElement;

  function update(uData: UserTemplate | boolean) {
    const userData = uData as UserTemplate;

    cssString = generateWindowStyle(userData, app);

    rounded = Themes.get(userData.theme)
      ? Themes.get(userData.theme)?.rounded!
      : true;

    ndkd = !userData.taskbar.docked!;
    mbar = !!app.menubar;

    if (mbar) mDat = app.menubar as WindowMenuBar;

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
          app = list[i];
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
  <div class="titlebar" on:dblclick={max} class:hidden={app.headless}>
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
  <div class="menubar" class:hidden={!mbar}>
    {#if mbar}
      {#each mDat.leftItems as item}
        <button on:click={item.click}>{item.caption}</button>
        <span class="sep" class:hidden={!item.sep} />
      {/each}
      <span class="right">
        {#each mDat.rightItems || [] as item}
          <button on:click={item.click}>{item.caption}</button>
          <span class="sep" class:hidden={!item.sep} />
        {/each}
      </span>
    {/if}
  </div>
  <div class="body" class:mbar>
    <svelte:component this={app.content} {app} />
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
    background-color: transparent;
    color: inherit;
    height: 40px;
    padding: 7px 10px;
    box-sizing: border-box;
  }

  div.window div.titlebar.hidden {
    display: none;
  }

  div.window div.titlebar * {
    min-height: 20px;
    vertical-align: middle;
  }

  div.window div.titlebar div.controls {
    position: absolute;
    right: 10px;
    top: 5px;
  }

  div.window div.titlebar div.controls button {
    border-radius: 5px;
    border: none;
    width: 20px;
    height: 20px;
    word-wrap: break-word;
    background-color: transparent;
    color: inherit;
    margin-left: 5px;
    padding-left: 5px;
    padding-bottom: 2px;
    min-width: unset;
    padding-top: 3px;
    padding-left: 3px;
    font-size: inherit;
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
    top: 40px;
    box-sizing: border-box;
    padding: 10px;
    overflow: auto;
    max-height: calc(100% - 40px);
    width: 100%;
  }

  div.window div.body.mbar {
    top: 60px;
    max-height: calc(100% - 60px);
  }

  div.window div.menubar:not(.hidden) {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 20px;
  }

  div.window div.menubar button {
    height: 20px;
    padding: 2px 10px 0px 10px;
    padding-top: 0;
    background-color: transparent;
    border: none;
    border-radius: 2.5px;
    color: inherit;
    box-sizing: border-box;
    transition: background-color 0.2s;
  }

  div.window div.menubar button:hover {
    background-color: #fff3;
  }

  div.window div.menubar span.right {
    float: right;
  }
</style>
