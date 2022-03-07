<script lang="ts">
  import { getUserData, isUser } from "../ts/userLogic";
  import type { UserTemplate } from "../ts/userLogic";
  import buf from "buffer/";
  import { Wallpapers } from "../ts/wallpaperLogic";
  import defwall from "../../bg/img12.png";

  export let username: string;

  const Buffer = buf.Buffer;
  const userExists = isUser(Buffer.from(username).toString("base64"));

  let wallpaper: string = defwall;

  if (userExists) {
    const userData: UserTemplate = getUserData(username) as UserTemplate;

    if (Wallpapers.has(userData.wallpaper))
      wallpaper = Wallpapers.get(userData.wallpaper)!;
    else wallpaper = defwall;
  }

  console.log(wallpaper, getUserData(username));
</script>

<div class="wallpaper" style="background-image: url({wallpaper})" />

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
