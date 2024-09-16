<script setup lang="ts">
import { connection, element } from '~~/src/application/enums/DrawFlow.enum';
const storeDrawFlow = useDrawFlowStore();

const props = defineProps({
  index: {
    type: String,
    required: true,
  },
  indexNode: {
    type: Number,
    required: true,
  },
});

let name = (props.index.split('.')[props.index.split('.').length - 1]);
name = name[0].toUpperCase() + name.slice(1);


let QuantityKeys = props.index.split('.').length;

if(QuantityKeys > 6){
  console.error(`The maximum number of keys is 6, and the node #${props.indexNode} in the input #${props.index} has ${QuantityKeys}`);
}

let buttonClasses = ` z-${50 - (QuantityKeys-1) * 10} `;

const SwitchCrumb = (event: any) => {
  event.stopPropagation();

  storeDrawFlow.switchCrumbConnection(props.indexNode, props.index, connection.Inputs);
};

const click = (event: any) => {
  event.stopPropagation();

  // storeDrawFlow.startConnection(event, element.Output, props.indexNode, props.index);
};

const MouseUp = (event: any) => {
  event.stopPropagation();
  storeDrawFlow.endConnection(event, connection.Outputs, props.indexNode, props.index);
};

const iconArrowClasses = computed(() => {
  return {
    'rotate-90': storeDrawFlow.nodes.items[props.indexNode].inputs[props.index].open,
  };
});

const positionStyles = computed(() => {
  return {
    top: `${0}px`,
    left: `${0}px`,
  };
});

</script>

<template>
	<button
    v-if="storeDrawFlow.nodes.items[props.indexNode].inputs[props.index].show"
		type="button"
		class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-none text-sm gap-x-1.5 p-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center border-b border-gray-200 dark:border-gray-700 overflow-hidden dark:bg-gray-900 w-full"
    :class="buttonClasses"
    @click="(event: any)=>SwitchCrumb(event)"
    :style="positionStyles"
	>
		<div class="relative">
      <div v-show="storeDrawFlow.nodes.items[props.indexNode].inputs[props.index].type !== connection.Crumb || !storeDrawFlow.nodes.items[props.indexNode].inputs[props.index].open"
      class="connection-circle--input absolute w-5 h-5 border-2 border-primary-500 dark:border-primary-400 rounded-full focus:bg-primary-500 dark:hover:bg-primary-400"
      @mousedown="(event: any)=>click(event)"
      @mouseup="(event: any)=>MouseUp(event)"
      >
      </div>
    </div>
		<span class="truncate">{{name}}</span
		><span v-if="storeDrawFlow.nodes.items[props.indexNode].inputs[props.index].type === connection.Crumb"
			class="i-heroicons-chevron-right-20-solid w-5 h-5 ms-auto transform transition-transform duration-200" :class="iconArrowClasses"
		></span>
	</button>
</template>

<style>
.connection-circle--input {
  top: -10px;
  left: -21px;
  cursor: crosshair !important;
  z-index: 100;
}
</style>
