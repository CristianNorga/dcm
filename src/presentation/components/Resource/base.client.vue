<script setup lang="ts">
import { InfraestructureTypes  } from '@enums/Resource.enum';
import type { Service } from '_types/resource/base';

const { resourcekey } = defineProps(['resourcekey']);
const ResourceStorage = useResourceStore();
const resource = ResourceStorage.getResourceByKey(resourcekey) as Service;

const uiCard = {
  base: 'relative group isolate rounded-xl flex-1 shadow row-span-3 flex flex-col',
  background: 'bg-transparent dark:bg-transparent',
  ring: 'ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400',
  header: {
    background: 'bg-gray-900 rounded-t-lg',
  }
};

const icon = {
  infraestructure: {
    cloud: 'fluent:cloud-16-filled',
    hybrid: 'fluent:building-cloud-24-filled',
    'on-premise': 'fluent:building-20-filled',
  } as Record<InfraestructureTypes, string>,
};

// example resource object
// {
//   id: '123',
//   type: 'service',✔
//   namespace: 'space1',✔
//   name: 'service-a',✔
//   owner: ['group1', 'team1', 'leader1', 'groupleader1'],✔
//   infrastructure: 'cloud',
//   tags: ['tag1', 'tag2', 'tag3'],
//   dynamic: {
//      coverage: 'active',
//   },
// }

</script>

<template>
  <UCard :ui="uiCard" v-if="resource">
    <template #header>
      <div class="flex items-center justify-between gap-2">

        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center w-10 h-10 rounded-md bg-primary-500 dark:bg-primary-400">
            <Icon name="heroicons:cube-16-solid" class="w-6 h-6" />
          </div>
          <div class="flex flex-col">
            <div class="text-sm/6 font-semibold text-gray-500 dark:text-gray-400">
              Bot
              <span class="text-xs/6 text-gray-400 dark:text-gray-500">(space1)</span>
            </div>
            <div class="text-xs/6 text-gray-400 dark:text-gray-500">Service</div>
          </div>
        </div>

        <div class="relative">
          <div class="inline-flex w-full" role="button">
            <UButton 
            :ui="{ base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0', }"
            icon="i-heroicons-cog-6-tooth"
            size="2xs"
            color="primary"
            square
            variant="soft"
            :content="false"
            >
            </UButton>
          </div>
        </div>
      </div>
      
    </template>

    <!-- owner -->
    <UDivider
    label="Basic Information"
    :ui="{ label: 'text-primary-500 dark:text-primary-400' }"
    />
    <div class="flex flex-wrap items-center gap-2">
      <div class="text-xs/6 text-gray-400 dark:text-gray-500">Owner</div>
      <div class="owner grow flex flex-wrap">
        <span v-for="(owner, index) in resource.owner" :key="index">
          {{ owner }}
        </span>
      </div>
    </div>

    <!-- infrastructure -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="text-xs/6 text-gray-400 dark:text-gray-500">Infrastructure</div>
      <div class="text-xs/6 text-gray-400 dark:text-gray-500">
        <Icon :name="icon.infraestructure[resource.infrastructure]" class="w-6 h-6" />
      </div>
    </div>

    <!-- tags -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="text-xs/6 text-gray-400 dark:text-gray-500">Tags</div>
      <div class="flex flex-wrap gap-1">
        <span v-for="(tag, index) in resource.tags" :key="index" class="text-xs/6 text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 rounded-md px-2 py-1">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- dynamic -->
    <div class="flex flex-col flex-wrap items-start gap-2">
      <div class="text-xs/6 text-gray-400 dark:text-gray-500">Dynamic</div>
      <!-- key value -->
      <div class="flex flex-wrap gap-2" v-for="(value, key) in resource.dynamic" :key="key">
        <div class="text-xs/6 text-gray-400 dark:text-gray-500">{{ key }}:</div>
        <div class="text-xs/6 text-gray-400 dark:text-gray-500">{{ value }}</div>
      </div>
    </div>

  </UCard>
  <UCard v-else>
    <div class="flex items-center justify-center h-full">
      <div class="text-gray-400 dark:text-gray-500">Resource not found</div>
    </div>
  </UCard>

</template>

<style scoped lang="scss">
.owner {
  // add ">" for each item
  > span {
    text-wrap: none;
    &:not(:last-child):after {
      content: '>';
      margin: 0 0.5rem;
    }
  }
}
</style>