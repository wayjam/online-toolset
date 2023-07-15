<script>
	import { getContext } from 'svelte';
	import Monaco from '$lib/monaco.svelte';
	import { writable } from 'svelte/store';


	const { setPageTitle } = getContext('root');
	setPageTitle('Simple Editor');

	let content = ''
</script>

<div class="container mx-auto px-4">
	<Monaco class="codemirror-editor" content={content}/>
</div>
