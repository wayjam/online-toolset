<script>
  import { getContext } from 'svelte';
  import { formatJSON } from '../utils/index';
  import CodeMirrorEditor from '../lib/CodeMirror.svelte';

  const { setSubTitle } = getContext('root');
  setSubTitle('JSON to String');

  let leftEditor;
  let rightEditor;
  let escape = false;
  let errMsg = '';

  function format() {
    let jsonVal = leftEditor.getValue();
    if (jsonVal.length > 0) {
      jsonVal = formatJSON(jsonVal, 2, true);
      leftEditor.setValue(jsonVal);
    }
  }

  function encode() {
    errMsg = '';
    const jsonVal = leftEditor.getValue();
    if (jsonVal.length > 0) {
      leftEditor.setCursor(0);
      let s;
      try {
        if (!escape) {
          s = JSON.stringify(JSON.parse(jsonVal));
        } else {
          s = JSON.stringify(formatJSON(jsonVal, 0, true));
        }
        leftEditor.setValue(formatJSON(jsonVal, 2, true));
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
      let s;
      try {
        if (!escape) {
          s = JSON.stringify(JSON.parse(strVal));
        } else {
          s = formatJSON(strVal, 2, false);
        }
        s = formatJSON(s, 2, true);
        leftEditor.setValue(s);
        leftEditor.execCommand('selectAll');
      } catch (err) {
        errMsg = err;
      }
    }
  }
</script>

<div class="container mx-auto px-4">
  <button class="btn-blue" on:click={format}>Format</button>
  <button class="btn-blue" on:click={encode}>Encode</button>
  <button class="btn-blue" on:click={decode}>Decode</button>
  <label for="escape">
    <input type="checkbox" id="escape" bind:checked={escape} /> Escape
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
      <legend class="pr-2 font-semibold text-gray-400">Base64</legend>
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
