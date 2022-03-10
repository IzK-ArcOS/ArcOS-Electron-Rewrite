<script lang="ts">
  import dfltpfp from "../../img/profilePictures/undefined.png";
  import spinner from "../../img/spinner.svg";
  import Desktop from "../desktop/Desktop.svelte";
  import { notifyStartService } from "../ts/logLogic";
  import { powerState, userDataStore } from "../ts/stores";
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import { PowerState } from "../ts/powerLogic";
  import Logoff from "../Logoff.svelte";

  export let username: string;

  let blur: boolean = false;
  let desk: boolean = false;
  let pwrState: PowerState;

  if (!username) username = "User";

  setTimeout(() => {
    blur = true;
    powerState.set(PowerState.logging_in);
  }, 50);

  setTimeout(() => {
    desk = true;
    powerState.set(PowerState.on);
  }, 5000);

  function updatePowerState(value: PowerState) {
    pwrState = value;
  }

  powerState.subscribe(updatePowerState);

  notifyStartService("ToDesktop: Redirecting to Desktop...");

  userDataStore.set(getUserData(username) as UserTemplate);
</script>

{#if !desk}
  <div class="background" />
  <div class="welcome" class:blur>
    <div class="content">
      <img src={dfltpfp} height="150px" alt="Profile" class="profile" />
      <h1 class="passwordHeader">Hi, {username}!</h1>
      <h3 class="passwordSubHeader">Hang on...</h3>
      <br />
      <img src={spinner} height="50px" alt="Loading" />
    </div>
  </div>
{:else}
  <div>
    {#if pwrState == PowerState.desktop || pwrState == PowerState.on}
      <Desktop {username} />
    {:else if pwrState == PowerState.logging_off}
      <Logoff powerOff={false} {username} />
    {:else if pwrState == PowerState.shutting_down}
      <Logoff powerOff={true} {username} />
    {/if}
  </div>
{/if}

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Inter&display=swap");
  img.profile {
    border-radius: 50%;
  }

  div.background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url("../../bg/img16.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .passwordHeader {
    margin: 0px;
  }

  .passwordSubHeader {
    margin: 0px;
    margin-top: 5px;
  }

  div.welcome {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: backdrop-filter 0.25s;
  }

  div.welcome.blur {
    backdrop-filter: blur(15px);
  }

  div.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: "IBM Plex Sans", sans-serif;
  }

  * {
    color: white;
  }
</style>
