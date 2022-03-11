<script lang="ts">
  import { DefaultAppImports } from "../ts/appLogic";
  import Window from "./Window.svelte";

  export let username: string;

  const apps = DefaultAppImports;
</script>

<div id="windowStore">
  {#each apps as app}
    <Window {username} {app} />
  {/each}
</div>
