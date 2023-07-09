<script>
	import { getContext } from 'svelte';
	import { codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
	import { json } from '@codemirror/lang-json';
	import { go } from '@codemirror/legacy-modes/mode/go';
	import { StreamLanguage } from '@codemirror/language';

	const { setPageTitle } = getContext('root');
	setPageTitle('JSON to Go Sturct');

	let leftEditor = withCodemirrorInstance();
	let rightEditor = withCodemirrorInstance();
	let nestedStruct = false;
	let errMsg = '';
	let jsonToGo;

	function transform() {
		errMsg = '';
		const jsonVal = codeMirrorUtils.getValue($leftEditor);
		if (jsonVal.length > 0) {
			codeMirrorUtils.setFirst($leftEditor);
			try {
				let output = jsonToGo(jsonVal, '', !nestedStruct, false);
				if (output.error) {
					errMsg = output.error;
					console.log('ERROR:', output, output.error);
				} else {
					codeMirrorUtils.setValue($rightEditor, output.go);
					codeMirrorUtils.selectAll($rightEditor);
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
		on:load={initializeJSONToGo}
	></script>
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
			<div
				class="editor-60vh"
				use:codemirror={{
					value: '{}',
					tabSize: 2,
					lang: json(),
					instanceStore: leftEditor,
					extensions: codeMirrorUtils.baseExtensions
				}}
			/>
		</fieldset>
		<fieldset class="block border border-gray-300 md:w-1/2 w-full flex-grow-0 flex-shrink-0">
			<legend class="pr-2 font-semibold text-gray-400">Go</legend>
			<div
				class="editor-60vh"
				use:codemirror={{
					value: '',
					tabSize: 2,
					instanceStore: rightEditor,
					extensions: [...codeMirrorUtils.baseExtensions, StreamLanguage.define(go)]
				}}
			/>
		</fieldset>
	</div>
</div>
