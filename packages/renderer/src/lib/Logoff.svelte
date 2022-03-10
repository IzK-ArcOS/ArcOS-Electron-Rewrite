<script lang="ts">
  import dfltpfp from "../img/profilePictures/undefined.png";
  import spinner from "../img/spinner.svg";
  import BlankIn from "./BlankIn.svelte";
  import LoginScreen from "./LoginScreen.svelte";
  export let username: string;
  export let powerOff: boolean;

  let blur: boolean = false;
  let redirect: boolean = false;

  setTimeout(() => {
    blur = true;
  }, 50);

  setTimeout(() => {
    if (powerOff) {
      close();
    } else {
      redirect = true;
    }
  }, 4000);
</script>

{#if !redirect}
  <div class="welcome" class:blur>
    <div class="content">
      <img src={dfltpfp} height="150px" alt="Profile" class="profile" />
      <h1 class="passwordHeader">Goodbye, {username}!</h1>
      <h3 class="passwordSubHeader">
        {powerOff ? "Shutting down..." : "Logging off..."}
      </h3>
      <br />
      <img src={spinner} height="50px" alt="Loading" />
    </div>
    {#if powerOff}
      <BlankIn delay={3000} />
    {/if}
  </div>
{:else}
  <LoginScreen />
{/if}

<style scoped>
  img.profile {
    border-radius: 50%;
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
  }
</style>
