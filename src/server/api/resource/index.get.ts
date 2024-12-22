import { ResourceSchema } from '../../../application/models/mongo/resource.schema';

export default defineEventHandler(async (event) => {
	try {
		return [
			{
				id: '123',
				namespace: 'space1',
				name: 'service-a',
				type: 'service',
				infrastructure: 'cloud',
				owner: ['group1', 'team1', 'leader1', 'groupleader1'],
				tags: ['tag1', 'tag2', 'tag3'],
				dynamic: {
					coverage: '90%',
				},
			},
			{
				id: '124',
				namespace: 'space1',
				name: 'service-b',
				type: 'service',
				infrastructure: 'cloud',
				owner: ['group1', 'team1', 'leader1', 'groupleader1'],
				tags: ['tag1', 'tag2', 'tag3'],
				dynamic: {
					coverage: '90%',
				},
			},
			{
				id: '125',
				namespace: 'space1',
				name: 'service-c',
				type: 'service',
				infrastructure: 'cloud',
				owner: ['group1', 'team1', 'leader1', 'groupleader1'],
				tags: ['tag1', 'tag2', 'tag3'],
				dynamic: {
					coverage: '90%',
				},
			},
		];
		// await ResourceSchema.find();
	} catch (error) {
		console.error(error);
		return error;
	}
});
