<script>
	let route = {};
	export { route };
</script>

<div>
	{#if route.external}
		<a
			class="inline-block text-gray-800 hover:underline hover:text-blue-500 antialiased hover:subpixel-antialiased"
			href={route.path}
			target="_blank"
		>
			<h2 class="text-lg title-font font-medium mb-3">
				{route.name} &cudarrl;
			</h2>
		</a>
	{:else}
		<a class="inline-block text-gray-800 hover:underline hover:text-blue-500 antialiased hover:subpixel-antialiased" href={route.path}>
			<h2 class="text-lg title-font font-medium mb-3">
				{route.name} &cudarrl;
			</h2>
		</a>
	{/if}
	<p class="leading-relaxed italic text-sm text-inherit	">
		{route.description}
	</p>
</div>
