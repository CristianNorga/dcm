<script setup>
const storeDrawFlow = useDrawFlowStore();
import { element } from '@enums/DrawFlow.enum';

// props
const props = defineProps(['index'])

const select = (event) => {
	storeDrawFlow.click(event, element.Graph, props.index);
};

const graphClassess = computed(() => {
  return {
    'node_in_node-2': true,
    'node_out_node-7': true,
    'output_1': true,
    'input_1': true,
  };
});

const mainPathClasses = computed(() => {
  return {
    'selected': storeDrawFlow.graphs.selected === props.index,
  };
});

const d = computed(() => {
  return ' M 122.5 -56 C 575.5 -56 575.5 113 1028.5  113 ';
});

</script>

<template>
  <svg :class="graphClassess" class="connection" @click="select">
    <path :class="mainPathClasses" class="main-path" :d="storeDrawFlow.graphs.items[props.index].state.pathToDraw"></path>
    <!-- <circle :class="mainPathClasses" class="point" cx="741" cy="202" r="6"></circle> -->
  </svg>
</template>

<style lang="css">
.connection {
  z-index: 0;
  position: absolute;
  overflow: visible !important;
  pointer-events: none;
}
.main-path {
  fill: none;
  pointer-events: all;
  stroke: rgb(var(--color-primary-400));
  stroke-width: 3px;
}
</style>