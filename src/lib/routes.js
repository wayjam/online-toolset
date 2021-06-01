import { wrap } from 'svelte-spa-router/wrap'
import NotFound from './NotFound.svelte'
import Index from './Index.svelte'

const appRoutes = [
    {
        name: "JSON to Base64",
        description: "Helps to convert plain JSON to Base64 and helps to encode JSON with Base64.",
        path: "/json2base64",
        component: wrap({
            // Note that this is a function that returns the import
            asyncComponent: () => import('../subpages/JSON2Base64.svelte'),
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
        description: "Helps to marshal JSON to plain string and helps to unmarshal string to JSON object.",
        path: "/json2str",
        component: wrap({
            // Note that this is a function that returns the import
            asyncComponent: () => import('../subpages/JSON2Str.svelte'),
            // Show the loading component while the component is being downloaded
            // loadingComponent: Loading,
            // Pass values for the `params` prop of the loading component
            // loadingParams: {
            //     message: 'Loading the Name route…'
            // }
        }),
    },
    {
        name: "JSON to Go Struct",
        description: "Helps to converts JSON to Go Struct.",
        path: "/json2go",
        component: wrap({
            asyncComponent: () => import('../subpages/JSON2Go.svelte'),
        }),
    }
]


const routes = {
    // Exact path
    '/': Index,

    ...appRoutes.reduce((acc, curr) => {
        return {
            ...acc,
            [curr.path]: curr.component
        }
    }, {}),


    // Catch-all, must be last
    '*': NotFound,
}


export {
    routes as default,
    appRoutes
}