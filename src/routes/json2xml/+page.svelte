<script>
	import { getContext } from 'svelte';
	import { XMLParser, XMLBuilder } from 'fast-xml-parser';
	import { formatJSON, codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
	import { json } from '@codemirror/lang-json';
	import { yaml } from '@codemirror/legacy-modes/mode/yaml';
	import { StreamLanguage } from '@codemirror/language';

	const { setPageTitle } = getContext('root');
	setPageTitle('JSON to XML');

	let leftEditor = withCodemirrorInstance();
	let rightEditor = withCodemirrorInstance();
	let errMsg = '';

	const builder = new XMLBuilder({
		format: true
	});
	const parser = new XMLParser({
		allowBooleanAttributes: true
	});

	function encode() {
		errMsg = '';
		const jsonVal = codeMirrorUtils.getValue($leftEditor);
		if (jsonVal.length > 0) {
			const obj = JSON.parse(jsonVal);
			const s = builder.build(obj);
			codeMirrorUtils.setFirst($leftEditor);
			codeMirrorUtils.setValue($leftEditor, formatJSON(jsonVal, 2, true));
			codeMirrorUtils.setValue($rightEditor, s);
			codeMirrorUtils.selectAll($rightEditor);
		}
	}

	function decode() {
		errMsg = '';
		const str = codeMirrorUtils.getValue($rightEditor);
		if (str.length > 0) {
			codeMirrorUtils.setFirst($rightEditor);
			try {
				let jObj = parser.parse(str);
				codeMirrorUtils.setValue($leftEditor, formatJSON(jObj, 2, true));
				codeMirrorUtils.selectAll($rightEditor);
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

	<div class="flex flex-wrap flex-row flex-1 space-x-0 justify-between items-stretch xl:space-x-2 xl:flex-nowrap">
		<fieldset class="border border-gray-300 flex-none overflow-hidden bg-zinc-100 basis-full xl:basis-1/2">
			<legend class="pr-2 font-semibold text-gray-400">JSON</legend>
			<div
				class="codemirror-editor"
				use:codemirror={{
					value: '{}',
					lang: json(),
					tabSize: 2,
					instanceStore: leftEditor,
					extensions: codeMirrorUtils.baseExtensions
				}}
			/>
		</fieldset>
		<fieldset class="border border-gray-300 flex-none overflow-hidden bg-zinc-100 basis-full xl:basis-1/2">
			<legend class="pr-2 font-semibold text-gray-400">XML</legend>
			<div
				class="codemirror-editor"
				use:codemirror={{
					value: 'e30=',
					tabSize: 2,
					instanceStore: rightEditor,
					extensions: [...codeMirrorUtils.baseExtensions, StreamLanguage.define(yaml)]
				}}
			/>
		</fieldset>
	</div>
</div>
