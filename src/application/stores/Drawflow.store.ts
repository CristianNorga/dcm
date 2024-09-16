import { defineStore } from 'pinia';
import type { Events } from '../types/drawFlow/Events';
import type {
	ElementStates,
	Board,
	Graph,
	ConnectionCrumb,
} from '../types/drawFlow/Element';
import { connection, element, statusLife } from '~~/src/application/enums/DrawFlow.enum';
import { Node } from '~~/src/application/entities/Node';
import Generator from '../commonn/helpers/generator'

export const useDrawFlowStore = defineStore('utilsStore', {
	state: () => ({
		//custom
		parent: {} as HTMLElement,
		boards: {
			x: 0,
			y: 0,
			scale: 1,
			selected: 'Home',
			removed: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			items: [
				{
					name: 'Home',
					version: 'aztmz-satpb',
					data: {
						nodes: {},
						graphs: {},
					},
				},
			],
		} as Board & { x: number; y: number; scale: number },
		nodes: {
			selected: 0,
			removed: [],
			items: {},
		} as ElementStates & { items: { [key: number]: Node }; selected: number },
		graphs: {
			selected: '',
			removed: [],
			items: {},
		} as ElementStates & { items: { [key: string]: Graph }; selected: string },
		connections: {
			startIn: connection.Inputs,
			inputs: '',
			outputs: '',
		} as {
			inputs: string;
			outputs: string;
			startIn: connection.Inputs | connection.Outputs;
			endIn: connection.Inputs | connection.Outputs;
		},
		selectedElement: {
			type: '' as element,
			id: '' as string,
		},
		//old
		events: {
			example: { listeners: [] },
		} as Events,
		// container: container, drawFlowParent
		precanvas: null,
		drag: false,
		reroute: false,
		reroute_fix_curvature: false,
		curvature: 0.5,
		reroute_width: 6,
		drag_point: false,
		editor_selected: false,
		connection: false,
		canvas_x: 0,
		canvas_y: 0,
		pos_x: 0,
		pos_x_start: 0,
		pos_y: 0,
		pos_y_start: 0,
		mouse_x: 0,
		mouse_y: 0,
		line_path: 5,
		first_click: {} as EventTarget,
		force_first_input: false,
		draggable_inputs: true,
		// parent: parent, drawFlowParent
		noderegister: {},
		// render: render, no necesary
		configurableOptions: {
			module: 'Home',
			editor_mode: 'edit',
			zoom: 1,
			zoom_max: 1.6,
			zoom_min: 0.5,
			zoom_value: 0.1,
			zoom_last_value: 1,
		},
		mobile: {
			evCache: new Array(),
			prevDiff: -1,
		},
	}),
	actions: {
		//custom
		loadDataExample() {
			if (this.nodes.items[1] !== undefined) return;
			let nodeMain = new Node(
				'namespace1.Servicio1',
				1,
				'Back',
				{
					name: 'Servicio1',
					namespace: 'namespace1',
					technology: 'csharp',
					inputs: {
						//mejor tener un array, que liste todos los inputs, solo cuando se inicializa el nodo, se mapea en los objetos de positionState de inputs y outputs respectivamente.
						http: {
							controllerName: {
								action: {
									description: 'action',
								},
							},
						},
					},
					outputs: {
						http: {
							controllerName: {
								action: {
									description: 'action',
								},
							},
						},
					},
				},
				{
					http: {
						type: connection.Crumb,
						open: true,
						show: true,
					},
					'http.controllerName': {
						type: connection.Crumb,
						open: true,
						show: true,
					},
					'http.controllerName.action': {
						type: connection.Point,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 1,
						},
						show: true,
					},
				},
				{
					http: {
						type: connection.Crumb,
						open: true,
						show: true,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 4,
						},
					},
					'http.controllerName': {
						type: connection.Crumb,
						open: true,
						show: true,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 5,
						},
					},
					'http.controllerName.action': {
						type: connection.Point,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 6,
						},
						show: true,
					},
				}
			);

			this.nodes.items[1] = nodeMain;
			this.nodes.items[2] = new Node(
				'namespace1.Servicio2',
				2,
				'Back',
				{
					name: 'Servicio2',
					namespace: 'namespace2',
					technology: 'csharp',
					inputs: {
						//mejor tener un array, que liste todos los inputs, solo cuando se inicializa el nodo, se mapea en los objetos de positionState de inputs y outputs respectivamente.
						http: {
							controllerName: {
								action: {
									description: 'action',
								},
							},
						},
					},
				},
				{
					http: {
						type: connection.Crumb,
						open: true,
						show: true,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 1,
						},
					},
					'http.controllerName': {
						type: connection.Crumb,
						open: true,
						show: true,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 2,
						},
					},
					'http.controllerName.action': {
						type: connection.Point,
						state: {
							linked: '',
							offsetWidth: 0,
							offsetHeight: 0,
							assignment: 3,
						},
						show: true,
					},
				},
				{}
			);

			// this.graphs.items[
			// 	'namespace1.Servicio1.http.controllerName.action'
			// ] = {
			// 	id: 'namespace1.Servicio1.http.controllerName.action',
			// 	name: 'Connection',
			// 	state: {
			// 		status: statusLife.Active,
			// 		pathToDraw:
			// 			' M -58.65625 461 C 363.34375 461 363.34375 440 785.34375  440',
			// 		nodeIn: 1,
			// 		nodeOut: 2,
			// 		input: 'http.controllerName.action',
			// 		output: 'http.controllerName.action',
			// 	},
			// 	point: [],
			// 	data: {},
			// };
		},
		setDrawFlowParent(parent: HTMLElement) {
			this.parent = parent;
		},
		startBase(
			context: MouseEvent & TouchEvent,
			clickedElement: element,
			id: string = ''
		): boolean {
			this.dispatch('click', clickedElement);

			if (
				this.configurableOptions.editor_mode === 'fixed' &&
				clickedElement !== element.Board
			) {
				return false;
			}

			this.first_click = context.target as EventTarget;

			this.selectedElement = {
				type: clickedElement,
				id: id,
			};

			return true;
		},
		startConnection(
			context: MouseEvent & TouchEvent,
			clickedElement: element.Input | element.Output,
			nodeId: number,
			outPut: string
		) {
			if (!this.startBase(context, clickedElement, nodeId.toString()))
				return false;
			this.connection = true;
			this.connections.startIn = (clickedElement + 's') as
				| connection.Inputs
				| connection.Outputs;
			this.connections[this.connections.startIn] = outPut;

			if (this.nodes.selected > 0) {
				this.nodes.selected = 0;
				this.dispatch('nodeUnselected', true);
			}
			if (this.graphs.selected != '') {
				this.graphs.selected = '';
				this.removeReouteConnectionSelected();
			}
			this.drawConnection(nodeId, outPut);
		},
		endConnection(
			context: MouseEvent & TouchEvent,
			clickedElement: connection.Inputs | connection.Outputs = connection.Inputs,
			nodeId: number = 0,
			outPut: string = ''
		) {
			if (this.connection === false) return;
			console.log(
				'endConnection',
				this.graphs.items[
					this.selectedElement.id +'-'+ this.nodes.items[nodeId]?.masterId + '.' + outPut
				] === undefined
			);
			if (
				this.connections[this.connections.startIn] &&
				outPut &&
				this.graphs.items[
					this.selectedElement.id +
						'-' +
						this.nodes.items[nodeId].masterId +
						'.' +
						outPut
				] === undefined
			) {
				let masterId =
					this.selectedElement.id +
					'-' +
					this.nodes.items[nodeId].masterId +
					'.' +
					outPut;
				// Conection no exist save connection
				this.graphs.items[masterId] = this.graphs.items[this.selectedElement.id];
				this.graphs.items[masterId].id = masterId;
				delete this.graphs.items[this.selectedElement.id];
				// var id_input = input_id.slice(5);
				// var id_output = output_id.slice(5);
				// this.drawflow.drawflow[this.module].data[id_output].outputs[
				// 	output_class
				// ].connections.push({ node: id_input, output: input_class });
				// this.drawflow.drawflow[this.module].data[id_input].inputs[
				// 	input_class
				// ].connections.push({ node: id_output, input: output_class });
				// this.updateConnectionNodes('node-' + id_output);
				// this.updateConnectionNodes('node-' + id_input);
				// 🚩 como logramo obtener el id (number) del primer node?
				// this.dispatch('connectionCreated', {
				// 	output_id: clickedElement === connection.Outputs ? nodeId : 0,
				// 	input_id: clickedElement === connection.Outputs ? nodeId : 0,
				// 	output_class: this.connections[connection.Outputs],
				// 	input_class: this.connections[connection.Inputs],
				// });
			} else {
				// Remove Connection;
				this.dispatch('connectionCancel', true);
				delete this.graphs.items[this.selectedElement.id];
			}

			this.connections[connection.Inputs] = '';
			this.connections[connection.Outputs] = '';
			this.connection = false;
		},
		switchCrumbConnection(
			nodeId: number,
			connectionId: string,
			connectionType: connection.Inputs | connection.Outputs
		) {
			if (
				this.nodes.items[nodeId][connectionType][connectionId].type !==
				connection.Crumb
			)
				return;

			this.nodes.items[nodeId][connectionType][connectionId].open =
				!this.nodes.items[nodeId][connectionType][connectionId].open;

			let Coincidences = connectionId.match(/\./g)?.length || 0;

			if (this.nodes.items[nodeId][connectionType][connectionId].open) {
				Object.entries(this.nodes.items[nodeId][connectionType]).forEach(
					([key, value]) => {
						if (
							key.includes(connectionId) &&
							(key.match(/\./g)?.length || 0) === Coincidences + 1
						) {
							value.show = true;
						}
					}
				);
			} else {
				Object.entries(this.nodes.items[nodeId][connectionType]).forEach(
					([key, value]) => {
						if (
							key.includes(connectionId) &&
							(key.match(/\./g)?.length || 0) > Coincidences
						) {
							value.show = false;
							value.open = false;
						}
					}
				);
			}
		},
		deleteElement(
			context: MouseEvent & TouchEvent,
			clickedElement: element,
			id: string = ''
		) {
			if (!this.startBase(context, clickedElement, id)) return false;

			if (clickedElement === element.Node) {
				this.removeNodeId(parseInt(id));
			} else if (clickedElement === element.Graph) {
				this.removeConnection();
			}

			if (this.nodes.selected > 0) {
				this.nodes.selected = 0;
				this.dispatch('nodeUnselected', true);
			}
			if (this.graphs.selected != '') {
				this.removeReouteConnectionSelected();
				this.graphs.selected = '';
			}
		},
		// old
		dragEnd(context: MouseEvent & TouchEvent) {
			let e_pos_x, e_pos_y;
			if (context.type === 'touchend') {
				e_pos_x = this.mouse_x;
				e_pos_y = this.mouse_y;
				// let ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
			} else {
				e_pos_x = context.clientX;
				e_pos_y = context.clientY;
				// let ele_last = context.target;
			}

			// if (this.drag) {
			// 	if (this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
			// 		this.dispatch('nodeMoved', this.ele_selected.id.slice(5));
			// 	}
			// }

			// if (this.drag_point) {
			// 	this.ele_selected.classList.remove('selected');
			// 	if (this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
			// 		this.dispatch(
			// 			'rerouteMoved',
			// 			this.ele_selected.parentElement.classList[2].slice(14)
			// 		);
			// 	}
			// }

			if (this.editor_selected) {
				this.canvas_x = this.canvas_x + -(this.pos_x - e_pos_x);
				this.canvas_y = this.canvas_y + -(this.pos_y - e_pos_y);
				this.editor_selected = false;
			}

			this.drag = false;
			this.drag_point = false;
			this.nodes.selected = 0;
			// this.ele_selected = null;
			this.editor_selected = false;

			// this.dispatch('mouseUp', e);
		},
		position(context: MouseEvent & TouchEvent) {
			let e_pos_x, e_pos_y, x, y;

			if (context.type === 'touchmove') {
				e_pos_x = context.touches[0].clientX;
				e_pos_y = context.touches[0].clientY;
			} else {
				e_pos_x = context.clientX;
				e_pos_y = context.clientY;
			}

			if (this.connection) {
				this.updateConnection(e_pos_x, e_pos_y);
			}
			if (this.editor_selected) {
				this.dispatch('translate', { x: x, y: y });
				this.boards.x = this.canvas_x + -(this.pos_x - e_pos_x);
				this.boards.y = this.canvas_y + -(this.pos_y - e_pos_y);
				this.boards.scale = this.configurableOptions.zoom;
			}
			if (this.drag) {
				context.preventDefault();
				x =
					((this.pos_x - e_pos_x) * this.parent.clientWidth) /
					(this.parent.clientWidth * this.configurableOptions.zoom);
				y =
					((this.pos_y - e_pos_y) * this.parent.clientHeight) /
					(this.parent.clientHeight * this.configurableOptions.zoom);
				this.pos_x = e_pos_x;
				this.pos_y = e_pos_y;

				this.nodes.items[this.nodes.selected].state.x =
					this.nodes.items[this.nodes.selected].state.x - x;
				this.nodes.items[this.nodes.selected].state.y =
					this.nodes.items[this.nodes.selected].state.y - y;

				this.updateConnectionNodes(this.nodes.selected);
			}

			if (this.drag_point) {
				this.pos_x = e_pos_x;
				this.pos_y = e_pos_y;

				let pos_x =
					this.pos_x *
						(this.parent.clientWidth /
							(this.parent.clientWidth * this.configurableOptions.zoom)) -
					this.parent.getBoundingClientRect().x *
						(this.parent.clientWidth /
							(this.parent.clientWidth * this.configurableOptions.zoom));
				let pos_y =
					this.pos_y *
						(this.parent.clientHeight /
							(this.parent.clientHeight * this.configurableOptions.zoom)) -
					this.parent.getBoundingClientRect().y *
						(this.parent.clientHeight /
							(this.parent.clientHeight * this.configurableOptions.zoom));

				this.graphs.items[this.graphs.selected].point[
					parseInt(this.selectedElement.id)
				].pos_x = pos_x;
				this.graphs.items[this.graphs.selected].point[
					parseInt(this.selectedElement.id)
				].pos_y = pos_y;

				this.updateConnectionNodes(this.nodes.selected);
			}

			if (context.type === 'touchmove') {
				this.mouse_x = e_pos_x;
				this.mouse_y = e_pos_y;
			}
			this.dispatch('mouseMove', { x: e_pos_x, y: e_pos_y });
		},
		click(context: MouseEvent & TouchEvent, clickedElement: element, id: string) {
			if (!this.startBase(context, clickedElement)) return false;

			switch (clickedElement) {
				case element.Node:
					if (this.nodes.selected != parseInt(id)) {
						this.dispatch('nodeUnselected', true);
					} else {
						this.dispatch('nodeSelected', this.nodes.selected);
					}
					this.graphs.selected = '';
					this.removeReouteConnectionSelected();

					this.nodes.selected = parseInt(id);
					if (!this.draggable_inputs) {
						if (
							(context.target as HTMLAreaElement).tagName !== 'INPUT' &&
							(context.target as HTMLAreaElement).tagName !== 'TEXTAREA' &&
							(context.target as HTMLAreaElement).tagName !== 'SELECT' &&
							(context.target as HTMLAreaElement).hasAttribute('contenteditable') !==
								true
						) {
							this.drag = true;
						}
					} else if ((context.target as HTMLAreaElement).tagName !== 'SELECT') {
						this.drag = true;
					}
					break;
				case element.Board:
					if (this.nodes.selected > 0) {
						this.nodes.selected = 0;
						this.dispatch('nodeUnselected', true);
					}
					if (this.graphs.selected != '') {
						this.removeReouteConnectionSelected();
						this.graphs.selected = '';
					}
					this.editor_selected = true;
					break;
				case element.Graph:
					if (this.nodes.selected > 0) {
						this.nodes.selected = 0;
						this.dispatch('nodeUnselected', true);
					}
					if (this.graphs.selected != '') {
						this.removeReouteConnectionSelected();
						this.graphs.selected = '';
					}
					this.graphs.selected = this.selectedElement.id;

					if (this.graphs.items[this.graphs.selected] !== undefined) {
						this.dispatch('connectionSelected', {
							output_id: this.graphs.items[this.graphs.selected].state.nodeOut,
							input_id: this.graphs.items[this.graphs.selected].state.nodeIn,
							output_class: this.graphs.items[this.graphs.selected].state.output,
							input_class: this.graphs.items[this.graphs.selected].state.input,
						});
					}
					break;
				case element.Point:
					this.drag_point = true;
					break;
				default:
			}
			if (context.type === 'touchstart') {
				this.pos_x = context.touches[0].clientX;
				this.pos_x_start = context.touches[0].clientX;
				this.pos_y = context.touches[0].clientY;
				this.pos_y_start = context.touches[0].clientY;
				this.mouse_x = context.touches[0].clientX;
				this.mouse_y = context.touches[0].clientY;
			} else {
				this.pos_x = context.clientX;
				this.pos_x_start = context.clientX;
				this.pos_y = context.clientY;
				this.pos_y_start = context.clientY;
			}
			// 'input', 'output', 'main-path']
			if (
				this.selectedElement.type == element.Graph ||
				this.selectedElement.type == element.Output ||
				this.selectedElement.type == element.Input
			) {
				context.preventDefault();
			}
			this.dispatch('clickEnd', context);
		},
		contextmenu(context: any) {
			console.log('contextmenu', context);
		},
		key(context: any) {
			console.log('key', context);
		},
		input(context: any) {
			console.log('input', context);
		},
		dblclick(context: any) {
			console.log('dblclick', context);
		},
		// Draw
		drawConnection(nodeId: number, idOutPut: string) {
			let key = `${this.nodes.items[nodeId].masterId}.${idOutPut}`;
			this.graphs.items[key] = {
				id: key,
				name: 'Connection',
				state: {
					status: statusLife.Active,
					pathToDraw: '',
					nodeIn: 0,
					nodeOut: nodeId,
					input: '',
					output: idOutPut,
				},
				data: {},
			} as Graph;
			this.nodes.selected = nodeId;
			this.graphs.selected = key;
			this.selectedElement.id = key; //sobra?
			this.selectedElement.type = element.Graph;
			this.dispatch('connectionStart', {
				output_id: nodeId,
				output_class: idOutPut,
			});
		},
		addConnection(
			id_output: number,
			id_input: number,
			output_class: string,
			input_class: string
		) {
			let nodeInput = this.nodes.items[id_input];
			let nodeOutput = this.nodes.items[id_output];

			let keyGraph = `${nodeInput.masterId}.${input_class}-${nodeOutput.masterId}.${output_class}`;

			// Check connection exist
			if (this.graphs.items[keyGraph] === undefined) {
				//Draw connection
				this.graphs.items[keyGraph] = {
					id: keyGraph,
					name: 'Connection',
					state: {
						status: statusLife.Active,
						pathToDraw: '',
						nodeIn: id_input,
						nodeOut: id_output,
						input: input_class,
						output: output_class,
					},
					data: {},
				} as Graph;
				this.updateConnectionNodes(nodeOutput.id);
				this.updateConnectionNodes(nodeInput.id);
			}

			this.dispatch('connectionCreated', {
				output_id: id_output,
				input_id: id_input,
				output_class: output_class,
				input_class: input_class,
			});
		},
		updateConnection(eX: number, eY: number) {
			const node = this.nodes.items[this.nodes.selected];
			const nodeConnection =
				node[this.connections.startIn][this.connections[this.connections.startIn]];

			let parentWitdhZoom =
				this.parent.clientWidth /
				(this.parent.clientWidth * this.configurableOptions.zoom);
			parentWitdhZoom = parentWitdhZoom || 0;
			let parentHeightZoom =
				this.parent.clientHeight /
				(this.parent.clientHeight * this.configurableOptions.zoom);
			parentHeightZoom = parentHeightZoom || 0;

			let line_x = node.state.x + 200;

			let heightNode = 168;
			let heightConnection = 45;

			let line_y =
				node.state.y +
				heightNode +
				nodeConnection.state!.assignment! * heightConnection -
				heightConnection / 2;

			let x =
				eX *
					(this.parent.clientWidth /
						(this.parent.clientWidth * this.configurableOptions.zoom)) -
				this.parent.getBoundingClientRect().x *
					(this.parent.clientWidth /
						(this.parent.clientWidth * this.configurableOptions.zoom)) -
				this.boards.x;
			let y =
				eY *
					(this.parent.clientHeight /
						(this.parent.clientHeight * this.configurableOptions.zoom)) -
				this.parent.getBoundingClientRect().y *
					(this.parent.clientHeight /
						(this.parent.clientHeight * this.configurableOptions.zoom)) -
				this.boards.y;

			let lineCurve = this.createCurvature(line_x, line_y, x, y, 'openclose');
			this.graphs.items[this.graphs.selected].state.pathToDraw = lineCurve;
		},
		updateConnectionNodes(id: number) {
			const precanvas = this.parent;
			const zoom = this.configurableOptions.zoom;
			let parentWitdhZoom =
				this.parent.clientWidth / (this.parent.clientWidth * zoom);
			parentWitdhZoom = parentWitdhZoom || 0;
			let parentHeightZoom =
				this.parent.clientHeight / (this.parent.clientHeight * zoom);
			parentHeightZoom = parentHeightZoom || 0;

			const elemsOut = Object.keys(this.graphs.items).filter(
				(key) => this.graphs.items[key].state.nodeOut === id
			);

			let line_x,
				line_y,
				eX,
				eY = 0;
			elemsOut.forEach((key) => {
				if (this.graphs.items[key].point.length === 0) {
					let nodeRelationId = this.graphs.items[key].state.nodeIn;

					let inputRelation =
						this.nodes.items[nodeRelationId].inputs[
							this.graphs.items[key].state.output
						];

					// eX = inputRelation.state.offsetWidth / 2 + inputRelation.state.pos_x - precanvas.getBoundingClientRect().x * parentWitdhZoom;

					// eY = inputRelation.state.offsetHeight / 2 + inputRelation.state.pos_y - precanvas.getBoundingClientRect().y * parentHeightZoom;

					let outputRelation =
						this.nodes.items[id].outputs[this.graphs.items[key].state.input];

					// line_x = outputRelation.state.offsetWidth / 2 + outputRelation.state.pos_x - precanvas.getBoundingClientRect().x * parentWitdhZoom;

					// line_y = outputRelation.state.offsetHeight / 2 + outputRelation.state.pos_y - precanvas.getBoundingClientRect().y * parentHeightZoom;

					// const lineCurve = this.createCurvature(
					// 	line_x,
					// 	line_y,
					// 	eX,
					// 	eY,
					// 	'openclose'
					// );

					// this.graphs.items[key].state.pathToDraw = lineCurve;
				} else {
					//points disabled temporaly
				}
			});
		},
		createCurvature(
			start_x: number,
			start_y: number,
			end_x: number,
			end_y: number,
			type: string
		) {
			let hx1,
				hx2 = 0;
			//type openclose open close other
			switch (type) {
				case 'open':
					if (start_x >= end_x) {
						hx1 = start_x + Math.abs(end_x - start_x) * this.curvature;
						hx2 = end_x - Math.abs(end_x - start_x) * (this.curvature * -1);
					} else {
						hx1 = start_x + Math.abs(end_x - start_x) * this.curvature;
						hx2 = end_x - Math.abs(end_x - start_x) * this.curvature;
					}
					break;
				case 'close':
					if (start_x >= end_x) {
						hx1 = start_x + Math.abs(end_x - start_x) * (this.curvature * -1);
						hx2 = end_x - Math.abs(end_x - start_x) * this.curvature;
					} else {
						hx1 = start_x + Math.abs(end_x - start_x) * this.curvature;
						hx2 = end_x - Math.abs(end_x - start_x) * this.curvature;
					}
					break;
				case 'other':
					if (start_x >= end_x) {
						hx1 = start_x + Math.abs(end_x - start_x) * (this.curvature * -1);
						hx2 = end_x - Math.abs(end_x - start_x) * (this.curvature * -1);
					} else {
						hx1 = start_x + Math.abs(end_x - start_x) * this.curvature;
						hx2 = end_x - Math.abs(end_x - start_x) * this.curvature;
					}
					break;
				default:
					hx1 = start_x + Math.abs(end_x - start_x) * this.curvature;
					hx2 = end_x - Math.abs(end_x - start_x) * this.curvature;
			}

			return (
				' M ' +
				start_x +
				' ' +
				start_y +
				' C ' +
				hx1 +
				' ' +
				start_y +
				' ' +
				hx2 +
				' ' +
				end_y +
				' ' +
				end_x +
				'  ' +
				end_y
			);
		},
		// Events
		dispatch(event: string, details: any) {
			// Check if this event not exists
			if (this.events[event] === undefined) {
				return false;
			}
			this.events[event].listeners.forEach((listener) => {
				listener(details);
			});
		},
		// Nodes
		addNode(node: Node) {
			// Check if node exist
			let exist =
				Object.values(this.nodes.items).find(
					(val) => val.masterId === node.masterId
				) !== undefined;

			if (exist) {
				console.warn('Node already exist');
				return false;
			}

			node.id = Generator.idBaseRamdom();

			this.nodes.items[node.id] = node;

			//search nodes linked
			//first input
			//second output
			//draw connections

			this.dispatch('nodeCreated', node);
		},
		removeNodeId(id: number) {
			this.removeConnectionNodeId(id ?? 0);

			// this.nodes.removed.push(id);
			//🚩BACK(actualizar reactivamente)
			delete this.nodes.items[id];
			// ejemplo de remover de manera temporal (guardado por commit)
			// this.nodes.items[id].state.status = statusLife.Removed;

			this.nodes.selected = 0;
			this.dispatch('nodeRemoved', id);
		},
		// Graph
		removeReouteConnectionSelected() {
			this.dispatch('connectionUnselected', true);
		},
		removeConnection() {
			if (this.graphs.selected !== '') {
				const graph = this.graphs.items[this.graphs.selected];

				delete this.graphs.items[this.graphs.selected];

				this.dispatch('connectionRemoved', {
					output_id: graph.state.nodeOut,
					input_id: graph.state.nodeIn,
					output_class: graph.state.output,
					input_class: graph.state.input,
				});

				this.graphs.selected = '';
			}
		},
		removeSingleConnection(id: string) {
			delete this.graphs.items[id];

			this.dispatch('connectionRemoved', {
				graphId: id,
			});
		},
		removeConnectionNodeId(nodeId: number) {
			//delete graph in the current board
			//🚩BACK(actualizar reactivamente)
			Object.keys(this.graphs.items).forEach((item) => {
				const key = Number.parseInt(item);
				if (
					this.graphs.items[key].state.nodeIn === nodeId ||
					this.graphs.items[key].state.nodeOut === nodeId
				) {
					delete this.graphs.items[key];
					this.dispatch('connectionRemoved', {
						output_id: this.graphs.items[key].state.nodeOut,
						input_id: this.graphs.items[key].state.nodeIn,
						output_class: this.graphs.items[key].state.output,
						input_class: this.graphs.items[key].state.input,
					});
				}
			});
		},
		// Zoom
		zoom_enter(context: any) {
			console.log('zoom_enter', context);
		},
		zoom_out() {
			console.log('zoom_out');
		},
		zoom_in() {
			console.log('zoom_in');
		},
		// mobile
		pointerdown_handler(context: any) {
			this.mobile.evCache.push(context);
		},
		pointerup_handler(context: any) {
			this.remove_event(context);
			if (this.mobile.evCache.length < 2) {
				this.mobile.prevDiff = -1;
			}
		},
		pointermove_handler(context: any) {
			for (let i = 0; i < this.mobile.evCache.length; i++) {
				if (context.pointerId == this.mobile.evCache[i].pointerId) {
					this.mobile.evCache[i] = context;
					break;
				}
			}

			if (this.mobile.evCache.length == 2) {
				// Calculate the distance between the two pointers
				let curDiff = Math.abs(
					this.mobile.evCache[0].clientX - this.mobile.evCache[1].clientX
				);

				if (this.mobile.prevDiff > 100) {
					if (curDiff > this.mobile.prevDiff) {
						// The distance between the two pointers has increased

						this.zoom_in();
					}
					if (curDiff < this.mobile.prevDiff) {
						// The distance between the two pointers has decreased
						this.zoom_out();
					}
				}
				this.mobile.prevDiff = curDiff;
			}
		},
		pointercancel_handler(context: any) {
			console.log('pointercancel_handler', context);
		},
		pointerleave_handler(context: any) {
			console.log('pointerleave_handler', context);
		},
		pointerout_handler(context: any) {
			console.log('pointerout_handler', context);
		},
		remove_event(context: any) {
			// Remove this event from the target's cache
			for (let i = 0; i < this.mobile.evCache.length; i++) {
				if (this.mobile.evCache[i].pointerId == context.pointerId) {
					this.mobile.evCache.splice(i, 1);
					break;
				}
			}
		},
	},
});
