<template>
  <slot name="header">
  </slot>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <!-- container grid and two children, where firts children is a bar vertical of options -->
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2">
        <slot name="options">
        </slot>
      </div> 
      <div class="col-span-10">
        <slot name="content">
        </slot>
      </div>
    </div>
  </div>
</template>

<style>
body {
	background-color: #0f172a;
}
</style>
