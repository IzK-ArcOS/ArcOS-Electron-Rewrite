<script lang="ts">
  import Boot from "./lib/boot.svelte";
</script>

<div>
<Boot status="hello, world!" duration={5000} />
</div>

<style scoped>
  div {
    position:fixed;
    top:0;
    left:0;
    background-color: #000;
    width:100%;
    height:100%;
  }
</style>