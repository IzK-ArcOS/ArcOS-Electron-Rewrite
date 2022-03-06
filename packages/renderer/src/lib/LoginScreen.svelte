<script lang="ts">
  import QuickActions from "./login/QuickActions.svelte";
  import ToDesktop from "./login/ToDesktop.svelte";
  import User from "./login/UserSelector.svelte";
  import { createUser, isUser } from "./ts/userLogic";
  import buf from "buffer/";

  const Buffer = buf.Buffer;

  createUser("TechWorldInc");

  let users: string[] = [];

  let hidden: boolean = true;
  let goDesk: boolean = false;
  let lognNm: string = "";

  for (let i = 0; i < localStorage.length; i++)
    if (isUser(localStorage.key(i))) users.push(localStorage.key(i)!);

  console.log(users);

  setTimeout(() => {
    hidden = !hidden;
  }, 2000);

  function loginAs(user: string) {
    lognNm = Buffer.from(user,"base64").toString();
    goDesk = true;
  }
</script>

<div class="login" class:hidden>
  {#if !goDesk}<div class="content">
      <div class="userSelector">
        {#each users as user}
          <span
            on:click={() => {
              loginAs(user);
            }}
          >
            <User {user} />
          </span>
        {/each}
      </div>
    </div>
    <QuickActions />{:else}
    <ToDesktop username={lognNm} />
  {/if}
</div>

<style>
  div.login {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    background-color: black;
    overflow: hidden;
    user-select: none;
    padding: 0px;
    margin: 0px;
    transition: opacity 0.5s;
    background-image: url("../bg/img16.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  div.login.hidden {
    opacity: 0;
  }

  div.content {
    padding: 0px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 13px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    /*width: 370px;
    height: 370px;*/
    /*box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);*/
    /*width:242px;*/
    height: 268px;
    text-align: center;
  }

  div.userSelector {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }

  * {
    outline: none !important;
    transition: all 0.25s, transform 0s;
  }
</style>
