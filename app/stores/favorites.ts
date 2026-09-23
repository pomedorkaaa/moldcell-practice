import { defineStore } from "pinia";

import type { CatalogProduct } from "#imports";

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    items: [] as CatalogProduct[],
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
    addItem(product: CatalogProduct) {
      if (this.isFavorite(product.id)) return;

      this.items.push(product);
    },

    removeItem(productId: number) {
      this.items = this.items.filter((product) => {
        return product.id !== productId;
      });
    },

    toggleItem(product: CatalogProduct) {
      if (this.isFavorite(product.id)) {
        this.removeItem(product.id);
        return;
      }

      this.addItem(product);
    },

    clearFavorites() {
      this.items = [];
    },
  },
  persist: true,
});
