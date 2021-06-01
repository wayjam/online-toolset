<script context="module">
  import CodeMirror from 'codemirror';

  // css
  // import 'codemirror/lib/codemirror.css';
  import 'codemirror/addon/fold/foldgutter.css';
  import './codemirror.css';

  // langs
  import 'codemirror/mode/javascript/javascript.js';

  // addons
  import 'codemirror/addon/fold/foldcode.js';
  import 'codemirror/addon/fold/foldgutter.js';
  import 'codemirror/addon/fold/indent-fold.js';
  import 'codemirror/addon/fold/brace-fold.js';
</script>

<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let options = {};
  let editor = null;
  let readOnly = false;
  let errorLoc = null;
  let tab = true;

  export { options, editor, readOnly, errorLoc, tab };

  let w;
  let h;
  let code = '';

  // We have to expose set and update methods, rather
  // than making this state-driven through props,
  // because it's difficult to update an editor
  // without resetting scroll otherwise
  export async function set(new_code, new_opts) {
    if (new_opts !== options) {
      await createEditor(new_opts);
    }

    code = new_code;
    updating_externally = true;
    if (editor) editor.setValue(code);
    updating_externally = false;
  }

  export function update(new_code) {
    code = new_code;

    if (editor) {
      const { left, top } = editor.getScrollInfo();
      editor.setValue((code = new_code));
      editor.scrollTo(left, top);
    }
  }

  export function resize() {
    editor.refresh();
  }

  export function focus() {
    editor.focus();
  }

  export function getHistory() {
    return editor.getHistory();
  }

  export function setHistory(history) {
    editor.setHistory(history);
  }

  export function clearHistory() {
    if (editor) editor.clearHistory();
  }

  const refs = {};
  let updating_externally = false;
  let marker;
  let error_line;
  let destroyed = false;

  $: if (editor && w && h) {
    editor.refresh();
  }

  $: {
    if (marker) marker.clear();

    if (errorLoc) {
      const line = errorLoc.line - 1;
      const ch = errorLoc.column;

      marker = editor.markText(
        { line, ch },
        { line, ch: ch + 1 },
        {
          className: 'error-loc',
        }
      );

      error_line = line;
    } else {
      error_line = null;
    }
  }

  let previous_error_line;
  $: if (editor) {
    if (previous_error_line != null) {
      editor.removeLineClass(previous_error_line, 'wrap', 'error-line');
    }

    if (error_line && error_line !== previous_error_line) {
      editor.addLineClass(error_line, 'wrap', 'error-line');
      previous_error_line = error_line;
    }
  }

  onMount(() => {
    (async () => {
      await createEditor(options);

      if (editor) {
        editor.setValue(code || '');
        dispatch('ready');
      }
    })();

    return () => {
      destroyed = true;
      if (editor) editor.toTextArea();
    };
  });

  let first = true;

  async function createEditor(options) {
    if (destroyed || !CodeMirror) return;

    if (editor) editor.toTextArea();

    const opts = {
      lineNumbers: true,
      // lineWrapping: true,
      indentWithTabs: true,
      indentUnit: 2,
      tabSize: 2,
      value: '',
      mode: {
        name: 'javascript',
        json: false,
      },
      readOnly,
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
        'Ctrl-/': 'toggleComment',
        'Cmd-/': 'toggleComment',
        'Ctrl-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        },
        'Cmd-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        },
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      ...options,
    };

    if (!tab) {
      opts.extraKeys['Tab'] = tab;
      opts.extraKeys['Shift-Tab'] = tab;
    }

    // Creating a text editor is a lot of work, so we yield
    // the main thread for a moment. This helps reduce jank
    if (first) await sleep(50);

    if (destroyed) return;

    editor = CodeMirror.fromTextArea(refs.editor, opts);
    editor.on('change', (instance) => {
      if (!updating_externally) {
        const value = instance.getValue();
        dispatch('change', { value });
      }
    });

    if (first) await sleep(50);

    editor.refresh();

    first = false;
  }

  function sleep(ms) {
    return new Promise((fulfil) => setTimeout(fulfil, ms));
  }
</script>

<div
  class={`codemirror-container ${$$props.class || ''}`}
  bind:offsetWidth={w}
  bind:offsetHeight={h}
>
  <!-- svelte-ignore a11y-positive-tabindex -->
  <textarea tabindex="2" bind:this={refs.editor} readonly={readOnly} value={code} />
</div>

<style>
  .codemirror-container {
    position: relative;
    max-height: 100vh;
    max-width: 100vh;
  }

  textarea {
    visibility: hidden;
  }
</style>
