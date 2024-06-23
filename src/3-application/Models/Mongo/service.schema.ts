import { defineMongooseModel } from '#nuxt/mongoose';
// import { Types } from 'mongoose';
import type { Service } from '@interfaces/Service.ts';

export const PostSchema = defineMongooseModel<Service>({
	name: 'Post',
	schema: {
		user: {
			type: 'string',
			required: true,
			ref: 'User',
		},
		name: {
			type: 'string',
			required: true,
		},
		slug: {
			type: 'string',
			required: true,
			unique: true,
		},
		description: {
			type: 'string',
		},
		color: {
			type: 'string',
			default: 'green',
		},
		body: {
			type: 'string',
		},
		hit: {
			type: 'Number',
			default: 0,
		},
	},
	options: {
		timestamps: true,
	},
});
