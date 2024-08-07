import { defineStore } from 'pinia';
import type { Events } from '../Types/DrawFlow/Events';
import type {
	ElementStates,
	Board,
	Graph,
	Node
} from '../Types/DrawFlow/Element';
import { connection, element, statusLife } from '@enums/DrawFlow.enum';
import Generator from '../Common/Helpers/generator'

export const useDrawFlowStore = defineStore('utilsStore', {
	state: () => ({
		//custom
		parent: new HTMLElement(),
		boards: {
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
		} as Board,
		nodes: {
			selected: 0,
			removed: [],
			items: {},
		} as ElementStates & { items: {[key: number]: Node}},
		graphs: {
			selected: 0,
			removed: [],
			items: {},
		} as ElementStates & { items: {[key: number]: Graph} },
		connections: {
			startIn: connection.Inputs,
			inputs: '',
			outputs: '',
		} as { inputs: string; outputs: string, startIn: connection.Inputs | connection.Outputs },
		selectedElement: {
			type: '' as element,
			id: 0 as number,
		},
		//old
		events: {
			example: { listeners: [] },
		} as Events,
		// container: container, drawFlowParent
		precanvas: null,
		nodeId: 1,
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
		setDrawFlowParent(parent: HTMLElement) {
			this.parent = parent;
		},
		startBase(
			context: MouseEvent & TouchEvent,
			clickedElement: element,
			id: number = 0
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

			if (context?.button === 0) {
				this.contextmenuDel();
			}

			return true;
		},
		startConnection(
			context: MouseEvent & TouchEvent,
			clickedElement: element,
			id: number,
			outPut: string
		) {
			if (!this.startBase(context, clickedElement, id)) return false;
			this.connection = true;
			if (this.nodes.selected > 0) {
				this.nodes.selected = 0;
				this.dispatch('nodeUnselected', true);
			}
			if (this.graphs.selected > 0) {
				this.graphs.selected = 0;
				this.removeReouteConnectionSelected();
			}
			this.drawConnection(id, outPut);
		},
		deleteElement(
			context: MouseEvent & TouchEvent,
			clickedElement: element,
			id: number = 0
		) {
			if (!this.startBase(context, clickedElement, id)) return false;

			if (clickedElement === element.Node) {
				this.removeNodeId(id);
			} else if (clickedElement === element.Graph) {
				this.removeConnection();
			}

			if (this.nodes.selected > 0) {
				this.nodes.selected = 0;
				this.dispatch('nodeUnselected', true);
			}
			if (this.graphs.selected > 0) {
				this.removeReouteConnectionSelected();
				this.graphs.selected = 0;
			}
		},
		// old
		dragEnd(context: any) {
			return console.log('dragEnd', context);
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
				x = this.canvas_x + -(this.pos_x - e_pos_x);
				y = this.canvas_y + -(this.pos_y - e_pos_y);
				this.dispatch('translate', { x: x, y: y });
				this.parent.style.transform =
					'translate(' + x + 'px, ' + y + 'px) scale(' + this.configurableOptions.zoom + ')';
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
				
				this.graphs.items[this.graphs.selected].point[this.selectedElement.id].pos_x = pos_x;
				this.graphs.items[this.graphs.selected].point[this.selectedElement.id].pos_y = pos_y;

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
			id: number = 0
		) {
			if (!this.startBase(context, clickedElement, id)) return false;

			switch (clickedElement) {
				case element.Node:
					if (this.nodes.selected != this.selectedElement.id) {
						this.dispatch('nodeUnselected', true);
					} else {
						this.dispatch('nodeSelected', this.nodes.selected);
					}
					this.nodes.selected = 0;
					this.graphs.selected = 0;
					this.removeReouteConnectionSelected();

					this.nodes.selected = this.selectedElement.id;
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
					if (this.graphs.selected > 0) {
						this.removeReouteConnectionSelected();
						this.graphs.selected = 0;
					}
					this.editor_selected = true;
					break;
				case element.Graph:
					if (this.nodes.selected > 0) {
						this.nodes.selected = 0;
						this.dispatch('nodeUnselected', true);
					}
					if (this.graphs.selected > 0) {
						this.removeReouteConnectionSelected();
						this.graphs.selected = 0;
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
		contextmenuDel() {
			console.log('contextmenuDel');
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
			let id = Generator.idBaseRamdom();
			this.graphs.items[id] = {
				id: id,
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
			this.graphs.selected = id;
			this.selectedElement.id = id; //sobra?
			this.selectedElement.type = element.Graph;
			this.dispatch('connectionStart', {
				output_id: nodeId,
				output_class: idOutPut,
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

			var line_x =
				nodeConnection.offsetWidth / 2 +
				nodeConnection.pos_x -
				this.parent.getBoundingClientRect().x * parentWitdhZoom;

			var line_y = nodeConnection.offsetHeight / 2 + (nodeConnection.pos_y) - this.parent.getBoundingClientRect().y * parentHeightZoom;
			
			var x =
				eX *
					(this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom)) -
				this.parent.getBoundingClientRect().x *
					(this.parent.clientWidth / (this.parent.clientWidth * this.configurableOptions.zoom));
			var y =
				eY *
					(this.parent.clientHeight / (this.parent.clientHeight * this.configurableOptions.zoom)) -
				this.parent.getBoundingClientRect().y *
					(this.parent.clientHeight / (this.parent.clientHeight * this.configurableOptions.zoom));

			var lineCurve = this.createCurvature(
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
					this.graphs.items[Number.parseInt(key)].state.nodeOut === id
				)
				.map((key) => Number.parseInt(key));

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
				// console.error(`This event: ${event} does not exist`);
				return false;
			}
			this.events[event].listeners.forEach((listener) => {
				listener(details);
			});
		},
		// Nodes
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
		removeConnection() {},
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
