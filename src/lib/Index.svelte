<script>
  import { getContext } from 'svelte';
  import { appRoutes } from './routes';
  import { link } from 'svelte-spa-router';

  const { setSubTitle } = getContext('root');
  setSubTitle('Home');
</script>

<div class="container px-5 py-24 mx-auto flex flex-wrap">
  <div class="flex flex-wrap -m-4">
    {#each appRoutes as route}
      <div class="p-4 lg:w-1/2 md:w-full">
        <div
          class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col"
        >
          <div class="flex-grow">
            <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
              {route.name}
            </h2>
            <p class="leading-relaxed text-base">
              {route.description}
            </p>
            <a use:link class="mt-3 text-indigo-500 inline-flex items-center" href={route.path}>
              Go &rarr;
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
