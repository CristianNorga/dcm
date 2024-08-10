import { defineStore } from 'pinia';
import type { Events } from '../Types/DrawFlow/Events';
import type {
	ElementStates,Board,Graph,Node
} from '../Types/DrawFlow/Element';
import { connection, element, statusLife } from '@enums/DrawFlow.enum';
import Generator from '../Common/Helpers/generator'

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
		} as Board & { x: number, y: number, scale: number },
		nodes: {
			selected: 0,
			removed: [],
			items: {
			},
		} as ElementStates & { items: {[key: number]: Node}, selected: number },
		graphs: {
			selected: '',
			removed: [],
			items: {},
		} as ElementStates & { items: {[key: string]: Graph}, selected: string },
		connections: {
			startIn: connection.Inputs,
			inputs: '',
			outputs: '',
		} as { inputs: string; outputs: string, startIn: connection.Inputs | connection.Outputs },
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
		useuuid: false,
		// parent: parent, drawFlowParent
		noderegister: {},
		// render: render, no necesary
		drawflow: { drawflow: { Home: { data: {} } } },
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
			let nodeMain = {} as Node;
			nodeMain = {
				id: 1,
				type: 'service',
				data: {
					name: 'Servicio1',
					namespace: 'namespace1',
					technology: "csharp",
				},
				masterId: 'main',
				state: {
					x: 100,
					y: 100,
					status: statusLife.Active,
					width: 100,
					height: 100,
				},
				inputs: {},
				outputs: {},
			};

			this.nodes.items[1] = nodeMain;
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
			clickedElement: element,
			nodeId: string,
			outPut: string
		) {
			if (!this.startBase(context, clickedElement, nodeId)) return false;
			this.connection = true;
			if (this.nodes.selected > 0) {
				this.nodes.selected = 0;
				this.dispatch('nodeUnselected', true);
			}
			if (this.graphs.selected != '') {
				this.graphs.selected = '';
				this.removeReouteConnectionSelected();
			}
			this.drawConnection(parseInt(nodeId), outPut);
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
			// if (this.connection === true) {
			// 	if (
			// 		ele_last.classList[0] === 'input' ||
			// 		(this.force_first_input &&
			// 			(ele_last.closest('.drawflow_content_node') != null ||
			// 				ele_last.classList[0] === 'drawflow-node'))
			// 	) {
			// 		if (
			// 			this.force_first_input &&
			// 			(ele_last.closest('.drawflow_content_node') != null ||
			// 				ele_last.classList[0] === 'drawflow-node')
			// 		) {
			// 			if (ele_last.closest('.drawflow_content_node') != null) {
			// 				var input_id = ele_last.closest('.drawflow_content_node').parentElement
			// 					.id;
			// 			} else {
			// 				var input_id = ele_last.id;
			// 			}
			// 			if (
			// 				Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0
			// 			) {
			// 				var input_class = false;
			// 			} else {
			// 				var input_class = 'input_1';
			// 			}
			// 		} else {
			// 			// Fix connection;
			// 			var input_id = ele_last.parentElement.parentElement.id;
			// 			var input_class = ele_last.classList[1];
			// 		}
			// 		var output_id = this.ele_selected.parentElement.parentElement.id;
			// 		var output_class = this.ele_selected.classList[1];

			// 		if (output_id !== input_id && input_class !== false) {
			// 			if (
			// 				this.container.querySelectorAll(
			// 					'.connection.node_in_' +
			// 						input_id +
			// 						'.node_out_' +
			// 						output_id +
			// 						'.' +
			// 						output_class +
			// 						'.' +
			// 						input_class
			// 				).length === 0
			// 			) {
			// 				// Conection no exist save connection

			// 				this.connection_ele.classList.add('node_in_' + input_id);
			// 				this.connection_ele.classList.add('node_out_' + output_id);
			// 				this.connection_ele.classList.add(output_class);
			// 				this.connection_ele.classList.add(input_class);
			// 				var id_input = input_id.slice(5);
			// 				var id_output = output_id.slice(5);

			// 				this.drawflow.drawflow[this.module].data[id_output].outputs[
			// 					output_class
			// 				].connections.push({ node: id_input, output: input_class });
			// 				this.drawflow.drawflow[this.module].data[id_input].inputs[
			// 					input_class
			// 				].connections.push({ node: id_output, input: output_class });
			// 				this.updateConnectionNodes('node-' + id_output);
			// 				this.updateConnectionNodes('node-' + id_input);
			// 				this.dispatch('connectionCreated', {
			// 					output_id: id_output,
			// 					input_id: id_input,
			// 					output_class: output_class,
			// 					input_class: input_class,
			// 				});
			// 			} else {
			// 				this.dispatch('connectionCancel', true);
			// 				this.connection_ele.remove();
			// 			}

			// 			this.connection_ele = null;
			// 		} else {
			// 			// Connection exists Remove Connection;
			// 			this.dispatch('connectionCancel', true);
			// 			this.connection_ele.remove();
			// 			this.connection_ele = null;
			// 		}
			// 	} else {
			// 		// Remove Connection;
			// 		this.dispatch('connectionCancel', true);
			// 		this.connection_ele.remove();
			// 		this.connection_ele = null;
			// 	}
			// }

			this.drag = false;
			this.drag_point = false;
			this.connection = false;
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

				this.nodes.items[this.nodes.selected].state.x = this.nodes.items[
					this.nodes.selected
				].state.x - x;
				this.nodes.items[this.nodes.selected].state.y = this.nodes.items[
					this.nodes.selected
				].state.y - y;

				this.updateConnectionNodes(this.nodes.selected);
			}

			if (this.drag_point) {
				this.pos_x = e_pos_x;
				this.pos_y = e_pos_y;

				let pos_x =
					this.pos_x *
						(this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom)) -
					this.parent.getBoundingClientRect().x *
						(this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom));
				let pos_y =
					this.pos_y *
						(this.parent.clientHeight /
							(this.parent.clientHeight * this.configurableOptions.zoom)) -
					this.parent.getBoundingClientRect().y *
						(this.parent.clientHeight / (this.parent.clientHeight * this.configurableOptions.zoom));
				
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
		click(
			context: MouseEvent & TouchEvent,
			clickedElement: element,
			id: string
		) {
			if (!this.startBase(context, clickedElement, id)) return false;

			switch (clickedElement) {
				case element.Node:
					if (this.nodes.selected != parseInt(this.selectedElement.id)) {
						this.dispatch('nodeUnselected', true);
					} else {
						this.dispatch('nodeSelected', this.nodes.selected);
					}
					this.nodes.selected = 0;
					this.graphs.selected = '';
					this.removeReouteConnectionSelected();

					this.nodes.selected = parseInt(this.selectedElement.id);
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
			let key = `${nodeId}.${idOutPut}`;
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
		addConnection(id_output: number, id_input: number, output_class: string, input_class: string) {
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
			const nodeConnection = this.nodes.items
				[this.nodes.selected][this.connections.startIn]
				[this.connections[this.connections.startIn]];
			let parentWitdhZoom = this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom);
			parentWitdhZoom = parentWitdhZoom || 0;
			let parentHeightZoom = this.parent.clientHeight / (this.parent.clientHeight * this.configurableOptions.zoom);
			parentHeightZoom = parentHeightZoom || 0;

			let line_x =
				nodeConnection.offsetWidth / 2 +
				nodeConnection.pos_x -
				this.parent.getBoundingClientRect().x * parentWitdhZoom;

			let line_y = nodeConnection.offsetHeight / 2 + (nodeConnection.pos_y) - this.parent.getBoundingClientRect().y * parentHeightZoom;
			
			let x =
				eX *
					(this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom)) -
				this.parent.getBoundingClientRect().x *
					(this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom));
			let y =
				eY *
					(this.parent.clientHeight / (this.parent.clientHeight * this.configurableOptions.zoom)) -
				this.parent.getBoundingClientRect().y *
					(this.parent.clientHeight / (this.parent.clientHeight * this.configurableOptions.zoom));

			let lineCurve = this.createCurvature(
				line_x,
				line_y,
				x,
				y,
				'openclose'
			);
			this.graphs.items[this.graphs.selected].state.pathToDraw = lineCurve;
		},
		updateConnectionNodes(id: number) {
			const precanvas = this.parent;
			const zoom = this.configurableOptions.zoom;
			let parentWitdhZoom =
				this.parent.clientWidth / (this.parent.clientWidth * zoom);
			parentWitdhZoom = parentWitdhZoom || 0;
			let parentHeightZoom =
				this.parent.clientHeight /
				(this.parent.clientHeight * zoom);
			parentHeightZoom = parentHeightZoom || 0;

			const elemsOut = Object.keys(this.graphs.items)
				.filter((key) => 
					this.graphs.items[key].state.nodeOut === id
				)

			let line_x,line_y,eX,eY = 0;
			elemsOut.forEach((key) => {
				if (this.graphs.items[key].point.length === 0) {

					let nodeRelationId = this.graphs.items[key].state.nodeIn;

					let inputRelation = this.nodes.items[nodeRelationId].inputs[
						this.graphs.items[key].state.output
					];

					eX = inputRelation.offsetWidth / 2 + inputRelation.pos_x - precanvas.getBoundingClientRect().x * parentWitdhZoom;

					eY = inputRelation.offsetHeight / 2 + inputRelation.pos_y - precanvas.getBoundingClientRect().y * parentHeightZoom;

					let outputRelation = this.nodes.items[id].outputs[
						this.graphs.items[key].state.input
					];

					line_x = outputRelation.offsetWidth / 2 + outputRelation.pos_x - precanvas.getBoundingClientRect().x * parentWitdhZoom;

					line_y = outputRelation.offsetHeight / 2 + outputRelation.pos_y - precanvas.getBoundingClientRect().y * parentHeightZoom;

					const lineCurve = this.createCurvature(
						line_x,
						line_y,
						eX,
						eY,
						'openclose'
					);

					this.graphs.items[key].state.pathToDraw = lineCurve;

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
			let hx1, hx2 = 0;
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
		addNode(
			node: Node
		) {

			// Check if node exist
			let exist = Object.values(this.nodes.items).find((val) => val.masterId === node.masterId) !== undefined;

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

				delete this.graphs.items[this.graphs.selected]
				
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
