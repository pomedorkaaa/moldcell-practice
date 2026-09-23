<script setup lang="ts">
import styles from "./CartPage.module.scss";
// import { mockCartProducts } from "~/utils/mock-products";
import { useCartStore } from "#imports";

const cartStore = useCartStore();

// const cartItems = ref(mockCartProducts.map((product) => ({ ...product, quantity: 1 })));
const cartItems = ref(cartStore.items);
// const subtotal = computed(() =>
//   cartItems.value.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0,
//   ),
// );
const subtotal = ref(cartStore.totalPrice);
const shipping = computed(() => (subtotal.value >= 100 ? 0 : 9));
const total = computed(() => subtotal.value + shipping.value);

const changeQuantity = (index: number, direction: number) => {
  const item = cartItems.value[index];
  item.quantity = Math.max(1, item.quantity + direction);
};
</script>

<template>
  <section :class="styles['cart-page']">
    <div :class="styles.intro">
      <h1>Your cart</h1>
    </div>

    <div :class="styles.layout">
      <section :class="styles.items" aria-label="Cart items">
        <article
          v-for="(item, index) in cartItems"
          :key="item.id"
          :class="styles.item"
        >
          <NuxtLink
            :to="`/products/${item.slug}`"
            :class="styles['item-media']"
          >
            <img
              :src="item.images[0]"
              :alt="item.name"
              :class="styles['item-image']"
            />
          </NuxtLink>
          <div :class="styles['item-details']">
            <p :class="styles['item-category']">
              {{ item.brand?.name }} / {{ item.category?.name }}
            </p>
            <NuxtLink
              :to="`/products/${item.slug}`"
              :class="styles['item-name']"
              >{{ item.name }}</NuxtLink
            >
            <div :class="styles['item-controls']">
              <div
                :class="styles['item-quantity']"
                :aria-label="`${item.name} quantity`"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  @click="changeQuantity(index, -1)"
                >
                  −
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  @click="changeQuantity(index, 1)"
                >
                  +
                </button>
              </div>
              <button type="button" :class="styles['item-remove']">
                Remove
              </button>
            </div>
          </div>
          <strong :class="styles['item-total']"
            >${{ item.price * item.quantity }}</strong
          >
        </article>
      </section>

      <aside :class="styles.summary">
        <h2 :class="styles['card-title']">Order summary</h2>
        <div :class="styles['summary-row']">
          <span>Subtotal</span><strong>${{ subtotal }}</strong>
        </div>
        <div :class="styles['summary-row']">
          <span>Shipping</span
          ><strong>{{ shipping ? `$${shipping}` : "Free" }}</strong>
        </div>
        <div :class="[styles['summary-row'], styles['summary-total']]">
          <span>Total</span><strong>${{ total }}</strong>
        </div>
        <NuxtLink to="/checkout" :class="styles['summary-button']"
          >Checkout</NuxtLink
        >
        <p :class="styles['summary-note']">Taxes calculated at checkout.</p>
      </aside>
    </div>
  </section>
</template>
