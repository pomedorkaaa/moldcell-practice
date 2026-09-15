<script setup lang="ts">
import styles from "./CartPage.module.scss";
import { mockProduct } from "~/utils/mock-products";

const quantity = ref(1);
const subtotal = computed(() => mockProduct.price * quantity.value);
const shipping = computed(() => (subtotal.value >= 100 ? 0 : 9));
const total = computed(() => subtotal.value + shipping.value);
</script>

<template>
  <section :class="styles['cart-page']">
    <div :class="styles.intro">
      <h1>Cart</h1>
      <p>One considered upgrade can make the whole desk feel better.</p>
    </div>

    <div :class="styles.layout">
      <section :class="styles.card">
        <h2 :class="styles['card-title']">Your items <span>(1)</span></h2>
        <article :class="styles.item">
          <img :src="mockProduct.images[0]" :alt="mockProduct.name" :class="styles['item-image']" />
          <div>
            <p :class="styles['item-category']">{{ mockProduct.brand?.name }} / {{ mockProduct.category?.name }}</p>
            <NuxtLink :to="`/products/${mockProduct.slug}`" :class="styles['item-name']">{{ mockProduct.name }}</NuxtLink>
            <p :class="styles['item-price']">${{ mockProduct.price }}</p>
            <div :class="styles['item-quantity']">
              <button type="button" aria-label="Decrease quantity" @click="quantity = Math.max(1, quantity - 1)">−</button>
              <span>{{ quantity }}</span>
              <button type="button" aria-label="Increase quantity" @click="quantity++">+</button>
            </div>
          </div>
          <strong :class="styles['item-total']">${{ subtotal }}</strong>
        </article>
      </section>

      <aside :class="styles.card">
        <h2 :class="styles['card-title']">Order summary</h2>
        <div :class="styles['summary-row']"><span>Subtotal</span><strong>${{ subtotal }}</strong></div>
        <div :class="styles['summary-row']"><span>Shipping</span><strong>{{ shipping ? `$${shipping}` : "Free" }}</strong></div>
        <div :class="[styles['summary-row'], styles['summary-total']]"><span>Total</span><strong>${{ total }}</strong></div>
        <NuxtLink to="/checkout" :class="styles['summary-button']">Proceed to checkout</NuxtLink>
        <p :class="styles['summary-note']">Free shipping over $100. 30-day returns.</p>
      </aside>
    </div>
  </section>
</template>
