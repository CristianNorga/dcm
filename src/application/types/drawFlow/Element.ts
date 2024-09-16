import type { statusLife, connection } from '../../enums/DrawFlow.enum';
//general
export type ElementStates = {
	removed: Array<number>;
	refKeys?: Array<RefKey>;
};

//graphs
export type Graph = {
	id: string;
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
	x: number;
	y: number;
	width: number;
	height: number;
};

export type Node = {
	masterId: string;
	id: number;
	type: string;
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

//input - connection
export type PositionStates = {
	linked: string;
	offsetWidth: number;
	offsetHeight: number;
	pos_y?: number;
	pos_x?: number;
	assignment?: number;
};

export type ConnectionCrumb = {
	open?: boolean;
	type: connection;
	show: boolean;
	state?: PositionStates;
};
