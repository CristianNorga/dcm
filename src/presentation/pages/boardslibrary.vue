<script>
import { h, render } from 'vue'
import service from '@components/Node/service.vue'
import Drawflow from 'drawflow'
// import styleDrawflow from 'drawflow/dist/drawflow.min.css'

const Vue = { version: 3, h, render };

export default {
  data() {
    return {
      editor: {},
      components: [
        {
          id: 1,
          name: 'component a',
          description: 'Content',
          category: 'Node_1',
          inputs: 0,
          outputs: 1,
          posx: 30,
          posy: 30,
          type: 'backend',
        },
        {
          id: 2,
          name: 'component b',
          description: 'Content',
          category: 'Node_1',
          inputs: 1,
          outputs: 0,
          posx: 30,
          posy: 30,
          type: 'backend',
        },
      ],
    }
  },
  async mounted() {
    // const importedModule = await import('drawflow')
    // const Drawflow = importedModule.default
    const id = document.getElementById("drawflow");
    this.editor = new Drawflow(id, Vue, this)
    // this.editor = new Drawflow(this.$refs.drawflow, Vue, this)

    this.editor.on('nodeCreated', (id) => {
        const links =  document.querySelectorAll(`#node-${id} .drawflow_content_node .link`);
        links.forEach((item) => {
            const target = document.querySelector(`#node-${id} .outputs .${item.classList[1]}`);
            if(target != null) {
                const pos = item.getBoundingClientRect();
                const targetPos = target.getBoundingClientRect();
                target.style.top = `${pos.y - targetPos.y}px`;
                target.style.left = `${pos.x - targetPos.x}px`;
            }
        })
    })

    this.editor.start()

    const props = {};
    const options = {};
    this.editor.registerNode('service', service, props, options);
    this.createNodesAccordingRoute()

    this.editor.addConnection(1, 2, 'output_1', 'input_1');
  },
  methods: {
    addNode(options) {
      let optsDefault = {
        name: 'default',
        inputs: 0,
        outputs: 1,
        posx: 10,
        posy: 10,
        class: 'classfor',
        data: { title: 'Node 1' },
        html: '<div><h1>Node 1</h1><p>Content</p></div>',
        typenode: false,
      };

      if (options) {
        optsDefault = { ...optsDefault, ...options };
      }

      this.editor.addNode(
        optsDefault.name,
        optsDefault.inputs,
        optsDefault.outputs,
        optsDefault.posx,
        optsDefault.posy,
        optsDefault.class,
        optsDefault.data,
        optsDefault.html,
        optsDefault.typenode
      );
    },
    createNodesAccordingRoute() {
      let nodeId = 1;
      this.components.forEach((element) => {
        element.id = nodeId++;
        this.addNode({
          name: element.name,
          posx: element.posx,
          posy: element.posy,
          class: `sc-drawflow ${element.category}`,
          data: JSON.stringify(element),
          inputs: element.inputs | 0,
          outputs: element.outputs | 0,
          html: '<div><h1>Node 1</h1><p>Content</p><div class="panel">Yes<div class="link output_1"></div></div></div>',
        });
      });

      const data = {};
      this.editor.addNode('Name-ramdom', 0, 1, 30, 30, 'sc-drawflow', {}, 'service', 'vue');
    }
  },
}
</script>

<template>
  <div>
  <NuxtLayout name="expanded">
    <template #header>
      <HeaderBasic>
        <template #items>
            <ul class="items-center gap-x-8 hidden lg:flex">
              
            </ul>
        </template>
      </HeaderBasic>
    </template>
    <template #options>
      <div class="board-options flex flex-col pt-6 bg-slate-800">
        
      </div>
    </template>
    <template #content>
      <!-- ref="drawflow" -->
      <section id="drawflow" ></section>
    </template>
  </NuxtLayout>
  </div>
</template>

<style>
@import 'drawflow/dist/drawflow.min.css';

.board-options {
  height: calc(100vh - 64px);
}
.parent-drawflow {
  width: 100%;
  height: 100%;
}

