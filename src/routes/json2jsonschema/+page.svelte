<script>
	import { getContext } from 'svelte';
	import { formatJSON, codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
	import { js2schema } from 'js2schema';
	import { json } from '@codemirror/lang-json';

	const { setPageTitle } = getContext('root');
	setPageTitle('JSON to JSON Schema');

	let leftEditor = withCodemirrorInstance();
	let rightEditor = withCodemirrorInstance();
	let errMsg = '';

	function transform() {
		errMsg = '';
		const jsonVal = codeMirrorUtils.getValue($leftEditor);
		if (jsonVal.length > 0) {
			codeMirrorUtils.focus($leftEditor);
			codeMirrorUtils.setFirst($leftEditor);
			try {
				const obj = JSON.parse(jsonVal);
				const result = js2schema(obj, {
					title: '',
					shouldConvertNumberString: false,
					typeResolvers: {}
				});
				const s = formatJSON(result, 2, true);
				codeMirrorUtils.setValue($leftEditor, formatJSON(jsonVal, 2, true));
				codeMirrorUtils.setValue($rightEditor, s);
				codeMirrorUtils.selectAll($rightEditor);
			} catch (err) {
				errMsg = err;
			}
		}
	}
</script>

<div class="container mx-auto px-4">
	<button class="btn-blue" on:click={transform}>Transform</button>
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
			<legend class="pr-2 font-semibold text-gray-400">JSON Schema</legend>
			<div
				class="codemirror-editor"
				use:codemirror={{
					value: '',
					tabSize: 2,
					lang: json(),
					instanceStore: rightEditor,
					extensions: codeMirrorUtils.baseExtensions
				}}
			/>
		</fieldset>
	</div>
</div>
