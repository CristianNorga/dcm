import { defineMongooseModel } from '#nuxt/mongoose';
import { Types } from 'mongoose';
import type { Resource,Service } from '../../application/types/resource/base';

export const ResourceSchema = defineMongooseModel<Resource | Service>('Resources', {
	id: {
		type: String,
		required: true,
		ref: '_id',
	},
	namespace: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	owner: {
		type: String,
		required: false,
	},
	inputs: {
		type: [String],
		required: false,
	},
	outputs: {
		type: [String],
		required: false,
	},
});