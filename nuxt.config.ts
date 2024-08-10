import path from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src/1-presentation',
	serverDir: './src/2-infrastructure/Server',
	components: [
		{
			path: './Components',
		},
	],
	dir: {
		layouts: './Layouts',
		pages: './Pages',
	},
	alias: {
		'@models': path.resolve(__dirname, './src/3-application/Models'),
		'@stores': path.resolve(__dirname, './src/3-application/Stores'),
		'@enums': path.resolve(__dirname, './src/3-application/Enums'),
		'@interfaces': path.resolve(__dirname, './src/3-application/Interfaces'),
		'@types': path.resolve(__dirname, './src/3-application/Types'),
		'@entities': path.resolve(__dirname, './src/3-application/Entities'),
		'@components': path.resolve(__dirname, './src/1-presentation/Components'),
	},
	modules: [// 'nuxt-mongoose',
    '@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt', "@nuxt/icon"],
	// mongoose: {
	// 	uri: 'process.env.MONGODB_URI',
	// 	options: {},
	// 	modelsDir: 'src/3-application/Models/Mongo',
	// 	devtools: true,
	// },
	pinia: {
		storesDirs: ['./src/3-application/Stores/**'],
	},
	tailwindcss: {
		cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'last' }],
		configPath: 'tailwind.config',
		exposeConfig: {
			level: 2,
		},
		config: {},
		viewer: true,
	},
	devtools: { enabled: true },
});