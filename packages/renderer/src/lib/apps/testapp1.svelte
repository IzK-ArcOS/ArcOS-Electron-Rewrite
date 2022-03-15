<script lang="ts">
  import { get } from "svelte/store";

  import "../../css/windowControls.scss";
  import type { WindowData } from "../ts/appLogic";
  import { Windows } from "../ts/stores";
  import {
    closeWindow,
    minimizeWindow,
  } from "../ts/windowLogic";

  export let app: WindowData;

  function toggleFrame() {
    const lW = get(Windows);

    for (let i = 0; i < lW.length; i++) {
      if (lW[i].id == app.id && lW[i].name == app.name) {
        lW[i].headless = !lW[i].headless;
      }
    }

    Windows.set(lW);
  }
</script>

<div>
  <h4>This window is frameless, so here are some replacement buttons:</h4>
  <button class="material-icons" on:click={() => minimizeWindow(app)}
    >minimize</button
  >
  <button class="material-icons" on:click={() => closeWindow(app)}>close</button
  >
  <button class="maxwidth" on:click={toggleFrame}
    >Give this window a frame!!!</button
  >
</div>

<style scoped>
  div {
    width: 100%;
  }
</style>
