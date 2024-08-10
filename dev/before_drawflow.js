export default class Drawflow {
	constructor(container, render = null, parent = null) {
		this.events = {};
		this.container = container;
		this.precanvas = null;
		this.nodeId = 1;
		this.ele_selected = null;
		this.node_selected = null;
		this.drag = false;
		this.reroute = false;
		this.reroute_fix_curvature = false;
		this.curvature = 0.5;
		this.reroute_curvature_start_end = 0.5;
		this.reroute_curvature = 0.5;
		this.reroute_width = 6;
		this.drag_point = false;
		this.editor_selected = false;
		this.connection = false;
		this.connection_ele = null;
		this.connection_selected = null;
		this.canvas_x = 0;
		this.canvas_y = 0;
		this.pos_x = 0;
		this.pos_x_start = 0;
		this.pos_y = 0;
		this.pos_y_start = 0;
		this.mouse_x = 0;
		this.mouse_y = 0;
		this.line_path = 5;
		this.first_click = null;
		this.force_first_input = false;
		this.draggable_inputs = true;
		this.useuuid = false;
		this.parent = parent;

		this.noderegister = {};
		this.render = render;
		this.drawflow = { drawflow: { Home: { data: {} } } };
		// Configurable options
		this.module = 'Home';
		this.editor_mode = 'edit';
		this.zoom = 1;
		this.zoom_max = 1.6;
		this.zoom_min = 0.5;
		this.zoom_value = 0.1;
		this.zoom_last_value = 1;

		// Mobile
		this.evCache = new Array();
		this.prevDiff = -1;
	}

	start() {
		// console.info("Start Drawflow!!");
		this.load();
	}

	
	/* End Mobile Zoom */
	//component VUE
	load() {
		for (var key in this.drawflow.drawflow[this.module].data) {
			this.addNodeImport(
				this.drawflow.drawflow[this.module].data[key],
				this.precanvas
			);
		}

		if (this.reroute) {
			for (var key in this.drawflow.drawflow[this.module].data) {
				this.addRerouteImport(this.drawflow.drawflow[this.module].data[key]);
			}
		}

		for (var key in this.drawflow.drawflow[this.module].data) {
			this.updateConnectionNodes('node-' + key);
		}

		const editor = this.drawflow.drawflow;
		let number = 1;
		Object.keys(editor).map(function (moduleName, index) {
			Object.keys(editor[moduleName].data).map(function (id, index2) {
				if (parseInt(id) >= number) {
					number = parseInt(id) + 1;
				}
			});
		});
		this.nodeId = number;
	}



	
	contextmenu(e) {
		this.dispatch('contextmenu', e);
		e.preventDefault();
		if (this.editor_mode === 'fixed' || this.editor_mode === 'view') {
			return false;
		}
		if (this.precanvas.getElementsByClassName('drawflow-delete').length) {
			this.precanvas.getElementsByClassName('drawflow-delete')[0].remove();
		}
		if (this.node_selected || this.connection_selected) {
			var deletebox = document.createElement('div');
			deletebox.classList.add('drawflow-delete');
			deletebox.innerHTML = 'x';
			if (this.node_selected) {
				this.node_selected.appendChild(deletebox);
			}
			if (
				this.connection_selected &&
				this.connection_selected.parentElement.classList.length > 1
			) {
				deletebox.style.top =
					e.clientY *
						(this.precanvas.clientHeight /
							(this.precanvas.clientHeight * this.zoom)) -
					this.precanvas.getBoundingClientRect().y *
						(this.precanvas.clientHeight /
							(this.precanvas.clientHeight * this.zoom)) +
					'px';
				deletebox.style.left =
					e.clientX *
						(this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) -
					this.precanvas.getBoundingClientRect().x *
						(this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) +
					'px';

				this.precanvas.appendChild(deletebox);
			}
		}
	}
	contextmenuDel() {
		if (this.precanvas.getElementsByClassName('drawflow-delete').length) {
			this.precanvas.getElementsByClassName('drawflow-delete')[0].remove();
		}
	}

	// key(e) {
	// 	this.dispatch('keydown', e);
	// 	if (this.editor_mode === 'fixed' || this.editor_mode === 'view') {
	// 		return false;
	// 	}
	// 	if (e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) {
	// 		if (this.node_selected != null) {
	// 			if (
	// 				this.first_click.tagName !== 'INPUT' &&
	// 				this.first_click.tagName !== 'TEXTAREA' &&
	// 				this.first_click.hasAttribute('contenteditable') !== true
	// 			) {
	// 				this.removeNodeId(this.node_selected.id);
	// 			}
	// 		}
	// 		if (this.connection_selected != null) {
	// 			this.removeConnection();
	// 		}
	// 	}
	// }

	// zoom_enter(event, delta) {
	// 	if (event.ctrlKey) {
	// 		event.preventDefault();
	// 		if (event.deltaY > 0) {
	// 			// Zoom Out
	// 			this.zoom_out();
	// 		} else {
	// 			// Zoom In
	// 			this.zoom_in();
	// 		}
	// 	}
	// }
	// zoom_refresh() {
	// 	this.dispatch('zoom', this.zoom);
	// 	this.canvas_x = (this.canvas_x / this.zoom_last_value) * this.zoom;
	// 	this.canvas_y = (this.canvas_y / this.zoom_last_value) * this.zoom;
	// 	this.zoom_last_value = this.zoom;
	// 	this.precanvas.style.transform =
	// 		'translate(' +
	// 		this.canvas_x +
	// 		'px, ' +
	// 		this.canvas_y +
	// 		'px) scale(' +
	// 		this.zoom +
	// 		')';
	// }
	// zoom_in() {
	// 	if (this.zoom < this.zoom_max) {
	// 		this.zoom += this.zoom_value;
	// 		this.zoom_refresh();
	// 	}
	// }
	// zoom_out() {
	// 	if (this.zoom > this.zoom_min) {
	// 		this.zoom -= this.zoom_value;
	// 		this.zoom_refresh();
	// 	}
	// }
	// zoom_reset() {
	// 	if (this.zoom != 1) {
	// 		this.zoom = 1;
	// 		this.zoom_refresh();
	// 	}
	// }

	dblclick(e) {
		if (this.connection_selected != null && this.reroute) {
			this.createReroutePoint(this.connection_selected);
		}

		if (e.target.classList[0] === 'point') {
			this.removeReroutePoint(e.target);
		}
	}

	createReroutePoint(ele) {
		this.connection_selected.classList.remove('selected');
		const nodeUpdate =
			this.connection_selected.parentElement.classList[2].slice(9);
		const nodeUpdateIn =
			this.connection_selected.parentElement.classList[1].slice(13);
		const output_class = this.connection_selected.parentElement.classList[3];
		const input_class = this.connection_selected.parentElement.classList[4];
		this.connection_selected = null;
		const point = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'circle'
		);
		point.classList.add('point');
		var pos_x =
			this.pos_x *
				(this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) -
			this.precanvas.getBoundingClientRect().x *
				(this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom));
		var pos_y =
			this.pos_y *
				(this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) -
			this.precanvas.getBoundingClientRect().y *
				(this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom));

		point.setAttributeNS(null, 'cx', pos_x);
		point.setAttributeNS(null, 'cy', pos_y);
		point.setAttributeNS(null, 'r', this.reroute_width);

		let position_add_array_point = 0;
		if (this.reroute_fix_curvature) {
			const numberPoints = ele.parentElement.querySelectorAll('.main-path').length;
			var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.classList.add('main-path');
			path.setAttributeNS(null, 'd', '');

			ele.parentElement.insertBefore(
				path,
				ele.parentElement.children[numberPoints]
			);
			if (numberPoints === 1) {
				ele.parentElement.appendChild(point);
			} else {
				const search_point = Array.from(ele.parentElement.children).indexOf(ele);
				position_add_array_point = search_point;
				ele.parentElement.insertBefore(
					point,
					ele.parentElement.children[search_point + numberPoints + 1]
				);
			}
		} else {
			ele.parentElement.appendChild(point);
		}

		const nodeId = nodeUpdate.slice(5);
		const searchConnection = this.drawflow.drawflow[this.module].data[
			nodeId
		].outputs[output_class].connections.findIndex(function (item, i) {
			return item.node === nodeUpdateIn && item.output === input_class;
		});

		if (
			this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class]
				.connections[searchConnection].points === undefined
		) {
			this.drawflow.drawflow[this.module].data[nodeId].outputs[
				output_class
			].connections[searchConnection].points = [];
		}

		if (this.reroute_fix_curvature) {
			if (
				position_add_array_point > 0 ||
				this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class]
					.connections[searchConnection].points !== []
			) {
				this.drawflow.drawflow[this.module].data[nodeId].outputs[
					output_class
				].connections[searchConnection].points.splice(position_add_array_point, 0, {
					pos_x: pos_x,
					pos_y: pos_y,
				});
			} else {
				this.drawflow.drawflow[this.module].data[nodeId].outputs[
					output_class
				].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
			}

			ele.parentElement.querySelectorAll('.main-path').forEach((item, i) => {
				item.classList.remove('selected');
			});
		} else {
			this.drawflow.drawflow[this.module].data[nodeId].outputs[
				output_class
			].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
		}

		this.dispatch('addReroute', nodeId);
		this.updateConnectionNodes(nodeUpdate);
	}

	removeReroutePoint(ele) {
		const nodeUpdate = ele.parentElement.classList[2].slice(9);
		const nodeUpdateIn = ele.parentElement.classList[1].slice(13);
		const output_class = ele.parentElement.classList[3];
		const input_class = ele.parentElement.classList[4];

		let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele);
		const nodeId = nodeUpdate.slice(5);
		const searchConnection = this.drawflow.drawflow[this.module].data[
			nodeId
		].outputs[output_class].connections.findIndex(function (item, i) {
			return item.node === nodeUpdateIn && item.output === input_class;
		});

		if (this.reroute_fix_curvature) {
			const numberMainPath =
				ele.parentElement.querySelectorAll('.main-path').length;
			ele.parentElement.children[numberMainPath - 1].remove();
			numberPointPosition -= numberMainPath;
			if (numberPointPosition < 0) {
				numberPointPosition = 0;
			}
		} else {
			numberPointPosition--;
		}
		this.drawflow.drawflow[this.module].data[nodeId].outputs[
			output_class
		].connections[searchConnection].points.splice(numberPointPosition, 1);

		ele.remove();
		this.dispatch('removeReroute', nodeId);
		this.updateConnectionNodes(nodeUpdate);
	}

	registerNode(name, html, props = null, options = null) {
		this.noderegister[name] = { html: html, props: props, options: options };
	}

	getNodeFromId(id) {
		var moduleName = this.getModuleFromNodeId(id);
		return JSON.parse(
			JSON.stringify(this.drawflow.drawflow[moduleName].data[id])
		);
	}
	getNodesFromName(name) {
		var nodes = [];
		const editor = this.drawflow.drawflow;
		Object.keys(editor).map(function (moduleName, index) {
			for (var node in editor[moduleName].data) {
				if (editor[moduleName].data[node].name == name) {
					nodes.push(editor[moduleName].data[node].id);
				}
			}
		});
		return nodes;
	}

	

	addNodeImport(dataNode, precanvas) {
		const parent = document.createElement('div');
		parent.classList.add('parent-node');

		const node = document.createElement('div');
		node.innerHTML = '';
		node.setAttribute('id', 'node-' + dataNode.id);
		node.classList.add('drawflow-node');
		if (dataNode.class != '') {
			node.classList.add(...dataNode.class.split(' '));
		}

		const inputs = document.createElement('div');
		inputs.classList.add('inputs');

		const outputs = document.createElement('div');
		outputs.classList.add('outputs');

		Object.keys(dataNode.inputs).map(function (input_item, index) {
			const input = document.createElement('div');
			input.classList.add('input');
			input.classList.add(input_item);
			inputs.appendChild(input);
			Object.keys(dataNode.inputs[input_item].connections).map(function (
				output_item,
				index
			) {
				var connection = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg'
				);
				var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path.classList.add('main-path');
				path.setAttributeNS(null, 'd', '');
				// path.innerHTML = 'a';
				connection.classList.add('connection');
				connection.classList.add('node_in_node-' + dataNode.id);
				connection.classList.add(
					'node_out_node-' +
						dataNode.inputs[input_item].connections[output_item].node
				);
				connection.classList.add(
					dataNode.inputs[input_item].connections[output_item].input
				);
				connection.classList.add(input_item);

				connection.appendChild(path);
				precanvas.appendChild(connection);
			});
		});

		for (var x = 0; x < Object.keys(dataNode.outputs).length; x++) {
			const output = document.createElement('div');
			output.classList.add('output');
			output.classList.add('output_' + (x + 1));
			outputs.appendChild(output);
		}

		const content = document.createElement('div');
		content.classList.add('drawflow_content_node');

		if (dataNode.typenode === false) {
			content.innerHTML = dataNode.html;
		} else if (dataNode.typenode === true) {
			content.appendChild(this.noderegister[dataNode.html].html.cloneNode(true));
		} else {
			if (parseInt(this.render.version) === 3) {
				//Vue 3
				let wrapper = this.render.h(
					this.noderegister[dataNode.html].html,
					this.noderegister[dataNode.html].props,
					this.noderegister[dataNode.html].options
				);
				wrapper.appContext = this.parent;
				this.render.render(wrapper, content);
			} else {
				//Vue 2
				let wrapper = new this.render({
					parent: this.parent,
					render: (h) =>
						h(this.noderegister[dataNode.html].html, {
							props: this.noderegister[dataNode.html].props,
						}),
					...this.noderegister[dataNode.html].options,
				}).$mount();
				content.appendChild(wrapper.$el);
			}
		}

		Object.entries(dataNode.data).forEach(function (key, value) {
			if (typeof key[1] === 'object') {
				insertObjectkeys(null, key[0], key[0]);
			} else {
				var elems = content.querySelectorAll('[df-' + key[0] + ']');
				for (var i = 0; i < elems.length; i++) {
					elems[i].value = key[1];
					if (elems[i].isContentEditable) {
						elems[i].innerText = key[1];
					}
				}
			}
		});

		function insertObjectkeys(object, name, completname) {
			if (object === null) {
				var object = dataNode.data[name];
			} else {
				var object = object[name];
			}
			if (object !== null) {
				Object.entries(object).forEach(function (key, value) {
					if (typeof key[1] === 'object') {
						insertObjectkeys(object, key[0], completname + '-' + key[0]);
					} else {
						var elems = content.querySelectorAll(
							'[df-' + completname + '-' + key[0] + ']'
						);
						for (var i = 0; i < elems.length; i++) {
							elems[i].value = key[1];
							if (elems[i].isContentEditable) {
								elems[i].innerText = key[1];
							}
						}
					}
				});
			}
		}
		node.appendChild(inputs);
		node.appendChild(content);
		node.appendChild(outputs);
		node.style.top = dataNode.pos_y + 'px';
		node.style.left = dataNode.pos_x + 'px';
		parent.appendChild(node);
		this.precanvas.appendChild(parent);
	}

	addRerouteImport(dataNode) {
		const reroute_width = this.reroute_width;
		const reroute_fix_curvature = this.reroute_fix_curvature;
		const container = this.container;
		Object.keys(dataNode.outputs).map(function (output_item, index) {
			Object.keys(dataNode.outputs[output_item].connections).map(function (
				input_item,
				index
			) {
				const points = dataNode.outputs[output_item].connections[input_item].points;
				if (points !== undefined) {
					points.forEach((item, i) => {
						const input_id =
							dataNode.outputs[output_item].connections[input_item].node;
						const input_class =
							dataNode.outputs[output_item].connections[input_item].output;
						const ele = container.querySelector(
							'.connection.node_in_node-' +
								input_id +
								'.node_out_node-' +
								dataNode.id +
								'.' +
								output_item +
								'.' +
								input_class
						);

						if (reroute_fix_curvature) {
							if (i === 0) {
								for (var z = 0; z < points.length; z++) {
									var path = document.createElementNS(
										'http://www.w3.org/2000/svg',
										'path'
									);
									path.classList.add('main-path');
									path.setAttributeNS(null, 'd', '');
									ele.appendChild(path);
								}
							}
						}

						const point = document.createElementNS(
							'http://www.w3.org/2000/svg',
							'circle'
						);
						point.classList.add('point');
						var pos_x = item.pos_x;
						var pos_y = item.pos_y;

						point.setAttributeNS(null, 'cx', pos_x);
						point.setAttributeNS(null, 'cy', pos_y);
						point.setAttributeNS(null, 'r', reroute_width);

						ele.appendChild(point);
					});
				}
			});
		});
	}

	updateNodeValue(event) {
		var attr = event.target.attributes;
		for (var i = 0; i < attr.length; i++) {
			if (attr[i].nodeName.startsWith('df-')) {
				var keys = attr[i].nodeName.slice(3).split('-');
				var target =
					this.drawflow.drawflow[this.module].data[
						event.target.closest('.drawflow_content_node').parentElement.id.slice(5)
					].data;
				for (var index = 0; index < keys.length - 1; index += 1) {
					if (target[keys[index]] == null) {
						target[keys[index]] = {};
					}
					target = target[keys[index]];
				}
				target[keys[keys.length - 1]] = event.target.value;
				if (event.target.isContentEditable) {
					target[keys[keys.length - 1]] = event.target.innerText;
				}
				this.dispatch(
					'nodeDataChanged',
					event.target.closest('.drawflow_content_node').parentElement.id.slice(5)
				);
			}
		}
	}

	updateNodeDataFromId(id, data) {
		var moduleName = this.getModuleFromNodeId(id);
		this.drawflow.drawflow[moduleName].data[id].data = data;
		if (this.module === moduleName) {
			const content = this.container.querySelector('#node-' + id);

			Object.entries(data).forEach(function (key, value) {
				if (typeof key[1] === 'object') {
					insertObjectkeys(null, key[0], key[0]);
				} else {
					var elems = content.querySelectorAll('[df-' + key[0] + ']');
					for (var i = 0; i < elems.length; i++) {
						elems[i].value = key[1];
						if (elems[i].isContentEditable) {
							elems[i].innerText = key[1];
						}
					}
				}
			});

			function insertObjectkeys(object, name, completname) {
				if (object === null) {
					var object = data[name];
				} else {
					var object = object[name];
				}
				if (object !== null) {
					Object.entries(object).forEach(function (key, value) {
						if (typeof key[1] === 'object') {
							insertObjectkeys(object, key[0], completname + '-' + key[0]);
						} else {
							var elems = content.querySelectorAll(
								'[df-' + completname + '-' + key[0] + ']'
							);
							for (var i = 0; i < elems.length; i++) {
								elems[i].value = key[1];
								if (elems[i].isContentEditable) {
									elems[i].innerText = key[1];
								}
							}
						}
					});
				}
			}
		}
	}

	

	getModuleFromNodeId(id) {
		var nameModule;
		const editor = this.drawflow.drawflow;
		Object.keys(editor).map(function (moduleName, index) {
			Object.keys(editor[moduleName].data).map(function (node, index2) {
				if (node == id) {
					nameModule = moduleName;
				}
			});
		});
		return nameModule;
	}

	addModule(name) {
		this.drawflow.drawflow[name] = { data: {} };
		this.dispatch('moduleCreated', name);
	}
	changeModule(name) {
		this.dispatch('moduleChanged', name);
		this.module = name;
		this.precanvas.innerHTML = '';
		this.canvas_x = 0;
		this.canvas_y = 0;
		this.pos_x = 0;
		this.pos_y = 0;
		this.mouse_x = 0;
		this.mouse_y = 0;
		this.zoom = 1;
		this.zoom_last_value = 1;
		this.precanvas.style.transform = '';
		this.import(this.drawflow, false);
	}

	removeModule(name) {
		if (this.module === name) {
			this.changeModule('Home');
		}
		delete this.drawflow.drawflow[name];
		this.dispatch('moduleRemoved', name);
	}

	clearModuleSelected() {
		this.precanvas.innerHTML = '';
		this.drawflow.drawflow[this.module] = { data: {} };
	}

	clear() {
		this.precanvas.innerHTML = '';
		this.drawflow = { drawflow: { Home: { data: {} } } };
	}
	export() {
		const dataExport = JSON.parse(JSON.stringify(this.drawflow));
		this.dispatch('export', dataExport);
		return dataExport;
	}

	import(data, notifi = true) {
		this.clear();
		this.drawflow = JSON.parse(JSON.stringify(data));
		this.load();
		if (notifi) {
			this.dispatch('import', 'import');
		}
	}

	/* Events */
	on(event, callback) {
		// Check if the callback is not a function
		if (typeof callback !== 'function') {
			console.error(
				`The listener callback must be a function, the given type is ${typeof callback}`
			);
			return false;
		}
		// Check if the event is not a string
		if (typeof event !== 'string') {
			console.error(
				`The event name must be a string, the given type is ${typeof event}`
			);
			return false;
		}
		// Check if this event not exists
		if (this.events[event] === undefined) {
			this.events[event] = {
				listeners: [],
			};
		}
		this.events[event].listeners.push(callback);
	}

	removeListener(event, callback) {
		// Check if this event not exists

		if (!this.events[event]) return false;

		const listeners = this.events[event].listeners;
		const listenerIndex = listeners.indexOf(callback);
		const hasListener = listenerIndex > -1;
		if (hasListener) listeners.splice(listenerIndex, 1);
	}

	getUuid() {
		// http://www.ietf.org/rfc/rfc4122.txt
		var s = [];
		var hexDigits = '0123456789abcdef';
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = '-';

		var uuid = s.join('');
		return uuid;
	}
}
