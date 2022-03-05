<script lang="ts">
  import buf from "buffer/";

  const Buffer = buf.Buffer;

  import pfp from "../../../img/profilePictures/undefined.png";

  let ProfilePicture = pfp;

  export let user: string;

  user = Buffer.from(user, "base64").toString();

  if (localStorage.getItem(user)) {
    console.log(localStorage.getItem(user));
  }
</script>

<button class="user" id="USER#{user}">
  <img src={ProfilePicture} alt="Profile" />
  <p>{user}</p>
</button>

<style lang="css" scoped>
  button.user {
    width: 150px;
    height: 150px;
    padding: 20px;
    background-color: transparent;
    border: none;
    margin: 0px;
    border-radius: 13px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: unset;
    padding-bottom: 10px;
    margin-bottom: 10px;
    color:white;
  }

  button.user:hover,
  button.user:focus {
    background-color: #1b1b1b3a;
  }

  button.user:active {
    background-color: #00000077;
  }

  button.user > img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /*box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);*/
    margin-bottom: 10px;
  }

  button.user > p {
    max-width: 160px;
    overflow-x: hidden;
    margin: 0px;
  } 

  
  * {
    outline: none !important;
    /*transition: all 0.25s;*/
    transition: all 0.25s, transform 0s;
    /*cursor: url("../../imgs/cursor.png"), default!important;*/
  }
</style>
