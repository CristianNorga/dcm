<script setup>
import { element } from '@enums/DrawFlow.enum';
const storeDrawFlow = useDrawFlowStore();
// render: render, no necesary
// container: container and parent: parent are drawFlowParent

const drawFlowParent = ref(null);

const click = (event) => {
  event.preventDefault();

  storeDrawFlow.click(event, element.Board);
};

</script>

<template>
  <summary 
    ref="drawFlowParent" 
    class="drawflow-parent"
    tabindex="0"
    @mouseup="dragEnd(this)"
    @mousemove="position(this)"
    @mousedown="click(this)"
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
    @pointerout="pointerout_handler(this)"
  >
    <div class="drawflow">
      <DrawflowNode v-for="(node, key) in storeDrawFlow.nodes" :key="key" />
      <DrawflowGraph v-for="(graph, key) in storeDrawFlow.graphs" :key="key" />
    </div>
  </summary>
</template>

<style scoped>
.drawflow-parent {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
