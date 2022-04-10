<script>
  import { getContext } from "svelte";
  import { formatJSON } from "../utils/index";
  import CodeMirrorEditor from "../lib/CodeMirror.svelte";
  import { js2schema } from "js2schema";

  const { setSubTitle } = getContext("root");
  setSubTitle("JSON to JSON Schema");

  let leftEditor;
  let rightEditor;
  let errMsg = "";

  function transform() {
    errMsg = "";
    const jsonVal = leftEditor.getValue();
    if (jsonVal.length > 0) {
      leftEditor.setCursor(0);
      try {
        const obj = JSON.parse(jsonVal);
        leftEditor.setValue(formatJSON(jsonVal, 2, true));
        const result = js2schema(obj);
        const s = formatJSON(result, 2, true);
        rightEditor.setValue(s);
        rightEditor.execCommand("selectAll");
      } catch (err) {
        errMsg = err;
      }
    }
  }

</script>

<div class="container mx-auto px-4">
  <button class="btn-blue" on:click={transform}>Transform</button>
  <div class="leading-relaxed block text-red-500 font-mono">
    {errMsg}
  </div>

  <div
    class="notranslate flex md:flex-nowrap flex-wrap justify-between space-x-2"
  >
    <fieldset
      class="block border border-gray-300 md:w-1/2 w-full flex-grow-0 flex-shrink-0"
    >
      <legend class="pr-2 font-semibold text-gray-400">JSON</legend>
      <CodeMirrorEditor
        class="fix-height-container"
        bind:editor={leftEditor}
        options={{
          mode: {
            name: "javascript",
            json: true,
          },
        }}
      />
    </fieldset>
    <fieldset
      class="block border border-gray-300  md:w-1/2 w-full flex-grow-0 flex-shrink-0"
    >
      <legend class="pr-2 font-semibold text-gray-400">JSON Schema</legend>
      <CodeMirrorEditor
        class="fix-height-container"
        bind:editor={rightEditor}
        options={{
          lineWrapping: true,
        }}
      />
    </fieldset>
  </div>
</div>

<style module>
  .fix-height-container {
    height: 60vh;
  }

</style>
