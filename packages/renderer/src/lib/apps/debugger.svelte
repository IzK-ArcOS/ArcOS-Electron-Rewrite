<script lang="ts">
  import "../../css/windowControls.scss";
import Warning from "../desktop/Window/Warning.svelte";
  import type { WindowData } from "../ts/appLogic";

  import { openedWindows } from "../ts/stores";
  import { closeWindow, getWindowData } from "../ts/windowLogic";

  let openWin: { name: string; id: string }[] = [];
  let openWinData: WindowData[] = [];

  openedWindows.subscribe((v) => {
    openWin = v;
    openWinData = [];

    for (let i = 0; i < openWin.length; i++) {
      openWinData.push(
        getWindowData(openWin[i].name, openWin[i].id) as WindowData
      );
    }
  });
</script>

<div>
  <table>
    <h3 class="header">Applications</h3>
    <tr class="toprow">
      <td class="name">Name</td>
      <td class="id">ID</td>
      <td class="builtin">Built-in</td>
      <td class="close">Close</td>
    </tr>
    {#each openWinData as win}
      <tr>
        <td>{win.name}</td>
        <td>{win.id}</td>
        <td>{win.builtin}</td>
        <td
          ><button
            on:click={() => {
              closeWindow(win);
            }}>Close</button
          ></td
        >
      </tr>
    {/each}
  </table><br>
  <h3 class="header">Controls</h3>

  <a href="./#">Link</a>
  <input placeholder="Input"/>
  <select>
    <option>Selectbox</option>
  </select>
  <h3 class="header">Header</h3>
  <h4 class="subheader">Subheader</h4>
  <button class="transparent">Transparent</button>

  <button class="material-icons">check</button>
  <button>Normal</button>
  <button class="maxwidth">Max Width</button>
  <button class="maxwidth" disabled>Max Width Disabled</button>  
  <button class="transparent" disabled>Transparent Disabled</button>
  <button disabled class="material-icons">close</button>
  <button disabled>Normal Disabled</button>
  <Warning type={0} caption="This is just a test"/>
  <Warning type={1} caption="This application is internal for development only."/>
  <Warning type={2} caption="A fatal error has occured and the application might not remain stable."/>
</div>

<style scoped>
  div {
    width:100%
  }
  table {
    width:100%;
  }
  table tr.toprow * {
    font-weight: bolder;
    box-sizing: border-box;
  }

  tr.toprow .name {
    min-width:150px;
  }

  tr.toprow .id {
    min-width: 80px;
    width: 100px;
  }

  tr.toprow .builtin {
    min-width:60px;
    width:80px;
  }

  tr.toprow .close {
    min-width: 50px;
    max-width: 50px;
    width:50px
  }
</style>
