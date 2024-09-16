<script setup lang="ts">
const utilDrawFlow = useUtilsStore();
const ResourceStorage = useResourceStore();
import type { Resource, Service } from '../../application/types/resource/base';
// import { ResourceTypes } from '~~/src/application/enums/Resource.enum';
import { ResourceTypes } from '@enums/Resource.enum';

/// list enum in string array
const typeResource  = Object.values(ResourceTypes).map((value) => {
  //return capitalize(value);
  return value.charAt(0).toUpperCase() + value.slice(1);
});

const stateResource = reactive({
  name: '' as string,
  namespace: '' as string,
  type: '' as ResourceTypes,
})

const resources = ref<Resource[]>([])
resources.value = ResourceStorage.getResources();

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

const createResource = () => {
  utilDrawFlow.openModal("Crear Recurso");
}

const saveChanges = () => {
  console.log("saveChanges");
  utilDrawFlow.closeModal();
  ResourceStorage.createResource(stateResource.namespace, stateResource.name, stateResource.type);
}

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
                        icon="i-heroicons-plus"
                        size="sm"
                        color="primary"
                        square
                        variant="solid"
                        :content="false"
                        @click="() => createResource()"
                      >
                      </UButton>
                    </div>
                  </div>
                </li>
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
          <ResourceBase  v-for="(resource, key) in ResourceStorage.getResources()"/>
        </div>
      </template>
    </NuxtLayout>

    <UtilModal>
      <template #default>
        <div class="flex flex-col gap-4">
          <UInput 
            v-model="stateResource.name"
            label="Nombre"
            placeholder="Nombre"
          />
          <UInput 
            v-model="stateResource.namespace"
            label="Namespace"
            placeholder="Namespace"
          />
          <USelectMenu
            v-model="stateResource.type"
            label="Type"
            placeholder="Select a Type..."
            :options="typeResource"
          />
        </div>
      </template>
      <template #footer>
        <UButton 
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="() => saveChanges()"
        >
          Guardar
        </UButton>
      </template>
    </UtilModal>
  </div>
</template>