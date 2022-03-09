<script lang="ts">
  export let delay: number;

  let visible = true;

  setTimeout(() => {
    visible = false;
  }, delay);
</script>

<div class:visible />

<style scoped>
  div {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #000;
    transition: opacity 0.3s, visibility 0.3s;
    visibility: hidden;
    opacity: 0;
  }

  div.visible {
    visibility: visible;
    opacity: 1;
  }
</style>
