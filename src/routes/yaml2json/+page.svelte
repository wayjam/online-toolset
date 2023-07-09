<script>
	import { getContext } from 'svelte';
	import { formatJSON, codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
	import { json } from '@codemirror/lang-json';
	import { yaml } from '@codemirror/legacy-modes/mode/yaml';
	import { StreamLanguage } from '@codemirror/language';

	const { setPageTitle } = getContext('root');
	setPageTitle('YAML to JSON');
	let leftEditor = withCodemirrorInstance();
	let rightEditor = withCodemirrorInstance();
	let errMsg = '';
	let YAML;

	let sortKeys = false;
	let forceQuotes = false;
	let noArrayIndent = false;

	function toJSON() {
		errMsg = '';
		const yamlVal = codeMirrorUtils.getValue($leftEditor);
		if (yamlVal.length > 0) {
			codeMirrorUtils.setFirst($leftEditor);
			try {
				let jsonVal = YAML.load(yamlVal);
				jsonVal = formatJSON(jsonVal, 2, true);
				codeMirrorUtils.setValue($rightEditor, jsonVal)
				codeMirrorUtils.selectAll($rightEditor)
			} catch (err) {
				errMsg = err;
			}
		}
	}

	function toYAML() {
		errMsg = '';
		const jsonVal = codeMirrorUtils.getValue($rightEditor);
		if (jsonVal.length > 0) {
			codeMirrorUtils.setFirst($rightEditor);
			try {
				const obj = JSON.parse(jsonVal);
				let yamlVal = YAML.dump(obj, {
					indent: 2,
					sortKeys,
					noArrayIndent,
					forceQuotes
				});
				codeMirrorUtils.setValue($leftEditor, yamlVal)
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
			<legend class="pr-2 font-semibold text-gray-400">JSON</legend>
			<div
				class="editor-60vh"
				use:codemirror={{
					value: '',
					lang: json(),
					tabSize: 2,
					instanceStore: rightEditor,
					extensions: codeMirrorUtils.baseExtensions
				}}
			/>
		</fieldset>
	</div>
</div>