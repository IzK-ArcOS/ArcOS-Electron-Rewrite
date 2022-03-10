<script lang="ts">
    import { BSODMessg, BSODTitle } from "./ts/stores";

    let title:string;
    let messg:string;

    BSODTitle.subscribe((v) => title = v);
    BSODMessg.subscribe((v) => messg = v);

    setTimeout(window.location.reload, 3000);
</script>

<div class="body">
  <div class="content">
    <h1>
      <span class="material-icons icon" alt="warning">warning</span>
      ArcOS was unable to process a component<br />
      or program and had to shut down to prevent<br />
      further damage.<br />
      <br />
      ArcOS will restart in a couple of seconds.<br />
    </h1>
    <p class="errorDetails" />
    <table>
      <tr>
        <td>
          <p class="errorDetails">Error Code</p>
        </td>
        <td>
          <p id="title" class="errorDetails">{title}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p class="errorDetails">Error Details&nbsp;&nbsp;&nbsp;</p>
        </td>
        <td>
          <p id="message" class="errorDetails">{messg}</p>
        </td>
      </tr>
    </table>
  </div>
</div>

<style scoped>
  div.body {
    background-color: #003769;
    color: #dbdbed;
    overflow: hidden;
    word-break: break-all;
    font-family: "Roboto", sans-serif;
    position:fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
  }

  /* * {
    cursor: none;
} */

  h1 {
    font-size: 2vw;
    font-weight: lighter;
    margin-bottom: 0px;
  }

  div.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div.content > H1 > span.icon {
    position: absolute;
    left: -9vw;
    top: 2vw;
    height: 7vw;
    font-size:6.7vw
  }

  p.errorDetails {
    opacity: 0.5;
    font-style: italic;
    font-family: "Ubuntu Mono", monospace;
    margin: 0px;
    font-size: 1vw;
  }

  table {
    margin-top: 1vw;
  }

  p#message,
  p#title {
    vertical-align: top;
  }

  td {
    max-width: 30vw;
    vertical-align: top;
  }
</style>
