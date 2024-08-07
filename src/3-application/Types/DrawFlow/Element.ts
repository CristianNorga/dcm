import type { statusLife, connection } from '../../Enums/DrawFlow.enum';
//general
export type ElementStates = {
	selected: number;
	removed: Array<number>;
	refKeys?: Array<RefKey>;
};

//graphs
export type Graph = {
	id: number;
	name: string;
	state: GraphStates;
	point: Array<PositionStates>;
	data: any;
};
export type GraphStates = {
	status: statusLife;
	pathToDraw: string;
	nodeIn: number;//service.type.name
	nodeOut: number;
	input: string;
	output: string;
};

export type RefKey = {
	path: string;
	key: number;
	type: connection;
};

//nodes
export type NodeStates = {
	status: statusLife;
	class: string;
	x: number;
	y: number;
	width: number;
	height: number;
};

export type Node = {
	masterId: string;
	id: number;
	name: string;
	state: NodeStates;
	inputs: { [key: string]: PositionStates };
	outputs: { [key: string]: PositionStates };
	data: any;
};

//board
export type Board = {
	selected: string;
	removed: Array<number>;
	items: Array<BoardData>;
};

export type BoardData = {
	name: string;
	version: string;
	data: {
		nodes: { [key: string]: Node };
		graphs: { [key: string]: Graph };
	};
};

//input
export type PositionStates = {
	offsetWidth: number;
	offsetHeight: number;
	pos_y: number;
	pos_x: number;
};
