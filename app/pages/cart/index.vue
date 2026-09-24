<script setup lang="ts">
import styles from "./CartPage.module.scss";
// import { mockCartProducts } from "~/utils/mock-products";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();

// const cartItems = ref(mockCartProducts.map((product) => ({ ...product, quantity: 1 })));
const cartItems = computed(() => cartStore.items);
// const subtotal = computed(() =>
//   cartItems.value.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0,
//   ),
// );
const subtotal = computed(() => cartStore.totalPrice);
const shipping = computed(() => (subtotal.value >= 100 ? 0 : 9));
const total = computed(() => subtotal.value + shipping.value);

// const changeQuantity = (index: number, direction: number) => {
//   const item = cartItems.value[index];
//   item.quantity = Math.max(1, item.quantity + direction);
// };
</script>

<template>
  <section :class="styles['cart-page']">
    <div :class="styles.intro">
      <h1>Your cart</h1>
    </div>

    <div :class="styles.layout">
      <section :class="styles.items" aria-label="Cart items">
        <article
          v-for="item in cartItems"
          :key="item.product.id"
          :class="styles.item"
        >
          <NuxtLink
            :to="`/products/${item.product.slug}`"
            :class="styles['item-media']"
          >
            <img
              :src="item.product.images[0]"
              :alt="item.product.name"
              :class="styles['item-image']"
            />
          </NuxtLink>
          <div :class="styles['item-details']">
            <p :class="styles['item-category']">
              {{ item.product.brand.name }} / {{ item.product.category.name }}
            </p>
            <NuxtLink
              :to="`/products/${item.product.slug}`"
              :class="styles['item-name']"
              >{{ item.product.name }}</NuxtLink
            >
            <div :class="styles['item-controls']">
              <div
                :class="styles['item-quantity']"
                :aria-label="`${item.product.name} quantity`"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  @click="cartStore.decrementItem(item.product.id)"
                >
                  −
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  @click="cartStore.addItem(item.product)"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                :class="styles['item-remove']"
                @click="cartStore.removeItem(item.product.id)"
              >
                Remove
              </button>
            </div>
          </div>
          <strong :class="styles['item-total']"
            >${{ item.product.price * item.quantity }}</strong
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
