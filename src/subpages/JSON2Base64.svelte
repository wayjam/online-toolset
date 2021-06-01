<script>
  import { getContext } from 'svelte';
  import { Base64 } from 'js-base64';
  import { formatJSON } from '../utils/index';
  import CodeMirrorEditor from '../lib/CodeMirror.svelte';

  const { setSubTitle } = getContext('root');
  setSubTitle('JSON to BASE64');

  let leftEditor;
  let rightEditor;
  let errMsg = '';

  function encode() {
    errMsg = '';
    const jsonVal = leftEditor.getValue();
    if (jsonVal.length > 0) {
      leftEditor.setCursor(0);
      try {
        let s = formatJSON(jsonVal, 0, true);
        s = s.length > 0 ? Base64.encode(s) : '';
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
      try {
        let s = formatJSON(Base64.decode(strVal), 2, true);
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
  <button class="btn-blue" on:click={encode}>Encode</button>
  <button class="btn-blue" on:click={decode}>Decode</button>
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
