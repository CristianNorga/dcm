import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-08-01',
	srcDir: './src',
	components: [
		{
			path: './presentation/components',
		},
	],
	dir: {
		layouts: './presentation/layouts',
		pages: './presentation/pages',
	},
	// serverHandlers: [
	// 	{
	// 		route: '/api/resources',
	// 		handler: '~/2-server/server/api/resources/index.get.ts',
	// 	},
	// ],
	alias: {
		'@models': path.resolve(__dirname, './src/application/models'),
		'@stores': path.resolve(__dirname, './src/application/stores'),
		'@enums': path.resolve(__dirname, './src/application/enums'),
		'@interfaces': path.resolve(__dirname, './src/application/interfaces'),
		'@types': path.resolve(__dirname, './src/application/types'),
		'@entities': path.resolve(__dirname, './src/application/entities'),
		'@components': path.resolve(__dirname, './src/presentation/components'),
	},
	debug: true,
	modules: [
		'@vueuse/nuxt',
		'@nuxt/ui',
		'@pinia/nuxt',
		'@nuxt/icon',
		'nuxt-mongoose',
	],
	mongoose: {
		uri: process.env.MONGODB_URI,
		options: {},
		modelsDir: './src/application/models/mongo',
		devtools: true,
	},
	pinia: {
		storesDirs: ['./src/application/stores/**'],
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