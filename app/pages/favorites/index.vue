<script setup lang="ts">
import CatalogGrid from "~/components/catalog/CatalogGrid/CatalogGrid.vue";
import styles from "../catalog/CatalogPage.module.scss";
import { mockCatalogProducts } from "~/utils/mock-products";

const favoriteProducts = mockCatalogProducts;
</script>

<template>
  <section :class="styles['favorites-page']">
    <div :class="styles['page-intro']">
      <h1>Favorites</h1>
      <p>Your saved workspace essentials, ready when you are.</p>
    </div>
    <CatalogGrid :products="favoriteProducts" />
  </section>
</template>
