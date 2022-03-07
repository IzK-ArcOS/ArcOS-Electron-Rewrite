<script lang="ts">
import { notifyStartService } from "../ts/logLogic";


  interface QuickAction {
    icon: string;
    //title:string;
    action: () => void;
  }

  const actions: QuickAction[] = [
    {
      icon: "power_settings_new",
      action: () => {
        alert("Shutdown");
      },
    },
    {
      icon: "refresh",
      action: () => {
        alert("Restart");
      },
    }
  ];

  notifyStartService("Login: QuickActions: Populating Quick Actions")
</script>

<div class="quickactions">
  {#each actions as action}
    <button on:click={action.action}>
      <span class="material-icons">{action.icon}</span>
    </button>
  {/each}
</div>

<style scoped>
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

  div.quickactions {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #fff1;
    padding: 5px;
    line-height: 30px;
    border-radius: 30px;
  }

  button {
    background-color: #0000;
    border: none;
    color: white;
    vertical-align: middle;
  }
</style>
