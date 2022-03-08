<script lang="ts">
  import dfltpfp from "../../img/profilePictures/undefined.png";
  import spinner from "../../img/spinner.svg";
  import Desktop from "../desktop/Desktop.svelte";
  import { notifyStartService } from "../ts/logLogic";
  import { userDataStore } from "../ts/stores";
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";

  export let username: string;

  let blur: boolean = false;
  let desk: boolean = false;

  if (!username) username = "User";

  setTimeout(() => {
    blur = true;
  }, 50);

  setTimeout(() => {
    desk = true;
  }, 5000);

  notifyStartService("ToDesktop: Redirecting to Desktop...");

  userDataStore.set(getUserData(username) as UserTemplate);
</script>

{#if !desk}
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
  <Desktop {username} />
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
