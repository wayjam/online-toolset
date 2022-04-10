import { wrap } from "svelte-spa-router/wrap";
import NotFound from "./NotFound.svelte";
import Index from "./Index.svelte";

const appRoutes = [
  {
    name: "JSON to Base64",
    description:
      "Helps to convert plain JSON to Base64 and helps to encode JSON with Base64.",
    path: "/json2base64",
    component: wrap({
      // Note that this is a function that returns the import
      asyncComponent: () => import("../subpages/JSON2Base64.svelte"),
      // Show the loading component while the component is being downloaded
      // loadingComponent: Loading,
      // Pass values for the `params` prop of the loading component
      // loadingParams: {
      //     message: 'Loading the Name route…'
      // }
    }),
  },
  {
    name: "JSON to String",
    description:
      "Helps to marshal JSON to plain string and helps to unmarshal string to JSON object.",
    path: "/json2str",
    component: wrap({
      asyncComponent: () => import("../subpages/JSON2Str.svelte"),
    }),
  },
  {
    name: "JSON to Go Struct",
    description: "Helps to converts JSON to Go Struct.",
    path: "/json2go",
    component: wrap({
      asyncComponent: () => import("../subpages/JSON2Go.svelte"),
    }),
  },
  {
    name: "YAML to JSON",
    description: "Helps to converts YAML to JSON.",
    path: "/yaml2json",
    component: wrap({
      asyncComponent: () => import("../subpages/YAML2JSON.svelte"),
    }),
  },
  {
    name: "YAML to String",
    description: "Helps to converts JSON to String(Base64).",
    path: "/yaml2str",
    component: wrap({
      asyncComponent: () => import("../subpages/YAML2Str.svelte"),
    }),
  },
  {
    name: "JSON to JSON Schema",
    description: "Convert JavaScript Object or Array to JSON Schema",
    path: "/json2jsonschema",
    component: wrap({
      asyncComponent: () => import("../subpages/JSON2JSONSchema.svelte"),
    }),
  },
  {
    name: "Regex101",
    description: "regexp tools",
    path: "https://regex101.com/",
    external: true,
  },
  {
    name: "JSON to XML",
    description: "Convert JavaScript Object or Array to XML",
    path: "/json2xml",
    component: wrap({
      asyncComponent: () => import("../subpages/JSON2XML.svelte"),
    }),
  },
];

const routes = {
  // Exact path
  "/": Index,

  ...appRoutes
    .filter((r) => !r.external)
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.path]: curr.component,
      };
    }, {}),

  // Catch-all, must be last
  "*": NotFound,
};

export { routes as default, appRoutes };
