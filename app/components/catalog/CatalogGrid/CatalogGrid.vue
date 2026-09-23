<script setup lang="ts">
import type { CatalogProduct } from "#shared/types/catalog";
import ProductCard from "~/components/product/ProductCard/ProductCard.vue";
import styles from "./CatalogGrid.module.scss";

defineProps<{ products: CatalogProduct[] }>();

const noop = () => undefined;
</script>

<template>
  <div :class="styles.grid">
    <ProductCard
      v-for="(product, index) in products"
      :key="`${product.slug}-${index}`"
      :product="product"
      @add-to-cart="noop"
      @add-to-favorites="noop"
    />
  </div>
</template>
