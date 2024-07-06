<script setup lang="ts">
const router = useRouter();

</script>

<template>
	<header
		class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0"
	>
		<div
			class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]"
		>
			<div class="lg:flex-1 flex items-center gap-1.5 h-16 ">
				<div
					class="relative inline-flex text-left rtl:text-right"
				>
					<div
						class="inline-flex w-full"
						role="button"
					>
						<a href="/" class="flex gap-2 items-center"
							>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#00dc82" d="M8 4v4H4V4zM2 2v8h8V2zm16 5v4h-4V7zm-6-2v8h8V5zM8 16v4H4v-4zm-6-2v8h8v-8z"/><path fill="#00dc82" d="M22 10v6h-6v6h-6v8h20V10Zm-4 8h4v4h-4Zm-2 10h-4v-4h4Zm6 0h-4v-4h4Zm6 0h-4v-4h4Zm0-6h-4v-4h4Zm-4-6v-4h4v4Z"/></svg>
              <span class="text-3xl font-semibold text-white">DCM</span>
							<div class="relative inline-flex">
								<span
									class="inline-flex items-center text-xs px-1.5 py-0.5 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 -mb-[2px] rounded font-semibold"
									>
									v1.0</span
								>
							</div></a
						>
					</div>
				</div>
			</div>
			<slot name="items">
				<ul class="items-center gap-x-8 hidden lg:flex">
					<li class="relative">
						<div class="relative">
							<div
								class="inline-flex w-full"
								role="button"
							>
								<button @click="router.push('/resources')" class="text-sm/6 font-semibold flex items-center gap-1 text-primary">
									Recursos
								</button>
							</div>
						</div>
					</li>
					<li class="relative">
						<div class="relative">
							<div
								class="inline-flex w-full"
								role="button"
							>
								<button @click="router.push('/boards')" class="text-sm/6 font-semibold flex items-center gap-1 text-primary">
									Tableros
								</button>
							</div>
						</div>
					</li>
					<li class="relative">
						<div class="relative">
							<div
								class="inline-flex w-full"
								role="button"
							>
								<button class="text-sm/6 font-semibold flex items-center gap-1 text-primary">
									Migraciones
								</button>
							</div>
						</div>
					</li>
				</ul>
			</slot>
		</div>
	</header>
</template>
