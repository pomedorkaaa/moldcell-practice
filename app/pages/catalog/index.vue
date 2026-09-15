<script setup lang="ts">
import CatalogFilters from "~/components/catalog/CatalogFilters/CatalogFilters.vue";
import CatalogGrid from "~/components/catalog/CatalogGrid/CatalogGrid.vue";
import CatalogToolbar from "~/components/catalog/CatalogToolbar/CatalogToolbar.vue";
import styles from "./CatalogPage.module.scss";
import { mockCatalogProducts } from "~/utils/mock-products";

const catalogProducts = mockCatalogProducts;
</script>

<template>
  <section :class="styles['catalog-page']">
    <div :class="styles['catalog-heading']">
      <div>
        <h1>Catalog</h1>
        <p>36 products</p>
      </div>
    </div>
    <div :class="styles['catalog-layout']">
      <CatalogFilters />
      <div>
        <CatalogToolbar />
        <CatalogGrid :products="catalogProducts" />
      </div>
    </div>
  </section>
</template>
