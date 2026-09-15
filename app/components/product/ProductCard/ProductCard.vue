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
    <!-- бренд/категория -->
    <p :class="styles['product-card-catalog']">
      {{ product.brand?.name }}/{{ product.category?.name }}
      <!-- в стоке -->
      <span
        :class="[
          styles['product-card-stock'],
          !isInStock ? [styles['product-card-stock--empty']] : '',
        ]"
        ><Icon name="fluent-mdl2:location-dot" />{{
          isInStock ? "In stock" : "Out"
        }}</span
      >
    </p>
    <!-- название -->
    <NuxtLink
      :to="`/products/${product.slug}`"
      :class="styles['product-card-name']"
    >
      {{ product.name }}
    </NuxtLink>

    <!-- цены -->
    <div :class="styles['product-card-prices']">
      <!-- новая -->
      <span :class="styles['product-card-prices-current']">
        ${{ product.price }}
      </span>
      <!-- старая -->
      <span v-if="discountPercent" :class="styles['product-card-prices-old']">
        ${{ product.oldPrice }}
      </span>
    </div>
    <!-- добавить в корзину -->
    <button
      type="button"
      @click="emit('add-to-cart')"
      :class="styles['product-card-button']"
      :disabled="!isInStock"
    >
      {{ isInStock ? "Add To Cart" : "Out of stock" }}
    </button>
  </div>
</template>
