<script setup>

</script>

<template>
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
</template>

<style scoped lang="scss">

</style>