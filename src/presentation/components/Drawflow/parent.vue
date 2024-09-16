<script setup>
import { element } from '~~/src/application/enums/DrawFlow.enum';
const storeDrawFlow = useDrawFlowStore();

const drawFlowParent = ref({});

const click = (event) => {
  storeDrawFlow.click(event, element.Board);
};

const position = (event) => {
  storeDrawFlow.position(event);
};

const dragEnd = (event) => {
  storeDrawFlow.dragEnd(event);
  storeDrawFlow.endConnection(event);
};

onMounted(() => {
  storeDrawFlow.setDrawFlowParent(drawFlowParent.value);
  storeDrawFlow.loadDataExample();
});

const stylesDrawCP = computed(() => {
  return {
    transform: `scale(${storeDrawFlow.boards.scale}) translate(${storeDrawFlow.boards.x}px, ${storeDrawFlow.boards.y}px)`,
  };
});
// render: render, no necesary
// container: container and parent: parent are drawFlowParent

</script>

<template>
  <!-- 
  
  @touchend="dragEnd(this)"
  @touchmove="position(this)"
  @touchstart="click(this)"
  @contextmenu="contextmenu(this)"
  @keydown="key(this)"
  @wheel="zoom_enter(this)"
  @input="input(this)"
  @dblclick="dblclick(this)"
  @pointerdown="pointerdown_handler(this)"
  @pointerup="pointerup_handler(this)"
  @pointermove="pointermove_handler(this)"
  @pointercancel="pointercancel_handler(this)"
  @pointerleave="pointerleave_handler(this)"
  @pointerout="pointerout_handler(this)" -->
  <summary 
    ref="drawFlowParent" 
    class="drawflow-parent"
    tabindex="0"
    @mousemove="((event) => position(event))"
    @mousedown="((event) => click(event))"
    @mouseup="((event) => dragEnd(event))"
  >
    <div class="drawflow" :style="stylesDrawCP">
      <DrawflowNode v-for="(node, key) in storeDrawFlow.nodes.items" :key="key" :index="key" />
      <DrawflowGraph v-for="(graph, key) in storeDrawFlow.graphs.items" :key="key" :index="key" />
    </div>
  </summary>
</template>

<style scoped lang="scss">
.drawflow-parent {
  background: rgba(255, 255, 255, 1);
  background-size: 20px 20px;
  background-image: linear-gradient(to right, rgba(247, 247, 247, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(247, 247, 247, 1) 1px, transparent 1px);
  width: 100%;
  /* 64px deberia ser dinamico, height del nav */
  height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  .connection-circle--input {
    cursor: crosshair;
    &:active {
      cursor: crosshair;
    }
  }
}
</style>
