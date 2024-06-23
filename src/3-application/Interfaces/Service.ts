import { ObjectId } from 'mongodb';

export interface Service {
	_id: ObjectId;
	user: string;
	name: string;
	slug: string;
	description?: string;
	color?: string;
	body: string;
	hit: number;
	createdAt: string;
	updatedAt: string;
}
