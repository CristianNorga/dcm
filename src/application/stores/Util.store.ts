import { defineStore } from 'pinia';

export const useUtilsStore = defineStore('utilsStore', {
	state: () => ({
		modal: {
			open: false,
			title: '',
		}
	}),
	actions: {
		openModal(title: string) {
			this.modal.open = true;
			this.modal.title = title;
		},
		closeModal() {
			this.modal.open = false;
		},
	},
});
