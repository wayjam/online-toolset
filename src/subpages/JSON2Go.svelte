<script>
  import { getContext } from 'svelte';

  import 'codemirror/mode/go/go.js';
  import CodeMirrorEditor from '../lib/CodeMirror.svelte';

  const { setSubTitle } = getContext('root');
  setSubTitle('JSON to Go Sturct');

  let leftEditor;
  let rightEditor;
  let nestedStruct = false;
  let errMsg = '';
  let jsonToGo;

  function transform() {
    errMsg = '';
    const jsonVal = leftEditor.getValue();
    if (jsonVal.length > 0) {
      leftEditor.setCursor(0);
      try {
        let output = jsonToGo(jsonVal, '', !nestedStruct, false);
        if (output.error) {
          errMsg = output.error;
          console.log('ERROR:', output, output.error);
        } else {
          rightEditor.setValue(output.go);
          rightEditor.execCommand('selectAll');
        }
      } catch (err) {
        errMsg = err;
      }
    }
  }

  const initializeJSONToGo = () => {
    jsonToGo = globalThis.jsonToGo;
  };
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/gh/mholt/json-to-go/json-to-go.js"
    on:load={initializeJSONToGo}></script>
</svelte:head>

<div class="container mx-auto px-4">
  <button class="btn-blue" on:click={transform}>Transform</button>
  <label for="nested-struct">
    <input type="checkbox" id="nested-struct" bind:checked={nestedStruct} /> Nested Sturct
  </label>
  <div class="leading-relaxed block text-red-500 font-mono">
    {errMsg}
  </div>

  <div class="notranslate flex md:flex-nowrap flex-wrap justify-between space-x-2">
    <fieldset class="block border border-gray-300 md:w-1/2 w-full flex-grow-0 flex-shrink-0">
      <legend class="pr-2 font-semibold text-gray-400">JSON</legend>
      <CodeMirrorEditor
        class="fix-height-container"
        bind:editor={leftEditor}
        options={{
          mode: {
            name: 'javascript',
            json: true,
          },
        }}
      />
    </fieldset>
    <fieldset class="block border border-gray-300  md:w-1/2 w-full flex-grow-0 flex-shrink-0">
      <legend class="pr-2 font-semibold text-gray-400">Go</legend>
      <CodeMirrorEditor
        class="fix-height-container"
        bind:editor={rightEditor}
        options={{
          mode: {
            name: 'go',
          },
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
