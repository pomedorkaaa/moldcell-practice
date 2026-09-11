<script setup lang="ts">
import styles from "./ProductCard.module.scss";
import type { ProductCardProps } from "./ProductCard.types";
const props = defineProps<ProductCardProps>();

const emit = defineEmits<{
  (e: "add-to-cart"): void;
  (e: "add-to-favorites"): void;
}>();

const discountPercent = computed(() => {
  const { price, oldPrice } = props.product;
  if (oldPrice === null || oldPrice <= 0 || oldPrice <= price) {
    return 0;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
});

const isInStock = computed(() => {
  return props.product.stock > 0;
});
</script>

<template>
  <div :class="styles['product-card']">
    <div :class="styles['product-card-actions']">
      <NuxtLink :to="`/products/${product.slug}`">
        <img
          :src="product.images[0]"
          :alt="product.name"
          :class="styles['product-card-actions-image']"
        />
      </NuxtLink>
      <!-- скидка -->
      <span
        v-if="discountPercent"
        :class="styles['product-card-actions-discount']"
      >
        -{{ discountPercent }}%
      </span>
      <!-- избранное -->
      <button
        @click="emit('add-to-favorites')"
        :class="styles['product-card-actions-like']"
      >
        <Icon name="my-icon:heart" />
      </button>
    </div>
    <!-- категория -->
    <p :class="styles['product-card-category']">{{ product.category }}</p>
    <!-- название -->
    <NuxtLink :to="`/products/${product.slug}`">{{ product.name }}</NuxtLink>
    <!-- в стоке -->
    <span
      :class="[
        styles['product-card-stock'],
        !isInStock ? [styles['product-card-stock--empty']] : '',
      ]"
      >{{ isInStock ? "In stock" : "Out of Stock" }}</span
    >
    <div>
      <!-- цены -->
      <!-- новая -->
      <span>{{ product.price }}</span>
      <!-- старая -->
      <span>{{ product.oldPrice }}</span>
    </div>
    <!-- добавить в корзину -->
    <button type="button" @click="emit('add-to-cart')" :disabled="!isInStock">
      {{ isInStock ? "Add To Cart" : "Out of stock" }}
    </button>
  </div>
</template>
