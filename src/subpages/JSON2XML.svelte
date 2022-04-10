<script>
  import { getContext } from "svelte";
  import { formatJSON } from "../utils/index";
  import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
  import CodeMirrorEditor from "../lib/CodeMirror.svelte";

  const { setSubTitle } = getContext("root");
  setSubTitle("JSON to XML");

  let leftEditor;
  let rightEditor;
  let errMsg = "";

  const builder = new XMLBuilder({
    format: true,
  });
  const parser = new XMLParser({
    allowBooleanAttributes: true,
  });

  function encode() {
    errMsg = "";
    const jsonVal = leftEditor.getValue();
    if (jsonVal.length > 0) {
      const obj = JSON.parse(jsonVal);
      const s = builder.build(obj);
      leftEditor.setCursor(0);
      leftEditor.setValue(formatJSON(jsonVal, 2, true));
      rightEditor.setValue(s);
      rightEditor.execCommand("selectAll");
    }
  }

  function decode() {
    errMsg = "";
    const str = rightEditor.getValue();
    if (str.length > 0) {
      rightEditor.setCursor(0);
      try {
        let jObj = parser.parse(str);
        leftEditor.setValue(formatJSON(jObj, 2, true));
        leftEditor.execCommand("selectAll");
      } catch (err) {
        errMsg = err;
      }
    }
  }

</script>

<div class="container mx-auto px-4">
  <button class="btn-blue" on:click={encode}>to xml</button>
  <button class="btn-blue" on:click={decode}>to json</button>
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
      <legend class="pr-2 font-semibold text-gray-400">XML</legend>
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
