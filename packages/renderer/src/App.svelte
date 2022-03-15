<script lang="ts">
  import Boot from "./lib/Boot.svelte";
</script>

<div>
  <Boot status="" duration={2000} />
</div>

<style scoped>
  div {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    width: 100%;
    height: 100%;
  }
</style>
