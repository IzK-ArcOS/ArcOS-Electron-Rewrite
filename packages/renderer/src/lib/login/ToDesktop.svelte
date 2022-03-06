<script lang="ts">
  import dfltpfp from "../../img/profilePictures/undefined.png";
  import spinner from "../../img/spinner.svg";

  export let username: string;

  if (!username) username = "User";
</script>

<div class="welcome">
  <img src={dfltpfp} height="150px" alt="Profile" class="profile" />
  <h1 class="passwordHeader">Hi, {username}!</h1>
  <h3 class="passwordSubHeader">Hang on...</h3>
  <br />
  <img src={spinner} height="50px" alt="Loading" />
</div>

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

  div.welcome{ 
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    text-align: center;
  }
</style>
