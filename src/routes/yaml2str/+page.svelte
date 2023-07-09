<script>
	import { getContext } from 'svelte';
	import { Base64 } from 'js-base64';
	import { codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
	import { yaml } from '@codemirror/legacy-modes/mode/yaml';
	import { StreamLanguage } from '@codemirror/language';

	const { setPageTitle } = getContext('root');
	setPageTitle('YAML to String');

	let leftEditor = withCodemirrorInstance();
	let rightEditor = withCodemirrorInstance();
	let errMsg = '';
	let withBase64 = false;
	let YAML;

	function encode() {
		errMsg = '';
		const yamlVal =codeMirrorUtils.getValue($leftEditor);
		if (yamlVal.length > 0) {
			codeMirrorUtils.setFirst($leftEditor);
			try {
				let s = JSON.stringify(yamlVal);
				if (withBase64) {
					s = Base64.encode(s);
				}
				codeMirrorUtils.setValue($rightEditor, s)
				codeMirrorUtils.selectAll($rightEditor)
			} catch (err) {
				errMsg = err;
			}
		}
	}

	function decode() {
		errMsg = '';
		const strVal =codeMirrorUtils.getValue($rightEditor);
		if (strVal.length > 0) {
			codeMirrorUtils.setFirst($rightEditor);
			try {
				let s = strVal;
				if (withBase64) {
					s = Base64.decode(s);
				}
				s = JSON.parse(s);
				codeMirrorUtils.setValue($leftEditor, s)
				codeMirrorUtils.selectAll($leftEditor)
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
		on:load={loadExternal}
	></script>
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
			<div
				class="editor-60vh"
				use:codemirror={{
					value: '',
					tabSize: 2,
					instanceStore: leftEditor,
					extensions: [...codeMirrorUtils.baseExtensions, StreamLanguage.define(yaml)]
				}}
			/>
		</fieldset>
		<fieldset class="block border border-gray-300 md:w-1/2 w-full flex-grow-0 flex-shrink-0">
			<legend class="pr-2 font-semibold text-gray-400">String</legend>
			<div
				class="editor-60vh"
				use:codemirror={{
					value: '',
					tabSize: 2,
					instanceStore: rightEditor,
					extensions: [...codeMirrorUtils.baseExtensions, codeMirrorUtils.lineWrapping]
				}}
			/>
		</fieldset>
	</div>
</div>