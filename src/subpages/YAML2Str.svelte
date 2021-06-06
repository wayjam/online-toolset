<script>
  import { getContext } from 'svelte';
  import { Base64 } from 'js-base64';
  import 'codemirror/mode/yaml/yaml.js';
  import CodeMirrorEditor from '../lib/CodeMirror.svelte';

  const { setSubTitle } = getContext('root');
  setSubTitle('YAML to String');

  let leftEditor;
  let rightEditor;
  let errMsg = '';
  let withBase64 = false;
  let YAML;

  function encode() {
    errMsg = '';
    const yamlVal = leftEditor.getValue();
    if (yamlVal.length > 0) {
      leftEditor.setCursor(0);
      try {
        let s = JSON.stringify(yamlVal);
        if (withBase64) {
          s = Base64.encode(s);
        }
        rightEditor.setValue(s);
        rightEditor.execCommand('selectAll');
      } catch (err) {
        errMsg = err;
      }
    }
  }

  function decode() {
    errMsg = '';
    const strVal = rightEditor.getValue();
    if (strVal.length > 0) {
      rightEditor.setCursor(0);
      try {
        let s = strVal;
        if (withBase64) {
          s = Base64.decode(s);
        }
        s = JSON.parse(s);
        leftEditor.setValue(s);
        leftEditor.execCommand('selectAll');
      } catch (err) {
        errMsg = err;
      }
    }
  }

  const loadExternal = () => {
    YAML = globalThis.jsyaml;
  };
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"
    on:load={loadExternal}></script>
</svelte:head>

<div class="container mx-auto px-4">
  <button class="btn-blue" on:click={encode}>Encode</button>
  <button class="btn-blue" on:click={decode}>Decode</button>
  <label for="base64">
    <input type="checkbox" id="base64" bind:checked={withBase64} /> Base64
  </label>
  <div class="leading-relaxed block text-red-500 font-mono">
    {errMsg}
  </div>

  <div class="notranslate flex md:flex-nowrap flex-wrap justify-between space-x-2">
    <fieldset class="block border border-gray-300 md:w-1/2 w-full flex-grow-0 flex-shrink-0">
      <legend class="pr-2 font-semibold text-gray-400">YAML</legend>
      <CodeMirrorEditor
        class="fix-height-container"
        bind:editor={leftEditor}
        options={{
          mode: {
            name: 'yaml',
          },
        }}
      />
    </fieldset>
    <fieldset class="block border border-gray-300  md:w-1/2 w-full flex-grow-0 flex-shrink-0">
      <legend class="pr-2 font-semibold text-gray-400">String</legend>
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
