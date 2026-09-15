<script setup lang="ts">
import CatalogGrid from "~/components/catalog/CatalogGrid/CatalogGrid.vue";
import CatalogToolbar from "~/components/catalog/CatalogToolbar/CatalogToolbar.vue";
import styles from "./CatalogPage.module.scss";
import { mockCatalogProducts } from "~/utils/mock-products";

const catalogProducts = mockCatalogProducts;
</script>

<template>
  <section :class="styles['catalog-page']">
    <div :class="styles['page-intro']">
      <h1>Catalog</h1>
      <p>Thoughtfully selected tech for a calmer, more capable workspace.</p>
    </div>
    <CatalogToolbar />
    <CatalogGrid :products="catalogProducts" />
  </section>
</template>
