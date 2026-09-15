<script setup lang="ts">
import styles from "./ProductPage.module.scss";
import { mockProduct } from "~/utils/mock-products";

definePageMeta({
  key: (route) => route.path,
});

const product = mockProduct;
const selectedImage = ref(product.images[0]);
const quantity = ref(1);
</script>

<template>
  <article :class="styles['product-page']">
    <div :class="styles['product-layout']">
      <div :class="styles.gallery">
        <div :class="styles['gallery-thumbs']">
          <button
            v-for="image in product.images"
            :key="image"
            type="button"
            :class="[styles['gallery-thumb'], selectedImage === image && styles['gallery-thumb--active']]"
            @click="selectedImage = image"
          >
            <img :src="image" :alt="`${product.name} preview`" />
          </button>
        </div>
        <div :class="styles['gallery-main']">
          <img :src="selectedImage" :alt="product.name" />
        </div>
      </div>

      <div :class="styles.info">
        <p :class="styles['info-eyebrow']">{{ product.brand?.name }} / {{ product.category?.name }}</p>
        <h1 :class="styles['info-title']">{{ product.name }}</h1>
        <p :class="styles['info-description']">{{ product.description }}</p>
        <div :class="styles['info-price']">
          <span :class="styles['info-price-current']">${{ product.price }}</span>
          <span :class="styles['info-price-old']">${{ product.oldPrice }}</span>
        </div>
        <p :class="styles['info-stock']">In stock · ready to ship</p>

        <div :class="styles.purchase">
          <div :class="styles['purchase-quantity']" aria-label="Product quantity">
            <button type="button" aria-label="Decrease quantity" @click="quantity = Math.max(1, quantity - 1)">−</button>
            <span>{{ quantity }}</span>
            <button type="button" aria-label="Increase quantity" @click="quantity++">+</button>
          </div>
          <button type="button" :class="styles['purchase-button']">Add to cart</button>
        </div>

        <div :class="styles.perks">
          <div :class="styles['perks-item']"><strong>Free shipping</strong> on orders over $100.</div>
          <div :class="styles['perks-item']"><strong>30-day returns</strong> if it is not the right fit.</div>
          <div :class="styles['perks-item']"><strong>Secure checkout</strong> with every order.</div>
        </div>
      </div>
    </div>
  </article>
</template>
