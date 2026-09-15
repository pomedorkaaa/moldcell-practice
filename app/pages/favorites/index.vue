<script setup lang="ts">
import CatalogGrid from "~/components/catalog/CatalogGrid/CatalogGrid.vue";
import styles from "../catalog/CatalogPage.module.scss";
import { mockCatalogProducts } from "~/utils/mock-products";

const favoriteProducts = mockCatalogProducts;
</script>

<template>
  <section :class="styles['favorites-page']">
    <div :class="styles['catalog-heading']">
      <h1>Favorites</h1>
      <p>3 products</p>
    </div>
    <CatalogGrid :products="favoriteProducts" />
  </section>
</template>
