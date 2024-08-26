<script setup lang="ts">

const storeDrawFlow = useDrawFlowStore();

const props = defineProps(
  {
    index: {
      type: Number,
      required: true,
    },
  }
);

const name = storeDrawFlow.nodes.items[props.index].data.name;
const namespace = storeDrawFlow.nodes.items[props.index].data.namespace;

// const dataComputed = computed(() => {
//   return storeDrawFlow.nodes.items[props.index] as {
//     data: {
//       name: string;
//       namespace: string;
//     };
//   };
// });

</script>

<template>
  <div>
    <div class="px-4 py-5 sm:p-6">
      datos extra
    </div>
    <div v-if="storeDrawFlow.nodes.items[props.index].data">

    </div>
    <div>
      <div class="flex flex-col w-full relative">
        <DrawflowNodeConnectionInput 
        v-for="(node, key) in storeDrawFlow.nodes.items[props.index].inputs" 
        :key="key" :index="key" :indexNode="index" class="list">
        </DrawflowNodeConnectionInput>
        <DrawflowNodeConnectionOutput
        v-for="(node, key) in storeDrawFlow.nodes.items[props.index].outputs"
        :key="key" :index="key" :indexNode="index" class="list">
        </DrawflowNodeConnectionOutput>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.input {
  top: -8px;
  left: -19px;
}
</style>