<script>

export default {
	data() {
    return {
			items: [{
				label: 'Getting Started',
				icon: 'i-heroicons-information-circle',
				defaultOpen: true,
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
			}, {
				label: 'Installation',
				icon: 'i-heroicons-arrow-down-tray',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
			}, {
				label: 'Theming',
				icon: 'i-heroicons-eye-dropper',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
			}, {
				label: 'Layouts',
				icon: 'i-heroicons-rectangle-group',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
			}, {
				label: 'Components',
				icon: 'i-heroicons-square-3-stack-3d',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
			}, {
				label: 'Utilities',
				icon: 'i-heroicons-wrench-screwdriver',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
			}]
		}
	}
}
</script>

<template>
	<div ref="el"
		class="relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 shadow col-span-7 row-span-3 flex flex-col hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow duration-200"
	>
		<div
			class="flex-1 flex flex-col overflow-hidden rounded-xl divide-y divide-gray-200 dark:divide-gray-800 bg-white hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-[background-opacity] dark:bg-gray-900/50 dark:lg:bg-gradient-to-b from-gray-700/50 to-gray-950/50"
		>
			<div
				class="gap-x-8 gap-y-4 rounded-xl grid lg:grid-cols-2 lg:items-center flex-1 px-4 py-5 sm:p-6 dark:bg-gray-800/50 dark:lg:bg-gray-900/50 backdrop-blur-lg"
			>
				<div>
					<p
						class="text-gray-900 dark:text-white text-base font-bold truncate"
					>
						Name
					</p>
					<div
						class="text-[15px] text-gray-500 dark:text-gray-400 mt-1"
					>
						owner
						<br>
						applications
					</div>
					

				</div>
			</div>

			<UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
				<template #default="{ item, index, open }">
					<UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
						<template #leading>
							<div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
								<UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
							</div>
						</template>

						<span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

						<template #trailing>
							<div
								class="w-5 h-5 ms-auto transform transition-transform duration-200 bg-green-400 rounded-full link output_1"
								:class="[open && 'opacity-0']">
							</div>
						</template>
					</UButton>
				</template>
			</UAccordion>
		</div>
	</div>
</template>

<style></style>