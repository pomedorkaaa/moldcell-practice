import { defineStore } from "pinia";

import type { CatalogProduct } from "#shared/types/catalog";
import type { CartItem } from "#shared/types/cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
    isLoading: false,
    isLoaded: false,
  }),

  getters: { 
    totalItems: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },

    getQuantity: (state) => {
      return (productId: number) => {
        return (
          state.items.find((item) => item.product.id === productId)?.quantity ??
          0
        );
      };
    },
  },

  actions: {
    async fetchItems() {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        // const requestFetch = useRequestFetch();
        this.items = await $fetch<CartItem[]>("/api/cart");
        this.isLoaded = true;
      } finally {
        this.isLoading = false;
      }
    },

    async addItem(product: CatalogProduct, quantity = 1) {
      if (product.stock <= 0) {
        return;
      }
      
      const existingItem = this.items.find((item) => {
        return item.product.id === product.id;
      });
      
      if (existingItem) {
        const availableQuantity = product.stock - existingItem.quantity;
        const quantityToAdd = Math.min(quantity, Math.max(availableQuantity, 0));

        if (quantityToAdd <= 0) {
          return;
        }

        await $fetch(`/api/cart/${product.id}`, {
          method: "PATCH",
          body: {
            delta: quantityToAdd,
          },
        });

        existingItem.quantity = Math.min(
          existingItem.quantity + quantityToAdd,
          product.stock,
        );
        existingItem.product = product;

        return;
      }

      await $fetch(`/api/cart/${product.id}`, {
        method: "POST",
        body: {
          quantity: Math.min(quantity, product.stock),
        },
      });

      this.items.push({
        product,
        quantity: Math.min(quantity, product.stock),
      });
    },

    async decrementItem(productId: number) {
      const item = this.items.find((item) => {
        return item.product.id === productId;
      });

      if (!item) return;

      if (item.quantity === 1) {
        await this.removeItem(productId);
        return;
      }

      await $fetch(`/api/cart/${productId}`, {
        method: "PATCH",
        body: {
          delta: -1,
        },
      });

      item.quantity -= 1;
    },

    async removeItem(productId: number) {
      await $fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      });

      this.items = this.items.filter((item) => {
        return item.product.id !== productId;
      });
    },

    async setQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => {
        return item.product.id === productId;
      });

      if (!item) return;

      const nextQuantity = Math.max(1, Math.min(quantity, item.product.stock));

      await $fetch(`/api/cart/${productId}`, {
        method: "PUT",
        body: {
          quantity: nextQuantity,
        },
      });

      item.quantity = nextQuantity;
    },

    async clearCart() {
      await $fetch("/api/cart", {
        method: "DELETE",
      });

      this.items = [];
    },

    reset() {
      this.items = [];
      this.isLoaded = false;
    },

    setItems(items: CartItem[]) {
      this.items = items;
      this.isLoaded = true;
    }
  },
  // persist: true,
});
