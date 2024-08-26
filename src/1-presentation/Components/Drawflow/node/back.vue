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
        <DrawflowNodeConnection 
        v-for="(node, key) in storeDrawFlow.nodes.items[props.index].inputs" 
        :key="key" :index="key" :indexNode="index" class="list">
        </DrawflowNodeConnection>
      </div>
    </div>
      <template #default="{ item, index, open }">
        <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
          <template #leading>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-6 h-5 transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
            
          </template>

          <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

          <template #trailing>
            <div class="w-6 h-6 ms-auto rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
            </div>
          </template>
        </UButton>
      </template>
    </UAccordion> -->
  </div>
</template>

<style lang="scss">
.input {
  top: -8px;
  left: -19px;
}
</style>