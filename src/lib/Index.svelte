<script>
  import { getContext } from 'svelte';
  import { appRoutes } from './routes';
  import { link } from 'svelte-spa-router';

  const { setSubTitle } = getContext('root');
  setSubTitle('Home');
</script>

<div class="container px-5 py-20 mx-auto flex flex-wrap">
  <div class="flex flex-wrap -m-4 justify-start content-around items-stretch">
    {#each appRoutes as route}
      <div class="p-4 lg:w-1/3 md:w-full">
        <div
          class="flex border-2 rounded-md border-gray-300 border-opacity-50 p-8 sm:flex-row flex-col bg-blue-50 bg-opacity-50"
        >
          <div class="flex-grow">
            <a
              use:link
              class="block text-gray-800 hover:underline hover:text-blue-500"
              href={route.path}
            >
              <h2 class="text-lg title-font font-medium mb-3">
                {route.name} &cudarrl;
              </h2>
            </a>
            <p class="leading-relaxed text-base">
              {route.description}
            </p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
