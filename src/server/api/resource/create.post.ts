import { ResourceSchema } from '../../../application/models/mongo/resource.schema';

export default defineEventHandler(async (event) => {
  console.log('Resource POST');
	const body = await readBody(event);

	const resource = await ResourceSchema.findOne({ _id: body["id"] });
	if (!resource) {
		return await new ResourceSchema({
			...body,
		}).save();
	} else {
    return new Response('Resource already exists', { status: 400 });
  }
});