:root {
  --dfBackgroundColor: var(--bg-slate-950);
  --dfBackgroundSize: 9px;
  --dfBackgroundImage: linear-gradient(to right, rgba(147, 147, 147, 0.123) 1px, transparent 0.2px), linear-gradient(to bottom, rgba(147, 147, 147, 0.123) 1px, transparent 0.2px);

  --dfNodeType: flex;
  --dfNodeTypeFloat: none;
  --dfNodeBackgroundColor: #ffffff;
  --dfNodeTextColor: #000000;
  --dfNodeBorderSize: 2px;
  --dfNodeBorderColor: rgba(228, 228, 228, 1);
  --dfNodeBorderRadius: 4px;
  --dfNodeMinHeight: 40px;
  --dfNodeMinWidth: 160px;
  --dfNodePaddingTop: 15px;
  --dfNodePaddingBottom: 15px;
  --dfNodeBoxShadowHL: 0px;
  --dfNodeBoxShadowVL: 2px;
  --dfNodeBoxShadowBR: 15px;
  --dfNodeBoxShadowS: 2px;
  --dfNodeBoxShadowColor: rgba(225, 225, 225, 1);

  --dfNodeHoverBackgroundColor: #ffffff;
  --dfNodeHoverTextColor: #000000;
  --dfNodeHoverBorderSize: 2px;
  --dfNodeHoverBorderColor: #000000;
  --dfNodeHoverBorderRadius: 4px;

  --dfNodeHoverBoxShadowHL: 0px;
  --dfNodeHoverBoxShadowVL: 2px;
  --dfNodeHoverBoxShadowBR: 15px;
  --dfNodeHoverBoxShadowS: 2px;
  --dfNodeHoverBoxShadowColor: rgba(208, 232, 255, 1);

  --dfNodeSelectedBackgroundColor: rgba(249, 249, 249, 1);
  --dfNodeSelectedTextColor: rgba(0, 0, 0, 1);
  --dfNodeSelectedBorderSize: 2px;
  --dfNodeSelectedBorderColor: #000000;
  --dfNodeSelectedBorderRadius: 4px;

  --dfNodeSelectedBoxShadowHL: 0px;
  --dfNodeSelectedBoxShadowVL: 2px;
  --dfNodeSelectedBoxShadowBR: 15px;
  --dfNodeSelectedBoxShadowS: 2px;
  --dfNodeSelectedBoxShadowColor: #4ea9ff;

  --dfInputBackgroundColor: #00369c;
  --dfInputBackgroundColorFirst: #3ec92b;
  --dfInputBorderSize: 2px;
  --dfInputBorderColor: #000000;
  --dfInputBorderRadius: 50px;
  --dfInputLeft: -27px;
  --dfInputHeight: 20px;
  --dfInputWidth: 20px;

  --dfInputHoverBackgroundColor: #ffffff;
  --dfInputHoverBorderSize: 2px;
  --dfInputHoverBorderColor: #000000;
  --dfInputHoverBorderRadius: 50px;

  --dfOutputBackgroundColor: #00369c;
  --dfOutputBorderSize: 2px;
  --dfOutputBorderColor: #000000;
  --dfOutputBorderRadius: 50px;
  --dfOutputRight: -3px;
  --dfOutputHeight: 20px;
  --dfOutputWidth: 20px;

  --dfOutputHoverBackgroundColor: #ffffff;
  --dfOutputHoverBorderSize: 2px;
  --dfOutputHoverBorderColor: #000000;
  --dfOutputHoverBorderRadius: 50px;

  --dfLineWidth: 5px;
  --dfLineColor: #4682b4;
  --dfLineHoverColor: #4682b4;
  --dfLineSelectedColor: #43b993;

  --dfRerouteBorderWidth: 2px;
  --dfRerouteBorderColor: #000000;
  --dfRerouteBackgroundColor: #ffffff;

  --dfRerouteHoverBorderWidth: 2px;
  --dfRerouteHoverBorderColor: #000000;
  --dfRerouteHoverBackgroundColor: #ffffff;

  --dfDeleteDisplay: block;
  --dfDeleteColor: #ffffff;
  --dfDeleteBackgroundColor: #000000;
  --dfDeleteBorderSize: 2px;
  --dfDeleteBorderColor: #ffffff;
  --dfDeleteBorderRadius: 50px;
  --dfDeleteTop: -15px;

  --dfDeleteHoverColor: #000000;
  --dfDeleteHoverBackgroundColor: #ffffff;
  --dfDeleteHoverBorderSize: 2px;
  --dfDeleteHoverBorderColor: #000000;
  --dfDeleteHoverBorderRadius: 50px;
}

.parent-drawflow {
  background: var(--dfBackgroundColor);
  background-size: var(--dfBackgroundSize) var(--dfBackgroundSize);
  background-image: var(--dfBackgroundImage);
}

.drawflow .drawflow-node {
  display: var(--dfNodeType);
  background: var(--dfNodeBackgroundColor);
  color: var(--dfNodeTextColor);
  border: var(--dfNodeBorderSize) solid var(--dfNodeBorderColor);
  border-radius: var(--dfNodeBorderRadius);
  min-height: var(--dfNodeMinHeight);
  width: auto;
  min-width: var(--dfNodeMinWidth);
  padding-top: var(--dfNodePaddingTop);
  padding-bottom: var(--dfNodePaddingBottom);
  -webkit-box-shadow: var(--dfNodeBoxShadowHL) var(--dfNodeBoxShadowVL)
    var(--dfNodeBoxShadowBR) var(--dfNodeBoxShadowS) var(--dfNodeBoxShadowColor);
  box-shadow: var(--dfNodeBoxShadowHL) var(--dfNodeBoxShadowVL)
    var(--dfNodeBoxShadowBR) var(--dfNodeBoxShadowS) var(--dfNodeBoxShadowColor);
}

