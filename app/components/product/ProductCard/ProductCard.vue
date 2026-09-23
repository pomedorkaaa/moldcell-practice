<script setup lang="ts">
import styles from "./ProductCard.module.scss";
import type { ProductCardProps } from "./ProductCard.types";
import { useFavoriteStore } from "#imports";

const favoriteStore = useFavoriteStore();

const props = defineProps<ProductCardProps>();
const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id));

const emit = defineEmits<{
  (e: "add-to-cart"): void;
  // (e: "add-to-favorites"): void;
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
        type="button"
        aria-label="Add product to favorites"
        @click="favoriteStore.toggleItem(props.product)"
        :class="styles['product-card-actions-like']"
      >
        <Icon
          :name="`my-icon:${!isFavorite ? 'heart' : 'heart-filled'}`"
          mode="svg"
        />
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
        >{{ isInStock ? "In stock" : "Out" }}</span
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
      {{ isInStock ? "Add to cart" : "Out of stock" }}
    </button>
  </div>
</template>
