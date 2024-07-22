<script>
export default {
  data() {
    return {
      
    }
  },
  async mounted() {
    
  },
  methods: {
  },
}
</script>

<template>
  <div>
  <NuxtLayout name="expanded">
    <template #header>
      <HeaderBasic>
        <template #items>
            <ul class="items-center gap-x-8 hidden lg:flex">
              
            </ul>
        </template>
      </HeaderBasic>
    </template>
    <template #options>
      <div class="board-options flex flex-col pt-6 bg-slate-800">
        
      </div>
    </template>
    <template #content>
      <DrawflowParent />
    </template>
  </NuxtLayout>
  </div>
</template>
