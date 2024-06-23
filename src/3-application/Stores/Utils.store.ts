import { defineStore } from 'pinia';

export const useUtilsStore = defineStore('utilsStore', {
	state: () => ({
		isModalOpen: false,
	}),
	actions: {
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
		},
	},
});
