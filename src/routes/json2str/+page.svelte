<script>
	import { getContext } from 'svelte';
	import { formatJSON, codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
	import { json } from '@codemirror/lang-json';

	const { setPageTitle } = getContext('root');
	setPageTitle('JSON to String');

	let leftEditor = withCodemirrorInstance();
	let rightEditor = withCodemirrorInstance();
	let escape = false;
	let errMsg = '';

	function format() {
		let jsonVal = codeMirrorUtils.getValue($leftEditor);
		if (jsonVal.length > 0) {
			jsonVal = formatJSON(jsonVal, 2, true);
			codeMirrorUtils.setValue($leftEditor, jsonVal);
		}
	}

	function encode() {
		errMsg = '';
		const jsonVal = codeMirrorUtils.getValue($leftEditor);
		if (jsonVal.length > 0) {
			codeMirrorUtils.focus($leftEditor);
			codeMirrorUtils.setFirst($leftEditor);
			let s;
			try {
				if (!escape) {
					s = JSON.stringify(JSON.parse(jsonVal));
				} else {
					s = JSON.stringify(formatJSON(jsonVal, 0, true));
				}
				codeMirrorUtils.setValue($leftEditor, formatJSON(jsonVal, 2, true));
				codeMirrorUtils.setValue($rightEditor, s);
				codeMirrorUtils.selectAll($rightEditor);
			} catch (err) {
				errMsg = err;
			}
		}
	}

	function decode() {
		errMsg = '';
		const strVal = codeMirrorUtils.getValue($rightEditor);
		if (strVal.length > 0) {
			codeMirrorUtils.setFirst($rightEditor);
			let s;
			try {
				if (!escape) {
					s = JSON.stringify(JSON.parse(strVal));
				} else {
					s = formatJSON(strVal, 2, false);
				}
				s = formatJSON(s, 2, true);
				codeMirrorUtils.setValue($leftEditor, s);
				codeMirrorUtils.selectAll($leftEditor);
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

	<div
		class="flex flex-wrap flex-row flex-1 space-x-0 justify-between items-stretch xl:space-x-2 xl:flex-nowrap"
	>
		<fieldset
			class="border border-gray-300 flex-none overflow-hidden bg-zinc-100 basis-full xl:basis-1/2"
		>
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
		<fieldset
			class="border border-gray-300 flex-none overflow-hidden bg-zinc-100 basis-full xl:basis-1/2"
		>
			<legend class="pr-2 font-semibold text-gray-400">String</legend>
			<div
				class="codemirror-editor"
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