.drawflow .drawflow-node:hover {
  background: var(--dfNodeHoverBackgroundColor);
  color: var(--dfNodeHoverTextColor);
  border: var(--dfNodeHoverBorderSize) solid var(--dfNodeHoverBorderColor);
  border-radius: var(--dfNodeHoverBorderRadius);
  -webkit-box-shadow: var(--dfNodeHoverBoxShadowHL)
    var(--dfNodeHoverBoxShadowVL) var(--dfNodeHoverBoxShadowBR)
    var(--dfNodeHoverBoxShadowS) var(--dfNodeHoverBoxShadowColor);
  box-shadow: var(--dfNodeHoverBoxShadowHL) var(--dfNodeHoverBoxShadowVL)
    var(--dfNodeHoverBoxShadowBR) var(--dfNodeHoverBoxShadowS)
    var(--dfNodeHoverBoxShadowColor);
}

.drawflow .drawflow-node.selected {
  background: var(--dfNodeSelectedBackgroundColor);
  color: var(--dfNodeSelectedTextColor);
  border: var(--dfNodeSelectedBorderSize) solid var(--dfNodeSelectedBorderColor);
  border-radius: var(--dfNodeSelectedBorderRadius);
  -webkit-box-shadow: var(--dfNodeSelectedBoxShadowHL)
    var(--dfNodeSelectedBoxShadowVL) var(--dfNodeSelectedBoxShadowBR)
    var(--dfNodeSelectedBoxShadowS) var(--dfNodeSelectedBoxShadowColor);
  box-shadow: var(--dfNodeSelectedBoxShadowHL) var(--dfNodeSelectedBoxShadowVL)
    var(--dfNodeSelectedBoxShadowBR) var(--dfNodeSelectedBoxShadowS)
    var(--dfNodeSelectedBoxShadowColor);
}

.drawflow .drawflow-node .input {
  left: var(--dfInputLeft);
  background: var(--dfInputBackgroundColor);
  border: var(--dfInputBorderSize) solid var(--dfInputBorderColor);
  border-radius: var(--dfInputBorderRadius);
  height: var(--dfInputHeight);
  width: var(--dfInputWidth);
}
.drawflow .drawflow-node .input:first-child {
  background: var(--dfInputBackgroundColorFirst);
}

.drawflow .drawflow-node .input:hover {
  background: var(--dfInputHoverBackgroundColor);
  border: var(--dfInputHoverBorderSize) solid var(--dfInputHoverBorderColor);
  border-radius: var(--dfInputHoverBorderRadius);
}

.drawflow .drawflow-node .outputs {
  float: var(--dfNodeTypeFloat);
}

.drawflow .drawflow-node .output {
  right: var(--dfOutputRight);
  background: var(--dfOutputBackgroundColor);
  border: var(--dfOutputBorderSize) solid var(--dfOutputBorderColor);
  border-radius: var(--dfOutputBorderRadius);
  height: var(--dfOutputHeight);
  width: var(--dfOutputWidth);
}

.drawflow .drawflow-node .output:hover {
  background: var(--dfOutputHoverBackgroundColor);
  border: var(--dfOutputHoverBorderSize) solid var(--dfOutputHoverBorderColor);
  border-radius: var(--dfOutputHoverBorderRadius);
}

.drawflow .connection .main-path {
  stroke-width: var(--dfLineWidth);
  stroke: var(--dfLineColor);
}

.drawflow .connection .main-path:hover {
  stroke: var(--dfLineHoverColor);
}

.drawflow .connection .main-path.selected {
  stroke: var(--dfLineSelectedColor);
}

.drawflow .connection .point {
  stroke: var(--dfRerouteBorderColor);
  stroke-width: var(--dfRerouteBorderWidth);
  fill: var(--dfRerouteBackgroundColor);
}

.drawflow .connection .point:hover {
  stroke: var(--dfRerouteHoverBorderColor);
  stroke-width: var(--dfRerouteHoverBorderWidth);
  fill: var(--dfRerouteHoverBackgroundColor);
}

.drawflow-delete {
  display: var(--dfDeleteDisplay);
  color: var(--dfDeleteColor);
  background: var(--dfDeleteBackgroundColor);
  border: var(--dfDeleteBorderSize) solid var(--dfDeleteBorderColor);
  border-radius: var(--dfDeleteBorderRadius);
}

.parent-node .drawflow-delete {
  top: var(--dfDeleteTop);
}

.drawflow-delete:hover {
  color: var(--dfDeleteHoverColor);
  background: var(--dfDeleteHoverBackgroundColor);
  border: var(--dfDeleteHoverBorderSize) solid var(--dfDeleteHoverBorderColor);
  border-radius: var(--dfDeleteHoverBorderRadius);
}
</style>