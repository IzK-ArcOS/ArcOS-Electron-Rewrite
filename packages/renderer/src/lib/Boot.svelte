<script lang="ts">
  import LoginScreen from "./LoginScreen.svelte";
  import logo from "../img/systemIcon.svg";

  import "../css/progressbar.scss";
  import { notifyStartService } from "./ts/logLogic";
  import { PowerState } from "./ts/powerLogic";
  import { powerState } from "./ts/stores";
  import Crash from "./Crash.svelte";

  export let status: string;
  export let duration: number;

  notifyStartService("Boot");

  let visible: boolean = true;
  let pwrState: PowerState;

  powerState.subscribe((v) => (pwrState = v));

  setTimeout(() => {
    visible = false;
  }, duration);
</script>

{#if pwrState != PowerState.crashed}
  <div>
    {#if visible}
      <div class="boot">
        <div class="centered center" class:hidden={!visible}>
          <img class="bootlogo" src={logo} height="150px" alt="bootlogo" />

          <div class="slider userdefined">
            <div class="line dark" />
            <div class="subline dark inc" />
            <div class="subline dark dec" />
          </div>
        </div>

        <div class="centered" class:hidden={!visible}>
          <h4 class="status">{status}</h4>
        </div>

        <div class="status" class:hidden={!visible} />
      </div>
    {:else}
      <LoginScreen />
    {/if}
  </div>
{:else}
  <Crash />
{/if}

<style lang="css">
  :root {
    --fade-in-opacity: 1;
    --fade-out-opacity: 0.65;
    --background-color: #000;
    --foreground-color: #fff;
    --global-font-weight: 100;
    --bootlogo-animation-delay: 4s;
    --font-family: "IBM Plex Sans", sans-serif;
    --bootlogo-size: 150px;
  }

  div.boot {
    background-color: var(--background-color);
    color: var(--foreground-color);
    font-family: var(--font-family);
    color: white;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    animation: fade-in 0.5s forwards;
  }

  .hidden {
    opacity: 0;
  }

  div.boot * {
    font-weight: var(--global-font-weight);
    cursor: none;
  }

  img.bootlogo {
    height: var(--bootlogo-size);
    width: var(--bootlogo-size);
    transition: opacity 1.5s linear;
    margin-bottom: 28px;
  }

  div.centered {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }

  .center {
    text-align: center;
  }

  div.status {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    font-family: var(--font-family);
    color: white;
    font-weight: 100;
    transition: opacity 1.5s linear;
  }

  div.slider.userdefined {
    width: 150px;
    border-radius: 3.5px;
    background-color: #333;
    height: 7px;
    transition: opacity 1.5s;
  }

  div.line.dark {
    background-color: transparent;
    border-radius: 3.5px;
    height: 7px;
  }

  div.subline.dark.inc {
    background-color: #ccc;
    border-radius: 3.5px;
    height: 7px;
  }

  div.subline.dark.dec {
    background-color: #ccc;
    border-radius: 3.5px;
    height: 7px;
  }

  h4.status {
    margin-top: 300px;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Inter&display=swap");
</style>
