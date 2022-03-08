<script lang="ts">
  import buf from "buffer/";
  import { setUserPreference, TaskbarPosition } from "../ts/userLogic";
  import Taskbar from "./Taskbar.svelte";
  import Wallpaper from "./Wallpaper.svelte";

  export let username: string;

  const Buffer = buf.Buffer;

  username = username || "User";
</script>

<div class="desktop">
  <Wallpaper {username} />
  <Taskbar {username} />
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
