<script setup lang="ts">
import type { CatalogProduct } from "#shared/types/catalog";

definePageMeta({
  key: (route) => route.path,
});

const route = useRoute();
// console.log(route);

const { data: product } = await useFetch<CatalogProduct>(
  () => `/api/products/${encodeURIComponent(String(route.params.slug))}`,
);

// console.log(product);
</script>

<template>
  <article v-if="product">
    {{ product }}
  </article>
</template>
