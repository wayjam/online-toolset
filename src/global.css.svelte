<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer components {
    .btn-blue {
      @apply py-2 px-4 bg-blue-500 text-white  rounded-lg  hover:bg-blue-700  focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
    }
  }
</style>
