import path from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src/1-presentation',
	serverDir: './src/2-infrastructure/Server',
	components: [
		{
			path: '~/Components',
		},
	],
	alias: {
		'@models': path.resolve(__dirname, './src/3-application/Models'),
		'@stores': path.resolve(__dirname, './src/3-application/Stores'),
		'@enums': path.resolve(__dirname, './src/3-application/Enums'),
		'@interfaces': path.resolve(__dirname, './src/3-application/Interfaces'),
		'@entities': path.resolve(__dirname, './src/3-application/Entities'),
	},
	modules: ['nuxt-mongoose', '@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt'],
	mongoose: {
		uri: 'mongodb+srv://admin:Z6aSZeHFTrhaAbE6@cluster.ctsee.mongodb.net/?retryWrites=true&w=majority&appName=cluster',
		//uri: 'process.env.MONGODB_URI',
		options: {},
		modelsDir: 'src/3-application/Models/Mongo',
		devtools: true,
	},
	pinia: {
		storesDirs: ['./src/3-application/Stores/**'],
	},
	devtools: { enabled: true },
});
