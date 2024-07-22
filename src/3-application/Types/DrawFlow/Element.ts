import type { statusLife } from '../../Enums/DrawFlow.enum';
//general
export type ElementStates = {
	selected: number;
	removed: Array<number>;
	items: {
		[key: string]: GraphStates;
	};
};

//graphs
export type GraphStates = {
  pathToDraw: string;
  nodeIn: string,
  nodeOut: string,
  input: string,
  output: string,
};

//nodes
export type NodeStates = {
	name: string;
	status: statusLife;
	class: string;
	x: number;
	y: number;
	width: number;
	height: number;
};

export type Node = {
  id: string,
  name: string,
  state: NodeStates,
  data: any,
};
