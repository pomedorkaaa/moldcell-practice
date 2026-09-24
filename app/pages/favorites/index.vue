<script setup lang="ts">
import CatalogGrid from "~/components/catalog/CatalogGrid/CatalogGrid.vue";
import styles from "../catalog/CatalogPage.module.scss";
// import { mockCatalogProducts } from "~/utils/mock-products";
import { useFavoriteStore } from "../../stores/favorites";

// const favoriteProducts = mockCatalogProducts;
const favoriteStore = useFavoriteStore();

const products = computed(() => favoriteStore.items);
const totalItems = computed(() => favoriteStore.totalItems);
</script>

<template>
  <section :class="styles['favorites-page']">
    <div :class="styles['catalog-heading']">
      <h1>Favorites</h1>
      <p>{{ totalItems }} products</p>
    </div>
    <CatalogGrid :products="products" />
  </section>
</template>
