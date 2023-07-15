<script>
	import { getContext } from 'svelte';
	import { formatJSON, codeMirrorUtils } from '$lib/utils';
	import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';

	const { setPageTitle } = getContext('root');
	setPageTitle('Duplicate Line');

	let editor = withCodemirrorInstance();

	function run() {
		let val = codeMirrorUtils.getValue($editor);
		if (val.length > 0) {
			val = [...new Set(val.split('\n'))].join('\n');
			codeMirrorUtils.setValue($editor, val);
		}
	}
</script>

<div class="container mx-auto px-4">
	<button class="btn-blue" on:click={run}>Run</button>
	<div
		class="editor border-collapse border border-solid border-current my-5"
		use:codemirror={{
			value: '',
			tabSize: 2,
			instanceStore: editor,
			extensions: codeMirrorUtils.baseExtensions
		}}
	/>
</div>
