import { defineStore } from "pinia";

import type { CatalogProduct } from "#shared/types/catalog";

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    items: [] as CatalogProduct[],
    isLoading: false,
    isLoaded: false,
  }),

  getters: {
    totalItems: (state) => {
      return state.items.length;
    },

    isFavorite: (state) => {
      return (productId: number) => {
        return state.items.some((product) => {
          return product.id === productId;
        });
      };
    },
  },

  actions: {
    async fetchItems() {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;

      try {
        const requestFetch = useRequestFetch();
        this.items = await requestFetch<CatalogProduct[]>("/api/favorites");

        this.isLoaded = true;
      } finally {
        this.isLoading = false;
      }
    },

    async addItem(product: CatalogProduct) {
      if (this.isFavorite(product.id)) return;

      await $fetch(`/api/favorites/${product.id}`, {
        method: "POST",
      });

      this.items.push(product);
    },

    async removeItem(productId: number) {
      await $fetch(`/api/favorites/${productId}`, {
        method: "DELETE",
      });

      this.items = this.items.filter((product) => {
        return product.id !== productId;
      });
    },

    async toggleItem(product: CatalogProduct) {
      if (this.isFavorite(product.id)) {
        await this.removeItem(product.id);
        return;
      }

      await this.addItem(product);
    },

    async clearFavorites() {
      await $fetch("/api/favorites", {
        method: "DELETE",
      });

      this.items = [];
    },

    reset() {
      this.items = [];
      this.isLoaded = false;
    },

    setItems(items: CatalogProduct[]) {
      this.items = items;
      this.isLoaded = true;
    },
  },
  // persist: true,
});
