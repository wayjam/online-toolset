<script>
	   /** @type {import('./$types').PageData} */
	import { page } from '$app/stores';
</script>

<h1 class="text-bold text-yellow-700 text-center text-3xl py-20">{$page.status}: {$page.error.message}</h1>
