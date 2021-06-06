<script>
  import { getContext } from 'svelte';

  import 'codemirror/mode/yaml/yaml.js';
  import CodeMirrorEditor from '../lib/CodeMirror.svelte';

  import { formatJSON } from '../utils/index';

  const { setSubTitle } = getContext('root');
  setSubTitle('YAML to JSON');

  let leftEditor;
  let rightEditor;
  let errMsg = '';
  let YAML;

  let sortKeys = false;
  let forceQuotes = false;
  let noArrayIndent = false;

  function toJSON() {
    errMsg = '';
    const yamlVal = leftEditor.getValue();
    if (yamlVal.length > 0) {
      leftEditor.setCursor(0);
      try {
        let jsonVal = YAML.load(yamlVal);
        jsonVal = formatJSON(jsonVal, 2, true);
        rightEditor.setValue(jsonVal);
        rightEditor.execCommand('selectAll');
      } catch (err) {
        errMsg = err;
      }
    }
  }

  function toYAML() {
    errMsg = '';
    const jsonVal = rightEditor.getValue();
    if (jsonVal.length > 0) {
      rightEditor.setCursor(0);
      try {
        const obj = JSON.parse(jsonVal);
        let yamlVal = YAML.dump(obj, {
          indent: 2,
          sortKeys,
          noArrayIndent,
          forceQuotes,
        });
        leftEditor.setValue(yamlVal);
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
  <button class="btn-blue" on:click={toJSON}>toJSON</button>
  <button class="btn-blue" on:click={toYAML}>toYAML</button>
  <label for="sortKeys">
    <input type="checkbox" id="sortKeys" bind:checked={sortKeys} /> sort keys
  </label>
  <label for="forceQuotes">
    <input type="checkbox" id="forceQuotes" bind:checked={forceQuotes} /> force quotes
  </label>
  <label for="noArrayIndent">
    <input type="checkbox" id="noArrayIndent" bind:checked={noArrayIndent} /> no array indent
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
      <legend class="pr-2 font-semibold text-gray-400">JSON</legend>
      <CodeMirrorEditor
        class="fix-height-container"
        bind:editor={rightEditor}
        options={{
          mode: {
            name: 'javascript',
            json: true,
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
