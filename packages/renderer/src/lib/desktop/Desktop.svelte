<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/general.scss";
  import BlankOut from "../BlankOut.svelte";
  import { PowerState } from "../ts/powerLogic";
  import { openedWindows, powerState } from "../ts/stores";
  import { setUserPreference, Theme } from "../ts/userLogic";
  import Apps from "./Apps.svelte";
  import Taskbar from "./Taskbar.svelte";
  import Wallpaper from "./Wallpaper.svelte";

  export let username: string;

  username = username || "User";

  setTimeout(() => {
    powerState.set(PowerState.desktop);
  }, 3000);

  onMount(() => {
    setUserPreference(username, "theme", Theme.darkround);

    openedWindows.set([]);
  });
</script>

<div class="desktop">
  <Wallpaper {username} />
  <Apps {username} />
  <Taskbar {username} />
  <BlankOut delay={3000} />
</div>

<style scoped>
  div.desktop {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
</style>
