import { defineStore } from "pinia";

import type { CatalogProduct } from "#imports";
import type { CartItem } from "#imports";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
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
    addItem(product: CatalogProduct, quantity = 1) {
      if (product.stock <= 0) {
        return;
      }

      const existingItem = this.items.find((item) => {
        return item.product.id === product.id;
      });

      if (existingItem) {
        existingItem.product = product;

        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          product.stock,
        );

        return;
      }

      this.items.push({
        product,
        quantity: Math.min(quantity, product.stock),
      });
    },

    decrementItem(productId: number) {
      const item = this.items.find((item) => {
        return item.product.id === productId;
      });

      if (!item) return;

      if (item.quantity === 1) {
        this.removeItem(productId);
        return;
      }

      item.quantity -= 1;
    },

    removeItem(productId: number) {
      this.items = this.items.filter((item) => {
        return item.product.id !== productId;
      });
    },

    setQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => {
        return item.product.id === productId;
      });

      if (!item) return;

      item.quantity = Math.max(1, Math.min(quantity, item.product.stock));
    },

    clearCart() {
      this.items = [];
    },
  },
  persist: true,
});
