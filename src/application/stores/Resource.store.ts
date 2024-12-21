import { defineStore } from 'pinia';
import type { Resource, Service } from '../types/resource/base';
import { ResourceTypes } from '../enums/Resource.enum';

export const useResourceStore = defineStore('ResourceStore', {
	state: () => ({
		origin: [] as Resource[] | Service[],
		lastUpdated: null as Date | null,
		loading: false,
	}),
	actions: {
		async createResource(namespace: string, name: string, type: ResourceTypes) {
			console.log('Resource createResource');
			const resource: Resource = {
				id: `${namespace.toLowerCase()}.${name.toLowerCase()}`,
				namespace: namespace,
				name: name,
				type: type,
			};
			this.origin = [resource, ...this.origin.slice()];

			// const response = (await $fetch('/api/resources/create', {
			//   method: 'POST',
			//   body: {
			//     resource,
			//   },
			// })) as Response;

			// if (response.status !== 200) {
			//   throw new Error('Failed to create resource');
			// }
		},
		async loadResources() {
			console.log('Resource loadResources');
			this.loading = true;
			this.lastUpdated = new Date();
			const response = (await $fetch('/api/resource', {
				method: 'GET',
			})) as Resource[];

			if (response.length === 0) {
				this.origin = [];
			} else {
				this.origin = response;
			}
			this.loading = false;
		},
		getResources(): Resource[] | Service[] {
      console.log('Resource getResources');
      if (this.lastUpdated === null || this.lastUpdated < new Date(Date.now() - 8000)) {
        this.loadResources();
      }
      return this.origin;
    },
	}
});
