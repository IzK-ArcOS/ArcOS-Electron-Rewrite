<script lang="ts">
  import "../../css/general.scss";
  import { getUserData } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import { Wallpapers } from "../ts/wallpaperLogic";
  import defwall from "../../bg/img12.png";
  import { userDataStore } from "../ts/stores";
  import { closeStart } from "../ts/startMenuLogic";

  export let username: string;

  let wallpaper: string = defwall;

  function update(uData: UserTemplate | boolean) {
    const userData: UserTemplate = uData as UserTemplate;

    if (Wallpapers.has(userData.wallpaper))
      wallpaper = Wallpapers.get(userData.wallpaper)!;
    else wallpaper = defwall;
  }

  update(getUserData(username));

  userDataStore.subscribe(update);

  console.log(wallpaper, getUserData(username));
</script>

<div
  class="wallpaper"
  style="background-image: url({wallpaper})"
  on:click={closeStart}
/>

<style scoped>
  div.wallpaper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    color: white;
    background-color: black;
    overflow: hidden;
    user-select: none;
    padding: 0px;
    margin: 0px;
    transition: opacity 0.5s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
