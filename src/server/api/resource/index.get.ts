import { ResourceSchema } from '../../../application/models/mongo/resource.schema';

export default defineEventHandler(async (event) => {
	try {
		return [
			{
				id: '123',
				namespace: 'space1',
				name: 'service-a',
				type: 'service',
				owner: 'team1',
			},
			{
				id: '124',
				namespace: 'space1',
				name: 'service-b',
				type: 'service',
				owner: 'team1',
			},
			{
				id: '125',
				namespace: 'space1',
				name: 'service-c',
				type: 'service',
				owner: 'team2',
			},
		];
		// await ResourceSchema.find();
	} catch (error) {
		console.error(error);
		return error;
	}
});
