import type {
	NodeStates,
	ConnectionCrumb,
} from '../types/drawFlow/Element';
import { statusLife } from '../enums/DrawFlow.enum';

export class Node {
	// Properties
	masterId: string = '';
	id: number = 0;
	type: string = 'Back';
	state: NodeStates = {
		status: statusLife.Active,
		x: 100,
		y: 100,
		width: 100,
		height: 100,
	};
	inputs: { [key: string]: ConnectionCrumb } = {};
	outputs: { [key: string]: ConnectionCrumb } = {};
	data: any;

	// Constructor
	constructor(
		masterId: string,
		id: number,
		type: string,
		data: any,
		inputs: { [key: string]: ConnectionCrumb },
		outputs: { [key: string]: ConnectionCrumb }
	) {
		this.masterId = masterId;
		this.id = id;
		this.type = type;
		this.data = data;
		this.inputs = inputs;
		this.outputs = outputs;
	}
}
