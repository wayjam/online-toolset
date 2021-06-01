const sveltePreprocess = require('svelte-preprocess');

const cssModules = require('svelte-preprocess-cssmodules');
const { asMarkupPreprocessor } = require('svelte-as-markup-preprocessor');



module.exports = { preprocess: [
    asMarkupPreprocessor([
        sveltePreprocess({ postcss: true }),
      ]),
      cssModules()
    

] };