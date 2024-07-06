<template>
  <slot name="header">
  </slot>
  <div>
    <!-- container grid and two children, where firts children is a bar vertical of options -->
    <div class="grid grid-cols-12">
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
