<script lang="ts">
  import dfltpfp from "../img/profilePictures/undefined.png";
  import spinner from "../img/spinner.svg";
  import { PowerState } from "./ts/powerLogic";
  import { powerState } from "./ts/stores";
  export let username: string;
  export let powerOff: boolean;

  let blur: boolean = false;

  setTimeout(() => {
    blur = true;
  }, 50);

  setTimeout(() => {
    if (powerOff) {
      close();
    } else {
      powerState.set(PowerState.login);
    }
  }, 4000);
</script>

<div class="background" />
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
</div>

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
    background-image: url("../bg/img16.png");
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
