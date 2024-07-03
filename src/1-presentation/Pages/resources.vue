<script setup lang="ts">

const typeDisplay = [{
  key: 'list',
  label: 'list',
  icon: 'i-heroicons-bars-3-16-solid'
}, {
  key: 'block',
  label: 'block',
  icon: 'i-heroicons-squares-2x2-20-solid'
}]

const items = [[{
    label: 'Name',
    click: () => {
      console.log('Edit')
    }
  }, {
    label: 'Infrastructure',
  }]
]

const selectedResource = ref('Service')

const optionsFilter = [{
  label: 'Basico',
  defaultOpen: true,
  slot: 'basic'
}, {
  label: 'Seguridad',
  defaultOpen: false,
  slot: 'security'
}, {
  label: 'Soluciones TI',
  defaultOpen: false,
  slot: 'solutionsTI'
}, {
  label: 'Servicios TI',
  defaultOpen: false,
  slot: 'servicesTI'
}, {
  label: 'Inputs',
  defaultOpen: false,
  slot: 'inputs'
}, {
  label: 'Outputs',
  defaultOpen: false,
  slot: 'outputs'
}]

const options = [{
  label: 'Name',
  value: 'name'
}, {
  label: 'Owner',
  value: 'owner'
}, {
  label: 'Infrastructure',
  value: 'infrastructure'
}, {
  label: 'Location',
  value: 'location'
}]
</script>

<template>
  <div>
  <NuxtLayout name="focus">
    <template #header>
      <HeaderBasic>
        <template #items>
            <ul class="items-center gap-x-8 hidden lg:flex">
              <li class="relative">
                <div class="relative">
                  <div class="inline-flex w-full" role="button">
                    <UButton 
                      :ui="{ rounded: 'rounded-full' }"
                      icon="i-heroicons-arrow-path-16-solid"
                      size="sm"
                      color="primary"
                      square
                      variant="solid"
                      :content="false"
                    >
                    </UButton>
                  </div>
                </div>
              </li>
              <li class="relative">
                <div class="relative">
                  <div class="inline-flex w-full" role="button">
                    <UTabs 
                    :items="typeDisplay" 
                    class="w-full"
                    :ui="{ container: 'relative hidden' }">
                      <template #default="{ item, index, selected }">
                        <div class="flex items-center gap-2 relative truncate">
                          <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
                          <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                        </div>
                      </template>
                    </UTabs>
                  </div>
                </div>
              </li>
              <li class="relative">
                <div class="relative">
                  <div class="inline-flex w-full" role="button">
                    <UDropdown :items="options" :popper="{ placement: 'bottom-start' }">
                      <UButton color="white" label="Order By" trailing-icon="i-heroicons-chevron-down-20-solid" />
                    </UDropdown>
                  </div>
                </div>
              </li>
            </ul>
        </template>
      </HeaderBasic>
    </template>
    <template #options>
      <div class="flex flex-col pt-6">
        <div class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5">Recursos</div>
        <USelectMenu
          clear-search-on-close
          class="w-full lg:w-48"
          placeholder="Select a Resoruce..."
          searchable
          searchable-placeholder="Search a person..."
          :options="['Service', 'IA', 'DataBase']"
          v-model="selectedResource"
        />
        <div class="mt-4">
          <UAccordion
            color="black"
            variant="ghost"
            size="sm"
            multiple
            :items="optionsFilter"
          >
            <template #basic>
              <div class="py-1  ml-3 flex flex-col border-l -ml-px pl-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-gray-700 hover:border-gray-500 dark:hover:border-gray-400 ">
                <div class="flex justify-between items-center gap-1.5 group">
                  <UCheckbox label="Nombre" :model-value="true" disabled />
                  <UButton 
                    :ui="{ base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0', }"
                    icon="i-heroicons-magnifying-glass-solid"
                    size="2xs"
                    color="primary"
                    square
                    variant="soft"
                    :content="false"
                  >
                  </UButton>
                </div>
                <div class="pt-2">
                  <UInput color="gray" variant="outline" placeholder="Search..." />
                </div>
              </div>

              <div class="py-1 flex justify-between items-center gap-1.5 group border-l -ml-px pl-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-gray-700 hover:border-gray-500 dark:hover:border-gray-400 ml-3">
                <UCheckbox label="Owner" :model-value="true" />
              </div>
              
              <div class="py-1 flex justify-between items-center gap-1.5 group border-l -ml-px pl-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-gray-700 hover:border-gray-500 dark:hover:border-gray-400 ml-3">
                <UCheckbox label="Infraestructura" :model-value="true" />
              </div>

              <div class="py-1 flex justify-between items-center gap-1.5 group border-l -ml-px pl-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-gray-700 hover:border-gray-500 dark:hover:border-gray-400 ml-3">
                <UCheckbox label="Ubicacón" :model-value="true" />
              </div>
            </template>

            <template #security>
              <div class="text-gray-900 dark:text-white text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Fully styled and customizable components for Nuxt.
                  
                </p>
              </div>
            </template>

            <template #solutionsTI>
              <div class="text-gray-900 dark:text-white text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Fully styled and customizable components for Nuxt.
                </p>
              </div>
            </template>

            <template #servicesTI>
              <div class="text-gray-900 dark:text-white text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Fully styled and customizable components for Nuxt.
                </p>
              </div>
            </template>

            <template #inputs>
              <div class="text-gray-900 dark:text-white text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Fully styled and customizable components for Nuxt.
                </p>
              </div>
            </template>

            <template #outputs>
              <div class="text-gray-900 dark:text-white text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Fully styled and customizable components for Nuxt.
                </p>
              </div>
            </template>

          </UAccordion>
        </div>
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-4 mt-6">
        <div class="col-span-4">

          <!-- relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 shadow col-span-7 row-span-3 flex flex-col hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow duration-200 -->
          <UCard :ui="{base: 'relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 shadow col-span-7 row-span-3 flex flex-col hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow duration-200'}">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-cube-16-solid" class="w-6 h-6" />
                <div class="flex flex-col">
                  <div class="text-sm/6 font-semibold text-gray-500 dark:text-gray-400">Soluciones</div>
                  <div class="text-xs/6 text-gray-400 dark:text-gray-500">Bot</div>
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
          </UCard>
        </div>
      </div>
    </template>
  </NuxtLayout>
  </div>
</template>