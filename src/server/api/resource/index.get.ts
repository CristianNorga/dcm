import { ResourceSchema } from '../../../application/models/mongo/resource.schema';

export default defineEventHandler(async (event) => {
	console.log('Resource GET');

	try {
		return await ResourceSchema.find();
	} catch (error) {
		console.error(error);
		return error;
	}
});
