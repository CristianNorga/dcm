<script setup>
import { element } from '@enums/DrawFlow.enum';
const storeDrawFlow = useDrawFlowStore();

const props = defineProps(
	{
		index: {
			type: String,
			required: true,
		},
	}
);

const index = parseInt(props.index);
const data = ref({})

if (storeDrawFlow.nodes.items[index].type === 'service') {
	data.value = storeDrawFlow.nodes.items[props.index].data;
}


const select = (event) => {
	storeDrawFlow.click(event, element.Node, props.key);
};

const nodeClasses = computed(() => {
	return {
		selected: storeDrawFlow.nodes.selected === props.key,
	};
});

const nodeStyless = computed(() => {
  return {
    top: '304px',
    left: '607px',
  };
});
</script>

<template>
  <UCard 
	@click="select"
	id="node-5"
	:class="nodeClasses"
	class="drawflow-node template"
	:style="nodeStyless">
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

  </UCard>
</template>

<style scoped lang="css">
.drawflow-node {
	position: absolute;
	width: 200px;
}
</style>