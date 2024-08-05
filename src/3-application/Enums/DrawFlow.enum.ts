export enum element {
	Board = 'parent-drawflow',
	Node = 'drawflow_content_node',
	Graph = 'main-path',
  Point = 'point',
  Delete = 'drawflow-delete',
  Output = 'output',
  Input = 'input',
}

export enum statusLife {
  Active = 'active',
  Hidden = 'hidden',
  Removed = 'removed',
}

export enum connection {
  Input = 'input',
  Output = 'output',
}