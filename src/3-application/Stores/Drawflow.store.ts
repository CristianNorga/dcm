import { defineStore } from 'pinia';
import type { Events } from '../Types/DrawFlow/Events';
import type {
	ElementStates,
	GraphStates,
	Node,
} from '../Types/DrawFlow/Element';
import { element } from '@enums/DrawFlow.enum';
import Generator from '../Common/Helpers/generator'

export const useDrawFlowStore = defineStore('utilsStore', {
	state: () => ({
		//custom
		boards: {
			selected: "Home",
			Home: {
				data: {
					nodes: [] as Node[],
					graphs: [],
				},
			}
		},
		nodes: {
			selected: 0,
			removed: [],
			items: {},
		} as ElementStates,
		graphs: {
			selected: 0,
			removed: [],
			items: {},
		} as ElementStates,
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
		ele_selected: '' as string,
		node_selected: null,
		drag: false,
		reroute: false,
		curvature: 0.5,
		reroute_curvature_start_end: 0.5,
		reroute_curvature: 0.5,
		reroute_width: 6,
		drag_point: false,
		editor_selected: false,
		connection: false,
		connection_ele: null,
		connection_selected: null,
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
		startBase(
			context: MouseEvent,
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

			if (context.button === 0) {
				this.contextmenuDel();
			}

			return true;
		},
		startConnection(
			context: MouseEvent,
			clickedElement: element,
			id: number = 0,
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
			context: MouseEvent,
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
		position(context: any) {
			console.log('position', context);
		},
		click(context: MouseEvent, clickedElement: element, id: number = 0) {
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
							output_id: this.graphs.items[this.graphs.selected].nodeOut,
							input_id: this.graphs.items[this.graphs.selected].nodeIn,
							output_class: this.graphs.items[this.graphs.selected].output,
							input_class: this.graphs.items[this.graphs.selected].input,
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
			if (
				['input', 'output', 'main-path'].includes(
					this.selectedElement.id.classList[0]
				)
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
		drawConnection(idNode: number, idOutPut: string) {
			let id = Generator.idBaseRamdom();
			this.graphs.items[id] = {
				pathToDraw: '',
				nodeIn: '',
				nodeOut: '',
				input: '',
				output: '',
			} as GraphStates;
			this.graphs.selected = id;
			this.dispatch('connectionStart', {
				output_id: idNode,
				output_class: idOutPut,
			});
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
			// this.nodes.removed.push(id);
			// delete this.nodes.items[id];
			// this.nodes.selected = 0;
			this.removeConnectionNodeId(id);
			this.boards[this.boards.selected].data.nodes = this.boards[
				this.boards.selected
			].data.nodes.filter((node) => node.id !== id);
			delete this.drawflow.drawflow[moduleName].data[id.slice(5)];
			this.dispatch('nodeRemoved', id);
		},
		// Graph
		removeReouteConnectionSelected() {
			this.dispatch('connectionUnselected', true);
		},
		removeConnection() {
		},
		removeConnectionNodeId(id: number) {
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
