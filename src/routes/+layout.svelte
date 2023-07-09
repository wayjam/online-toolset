<script>
	import '$lib/global.css';
	import { setContext } from 'svelte';

	let pageTitle = 'Home';
	setContext('root', {
		setPageTitle: (title) => {
			pageTitle = title;
		}
	});
</script>

<main class="main-h-screen sm:py-12">
	<header class="text-gray-600 body-font">
		<div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center border-b">
			<div class="flex flex-wrap md:mr-auto">
				<a href="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<svg
						width="32px"
						height="32px"
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-red rounded-full"
					>
						<g transform="matrix(0.0625,0,0,0.0625,0,0)">
							<path
								d="M492.24,386.448C460.74,365.448 433.25,339.448 410.542,309.156C390.719,282.739 366.469,260.468 338.469,242.968L294.684,215.6L223.084,144L327.542,39.542C330.594,36.49 331.511,31.907 329.855,27.917C328.209,23.927 324.313,21.334 320.001,21.334L236.188,21.334C204.844,21.334 175.375,33.542 153.219,55.699L144,64.917L135.542,56.459C131.375,52.292 124.625,52.292 120.459,56.459L77.792,99.125C73.625,103.292 73.625,110.042 77.792,114.208L86.25,122.666L3.125,205.792C-1.042,209.959 -1.042,216.709 3.125,220.875L67.125,284.875C69.208,286.958 71.938,288 74.667,288C77.396,288 80.125,286.958 82.209,284.875L165.334,201.75L236.934,273.35L264.302,317.135C281.802,345.135 304.073,369.385 330.5,389.208C360.781,411.916 386.781,439.406 407.781,470.916C416.041,483.281 429.844,490.666 444.708,490.666C456.562,490.666 467.698,486.051 476.083,477.666L499,454.75C507.385,446.365 512,435.229 512,423.375C512,408.51 504.615,394.708 492.24,386.448ZM128,79.083L128.917,80L101.334,107.583L100.417,106.666L128,79.083ZM74.667,262.25L25.75,213.333L168.302,70.781C186.437,52.656 210.542,42.666 236.187,42.666L294.25,42.666L74.667,262.25ZM180.417,186.667L208,159.083L272.917,224L245.334,251.583L180.417,186.667ZM483.917,439.667L461,462.583C451.177,472.385 433.26,470.625 425.531,459.073C403.187,425.552 375.521,396.302 343.291,372.146C318.989,353.906 298.499,331.594 282.385,305.823L258.875,268.208L289.542,237.541L327.157,261.051C352.928,277.166 375.24,297.655 393.48,321.957C417.636,354.186 446.886,381.853 480.397,404.197C486.835,408.489 490.668,415.655 490.668,423.374C490.667,429.531 488.271,435.313 483.917,439.667Z"
							/>
						</g>
					</svg>
					<span class="ml-3 text-xl">ToolSet</span>
				</a>
				<div
					class="ml-4 mr-4 my-auto h-4 inner-block border-l border-gray-400 align-middle items-center text-center"
				/>
				<div class="flex title-font font-medium items-center text-xl cursor-default">
					{pageTitle}
				</div>
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
		<slot />
	</section>
	<footer class="text-gray-600 body-font footer">
		<div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
			<p
				class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"
			>
				© 2023 ToolSet — The source code is licensed
				<a
					href="https://github.com/wayjam/online-toolset/blob/master/LICENSE"
					class="text-gray-600 ml-1">MIT</a
				>.
			</p>
			<span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start" />
		</div>
	</footer>
</main>
