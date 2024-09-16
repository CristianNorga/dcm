<script setup>
import DrawflowNodeBack from './Node/back.vue';
import { element } from '~~/src/application/enums/DrawFlow.enum';
const storeDrawFlow = useDrawFlowStore();

const props = defineProps(
	{
		index: {
			type: String,
			required: true,
		},
	}
);

let componentType;
const index = parseInt(props.index);
const data = ref({});
data.value = storeDrawFlow.nodes.items[props.index].data;

switch (storeDrawFlow.nodes.items[index].type) {
	case 'Back':
	default:
		componentType = DrawflowNodeBack;
		break;
}

const select = (event) => {
	event.stopPropagation();
	storeDrawFlow.click(event, element.Node, props.index);
};

const nodeClasses = computed(() => {
	return {
		selected: storeDrawFlow.nodes.selected === index,
	};
});

const nodeStyless = computed(() => {
  return {
    top: `${storeDrawFlow.nodes.items[index].state.y}px`,
    left: `${storeDrawFlow.nodes.items[index].state.x}px`,
  };
});
</script>

<template>
  <UCard 
	@mousedown="(event)=>select(event)"
	id="node-5"
	:class="nodeClasses"
	class="drawflow-node template"
	:style="nodeStyless"
	:ui="{header: {base: 'cursor-move'}, body: {padding: '', base: 'body'}, rounded: 'rounded-none'}"
	>
    <template #header>
      <!-- grid 2 columns tailwind -->
			<div class="grid grid-cols-2">
				<div class="col-span-1">
					<h5 class="text-lg font-bold">{{data.name}}</h5>
					<h3 class="text-lg font-bold">{{data.namespace}}</h3>
				</div>
				<div class="col-span-1 text-right mt-auto mb-auto">
					<Icon :name="'devicon-plain:'+data.technology" size="25px"/>
				</div>
			</div>
    </template>

		<component :is="componentType" :index="index" />

  </UCard>
</template>

<style scoped lang="scss">
.drawflow-node {
	position: absolute;
	width: 200px;
}
</style>