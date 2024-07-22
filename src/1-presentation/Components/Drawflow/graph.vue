<script setup>
const storeDrawFlow = useDrawFlowStore();
import { element } from '@enums/DrawFlow.enum';

// props
const props = defineProps(['key'])

const select = (event) => {
	storeDrawFlow.click(event, element.Graph, props.key);
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
    'selected': storeDrawFlow.graphs.selected === props.key,
  };
});

const d = computed(() => {
  return ' M 122.5 -56 C 575.5 -56 575.5 113 1028.5  113 ';
});

</script>

<template>
  <svg :class="graphClassess" class="connection" @click="select">
    <path :class="mainPathClasses" class="main-path" :d="d"></path>
    <circle :class="mainPathClasses" class="point" cx="741" cy="202" r="6"></circle>
  </svg>
</template>