<script setup>
const storeDrawFlow = useDrawFlowStore();
import { element } from '@enums/DrawFlow.enum';

const props = defineProps(['key']);

const select = (event) => {
	storeDrawFlow.click(event, element.Node, props.key);
};

const nodeClasses = computed(() => {
	return {
		selected: storeDrawFlow.graphs.selected === props.key,
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
	<div class="parent-node" @click="select">
		<div
			id="node-5"
      :class="nodeClasses"
			class="drawflow-node template"
			:style="nodeStyless"
		>
			<div class="inputs"><div class="input input_1"></div></div>
			<div class="drawflow_content_node">
				<div>
					<div class="title-box">
						Template
					</div>
					<div class="box">
						Ger Vars
						<textarea df-template=""></textarea>
						Output template with vars
					</div>
				</div>
			</div>
			<div class="outputs"><div class="output output_1"></div></div>
		</div>
	</div>
</template>
