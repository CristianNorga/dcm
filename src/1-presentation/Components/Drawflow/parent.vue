<script setup>
import { element } from '@enums/DrawFlow.enum';
const storeDrawFlow = useDrawFlowStore();

const drawFlowParent = ref({});
const drag = ref(false);

const click = () => {
  console.log('startDrag');
  drag.value = true;
  storeDrawFlow.click(event, element.Board);
};

const dragEnd = () => {
  console.log('dragEnd');
  drag.value = false;
};

onMounted(() => {
  storeDrawFlow.setDrawFlowParent(drawFlowParent.value);
});

// styles computed
const stylesCP = computed(() => {
  return {
    cursor: drag.value ? 'grabbing' : 'grab',
  };
});
// render: render, no necesary
// container: container and parent: parent are drawFlowParent

</script>

<template>
  <!-- 
  @mousemove="position(this)"
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
    @mousedown="((event) => click(event))"
    @mouseup="dragEnd()"
    :style="stylesCP"
  >
    <div class="drawflow">
      <DrawflowNode v-for="(node, key) in storeDrawFlow.nodes.items" :key="key" />
      <DrawflowGraph v-for="(graph, key) in storeDrawFlow.graphs.items" :key="key" />
    </div>
  </summary>
</template>

<style scoped>
.drawflow-parent {
  background: rgba(255, 255, 255, 1);
  background-size: 20px 20px;
  background-image: linear-gradient(to right, rgba(247, 247, 247, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(247, 247, 247, 1) 1px, transparent 1px);
  width: 100%;
  /* 64px deberia ser dinamico, height del nav */
  height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
}
</style>
