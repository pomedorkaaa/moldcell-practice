<script setup lang="ts">
import "normalize.css";
import type { CatalogProduct } from "#shared/types/catalog";
import type { CartItem } from "#shared/types/cart";

import { useFavoriteStore } from "@/stores/favorites";
import { useCartStore } from "@/stores/cart";

const favoritesStore = useFavoriteStore();
const cartStore = useCartStore();

const { data: initialFavorites } = await useFetch<CatalogProduct[]>(
  "/api/favorites",
  {
    key: "initial-favorites",
    default: () => [],
  },
);

const { data: initialCart } = await useFetch<CartItem[]>("/api/cart", {
  key: "initial-cart",
  default: () => [],
});

favoritesStore.setItems(initialFavorites.value);
cartStore.setItems(initialCart.value);

// const cartStore = useCartStore();
// const favoriteStore = useFavoriteStore();
// const { loggedIn } = useUserSession();

// const loadStores = async () => {
//   cartStore.reset();
//   favoriteStore.reset();

//   await Promise.all([
//     cartStore.fetchItems(),
//     favoriteStore.fetchItems(),
//   ]);
// };

// watch(loggedIn, loadStores, { immediate: true });
</script>



<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
