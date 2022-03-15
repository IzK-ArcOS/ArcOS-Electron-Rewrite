<script lang="ts">
  import "../../css/windowControls.scss";
  import type { WindowData } from "../ts/appLogic";
  import { closeWindow } from "../ts/windowLogic";

  export let app: WindowData;
</script>

<div>
  <h4>This window is NOT frameless, you can just close it normally:</h4>
  <button on:click={() => closeWindow(app)}>Close</button>
</div>

<style scoped>
  div {
    width: 100%;
  }
</style>
