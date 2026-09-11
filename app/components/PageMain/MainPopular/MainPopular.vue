<script setup lang="ts">
import ProductCard from "~/components/product/ProductCard/ProductCard.vue";
import MainSectionHeader from "../MainSectionHeader/MainSectionHeader.vue";
import styles from "./MainPopular.module.scss";
import type { CatalogProduct } from "~~/shared/types/catalog.ts";

const { data: products } = await useFetch<CatalogProduct[]>("/api/products", {
  default: () => [],
});

const popularProductsIds = [1, 9, 15, 20];

const popularProducts = computed(() => {
  return products.value.filter((product) =>
    popularProductsIds.includes(product.id),
  );
});

// console.log(popularProducts);
console.log(products);

const handleAddToCart = (product: CatalogProduct) => {
  console.log("Добавить в корзину: ", product.id);
};

const handleAddToFavorites = (product: CatalogProduct) => {
  console.log("Добавить в избранное: ", product);
};
</script>

<template>
  <div :class="styles['main-popular']">
    <MainSectionHeader
      title="Popular right now"
      desc="Simple, proven gear for everyday setups."
      :link="{ to: '/catalog', label: 'View All' }"
    />
    <section :class="styles['main-popular-products']">
      <ProductCard
        v-for="product in popularProducts"
        :product="product"
        :key="product.id"
        @add-to-cart="handleAddToCart(product)"
        @add-to-favorites="handleAddToFavorites(product)"
      />
    </section>
  </div>
</template>
