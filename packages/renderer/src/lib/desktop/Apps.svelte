<script lang="ts">
  import { DefaultAppImports } from "../ts/appLogic";
  import { Windows } from "../ts/stores";
  import Window from "./Window.svelte";

  export let username: string;

  const apps = DefaultAppImports;

  Windows.set([]);
</script>

<div id="windowStore">
  {#each apps as app}
    <Window {username} {app} />
  {/each}
</div>
