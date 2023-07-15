<script>
	import { getContext } from 'svelte';
	import { appRoutes } from '$lib/routes';
	import Item from '$lib/Item.svelte';

	const { setPageTitle } = getContext('root');
	setPageTitle('Home');
</script>

<div class="container px-5 py-5 mx-auto">
	{#each appRoutes as routesGroup}
		<h3
			class="w-full leading-normal block py-8 font-sans text-2xl capitalize cursor-default text-inherit text-slate-400"
		>
			{routesGroup.name}
		</h3>
		<div class="flex flex-wrap flow-row -m-4 content-around items-stretch">
			{#each routesGroup.routes as route}
				<div class="p-4 lg:w-1/4 md:w-full">
					<div
						class="border-2 rounded-md border-gray-300 border-opacity-50 p-4 bg-indigo-100 bg-opacity-50"
					>
						<Item {route} />
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
