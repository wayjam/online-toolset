<script>
  import TailwindCss from './global.css.svelte';
  import routes from './lib/routes';
  import Router from 'svelte-spa-router';
  import { setContext } from 'svelte';

  let subtitle = 'Home';

  setContext('root', {
    setSubTitle: (title) => {
      subtitle = title;
    },
  });
</script>

<TailwindCss />

<main class="main-h-screen sm:py-12">
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div class="flex flex-wrap md:mr-auto">
        <a href="#/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span class="ml-3 text-xl">ToolSet</span>
        </a>
        <div
          class="ml-4 mr-4 my-auto h-4 inner-block border-l  border-gray-400 align-middle items-center text-center"
        />
        <div class="flex title-font font-medium items-center text-xl">{subtitle}</div>
      </div>

      <a
        href="https://github.com/wayjam/online-toolset"
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      >
        GitHub
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </header>
  <section class="text-gray-600 body-font py-4">
    <Router {routes} />
  </section>
  <footer class="text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <p
        class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"
      >
        © 2021 ToolSet — The source code is licensed
        <a
          href="https://github.com/wayjam/online-toolset/blob/master/LICENSE"
          class="text-gray-600 ml-1">MIT</a
        >.
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start" />
    </div>
  </footer>
</main>
