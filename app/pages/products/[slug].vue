<script setup lang="ts">
import styles from "./ProductPage.module.scss";
import { mockProduct } from "~/utils/mock-products";
import type { CatalogProduct } from "#shared/types/catalog";
import { useCartStore } from "@/stores/cart.ts";
import { useFavoriteStore } from "../../stores/favorites";

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const route = useRoute();
const slug = route.params.slug;

const handleAddToCart = (item: CatalogProduct, quantity: number) => {
  cartStore.addItem(item, quantity);
};

const { data: product, error: productError } = await useFetch<CatalogProduct>(
  `/api/products/${slug}`,
);

if (productError.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
    fatal: true,
  });
}
const isFavorite = computed(() =>
  favoriteStore.isFavorite(Number(product.value?.id)),
);

// const product = mockProduct;
const selectedImage = ref(product.value?.images[0]);
const quantity = ref(1);

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  const maxStock = product.value?.stock ?? 1;
  if (quantity.value < maxStock) {
    quantity.value++;
  }
};

async function handleToggleFavorite() {
  await favoriteStore.toggleItem(product.value!);
}

definePageMeta({
  key: (route) => route.path,
});
</script>

<template>
  <article v-if="product" :class="styles['product-page']">
    <div :class="styles['product-layout']">
      <div :class="styles.gallery">
        <div :class="styles['gallery-thumbs']">
          <button
            v-for="image in product.images"
            :key="image"
            type="button"
            :class="[
              styles['gallery-thumb'],
              selectedImage === image && styles['gallery-thumb--active'],
            ]"
            @click="selectedImage = image"
          >
            <img :src="image" :alt="`${product.name} preview`" />
          </button>
        </div>
        <div :class="styles['gallery-main']">
          <button
            type="button"
            aria-label="Add product to favorites"
            @click="handleToggleFavorite"
            :class="styles['gallery-main-like_action']"
          >
            <Icon
              :name="`my-icon:${!isFavorite ? 'heart' : 'heart-filled'}`"
              mode="svg"
            />
          </button>
          <img :src="selectedImage" :alt="product.name" />
        </div>
      </div>

      <div :class="styles.info">
        <p :class="styles['info-eyebrow']">
          {{ product.brand.name }} / {{ product.category.name }}
        </p>
        <h1 :class="styles['info-title']">{{ product.name }}</h1>
        <p :class="styles['info-description']">
          {{ product.description }}
        </p>
        <div :class="styles['info-price']">
          <span :class="styles['info-price-current']"
            >${{ product.price }}</span
          >
          <span v-if="product.oldPrice" :class="styles['info-price-old']"
            >${{ product.oldPrice }}</span
          >
        </div>
        <p :class="styles['info-stock']">In stock · ready to ship</p>

        <div :class="styles.purchase">
          <div
            :class="styles['purchase-quantity']"
            aria-label="Product quantity"
          >
            <button
              type="button"
              @click="decreaseQuantity"
              :disabled="quantity <= 1"
            >
              −
            </button>
            <span>{{ quantity }}</span>
            <button
              type="button"
              @click="increaseQuantity"
              :disabled="quantity >= (product?.stock ?? 1)"
            >
              +
            </button>
          </div>
          <button
            @click="handleAddToCart(product, quantity)"
            type="button"
            :class="styles['purchase-button']"
          >
            Add to cart
          </button>
        </div>

        <div :class="styles.perks">
          <div :class="styles['perks-item']">
            <strong>Free shipping</strong> on orders over $100.
          </div>
          <div :class="styles['perks-item']">
            <strong>30-day returns</strong> if it is not the right fit.
          </div>
          <div :class="styles['perks-item']">
            <strong>Secure checkout</strong> with every order.
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
