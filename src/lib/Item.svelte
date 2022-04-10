<script>
  import { link } from "svelte-spa-router";
  let route = {};
  export { route };

</script>

<div>
  {#if route.external}
    <a
      class="block text-gray-800 hover:underline hover:text-blue-500"
      href={route.path}
      target="_blank"
    >
      <h2 class="text-lg title-font font-medium mb-3">
        {route.name} &cudarrl;
      </h2>
    </a>
  {:else}
    <a
      class="block text-gray-800 hover:underline hover:text-blue-500"
      href={route.path}
      use:link
    >
      <h2 class="text-lg title-font font-medium mb-3">
        {route.name} &cudarrl;
      </h2>
    </a>
  {/if}

  <p class="leading-relaxed text-base">
    {route.description}
  </p>
</div>
