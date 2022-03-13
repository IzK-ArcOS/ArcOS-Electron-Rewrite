<script lang="ts">
  export let type: WarningType;
  export let caption: string;

  enum WarningType {
    info,
    warning,
    error,
  }

  let isWrn = type == WarningType.warning;
  let isErr = type == WarningType.error;
  let isInf = type == WarningType.info;
</script>

<div>
  <span
    class="material-icons"
    class:info={isInf}
    class:warning={isWrn}
    class:error={isErr}>{WarningType[type]}</span
  >
  <p>{caption}</p>
</div>

<style scoped>
  div {
    padding: 30px;
    text-align: left;
    background-color: #fff3;
    width: 300px;
    margin-bottom: 10px;
    display: flex;
    border-radius: 5px;
  }

  div * {
    vertical-align: middle;
    height: inherit;
  }

  span.material-icons.info {
    color: deepskyblue;
  }

  span.material-icons.warning {
    color: orange;
  }
  span.material-icons.error {
    color: #fc5e55;
  }

  p {
    margin: 0;
    margin-left: 10px;
  }
</style>
