const modules = import.meta.glob('../routes/**/*.svelte'); // Include subfolder
const pageRegex = /\/\+page\.svelte$/;
const { url } = import.meta;
const directory = url
	.replace(/(.*?)\/src\/routes\//, '/')
	.replace(/(.*?)\/immutable\/pages\//, '/')
	.replace(/(.*?)\/var\/task\//, '/') // Vercel
	.replace(/\/([^/])*.svelte.*/, '/');

function getPaths() {
	const paths = Object.keys(modules)
		// Convert relative path to absolute path
		.map((path) => path.replace(/^(.\/)/, directory))
		// Filter paths with dynamic parameters (e.g. /blog/[slug].svelte)
		.filter((path) => !/\[.*\]/.test(path))
		// Filter paths that end with `/+page.svelte`
		.filter((path) => pageRegex.test(path))
		// Remove the trailing `/+page.svelte` string
		.map((path) => path.replace(pageRegex, ''))
		// Set empty path string to '/' ('./index.svelte' is converted to '')
		.map((path) => path || '/')
		.sort();
	return paths;
}

const devGroup = [
	{
		name: 'JSON to Base64',
		description: 'Helps to convert plain JSON to Base64 and helps to encode JSON with Base64.',
		path: '/json2base64'
	},
	{
		name: 'JSON to String',
		description:
			'Helps to marshal JSON to plain string and helps to unmarshal string to JSON object.',
		path: '/json2str'
	},
	{
		name: 'JSON to Go Struct',
		description: 'Helps to converts JSON to Go Struct.',
		path: '/json2go'
	},
	{
		name: 'YAML to JSON',
		description: 'Helps to converts YAML to JSON.',
		path: '/yaml2json'
	},
	{
		name: 'YAML to String',
		description: 'Helps to converts JSON to String(Base64).',
		path: '/yaml2str'
	},
	{
		name: 'JSON to JSON Schema',
		description: 'Convert JavaScript Object or Array to JSON Schema',
		path: '/json2jsonschema'
	},
	{
		name: 'JSON to XML',
		description: 'Convert JavaScript Object or Array to XML',
		path: '/json2xml'
	},
	{
		name: 'Crontab',
		description: 'Quick and simple editor for cron schedule expressions		',
		path: '/crontab'
	},
	{
		name: 'Timestamp',
		description: 'Simple date and timestamp tools',
		path: '/timestamp'
	}
];

const editGroup = [
	{
		name: 'Simple Editor',
		description: 'Demo monaco editor',
		path: '/monaco'
	},
	{
		name: 'Duplicate Line',
		description: 'Remove duplicate lines',
		path: '/duplicate-line'
	}
];

const externalGroup = [
	{
		name: 'Regex101',
		description: 'regexp tools',
		path: 'https://regex101.com/',
		external: true
	},
	{
		name: 'JWT',
		description: 'JSON Web Tokens',
		path: 'https://jwt.io/',
		external: true
	}
];

const appRoutes = [
	{
		name: 'develop',
		routes: devGroup
	},
	{
		name: 'edit',
		routes: editGroup
	},
	{
		name: 'external',
		routes: externalGroup
	}
];

export { appRoutes, getPaths };
