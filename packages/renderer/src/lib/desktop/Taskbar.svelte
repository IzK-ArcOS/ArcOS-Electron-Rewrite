<script lang="ts">
  import { getUserData, isUser, TaskbarPosition, Theme } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";

  import ActionCenter from "./ActionCenter.svelte";
  import Startmenu from "./Startmenu.svelte";
  import buf from "buffer/";
  import { Themes } from "../ts/themeLogic";

  export let username: string;

  const Buffer = buf.Buffer;
  const userExists = isUser(Buffer.from(username).toString("base64"));

  let theme: Theme = Theme.darkround;
  let tbtop: boolean = false;
  let backg: string;
  let border: string;

  if (userExists) {
    setInterval(() => {
      const userData: UserTemplate = getUserData(username) as UserTemplate;

      theme = userData.theme;
      tbtop = userData.taskbarPos == TaskbarPosition.top;
      backg = Themes.get(theme)!.variables.taskbarBackground;
      border = Themes.get(theme)!.variables.windowBorder;
    }, 50);
  }

  console.log(theme, getUserData(username));

  let startMenuOpened: boolean;
  let actnCentrOpened: boolean;
</script>

<div
  class="taskbar"
  class:ontop={tbtop}
  style="background-color: {backg}; border: {border};"
>
  <Startmenu />
  <ActionCenter />
</div>

<style scoped>
  div.taskbar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 35px;
    border-radius: 7.5px;
  }

  div.taskbar.ontop {
    top: 10px;
    bottom: unset;
  }
</style>
