<script setup lang="ts">
const utilDrawFlow = useUtilsStore();
</script>

<template>
  <Teleport to="#teleports">
    <div>
      <UModal v-model="utilDrawFlow.modal.open">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            {{ utilDrawFlow.modal.title }}
          </template>
          
          <slot name="default">
          </slot>
          
          <template #footer>
            <slot name="footer">
            </slot>
          </template>
        </UCard>
      </UModal>
    </div>
  </Teleport>
</template>