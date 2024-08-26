import type {
	NodeStates,
	PositionStates,
	ConnectionBread,
	ConnectionPoint,
} from '../Types/DrawFlow/Element';
import { statusLife } from '../Enums/DrawFlow.enum';

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
	inputs: { [key: string]: ConnectionBread & ConnectionPoint } = {};
	outputs: { [key: string]: ConnectionBread & ConnectionPoint } = {};
	data: any;

	// Constructor
	constructor(
		masterId: string,
		id: number,
		type: string,
		data: any,
		inputs: { [key: string]: ConnectionBread & ConnectionPoint }
	) {
		this.masterId = masterId;
		this.id = id;
		this.type = type;
		this.data = data;
		this.inputs = inputs;
	}
}
