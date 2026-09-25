<script setup lang="ts">
import type { OrderConfirmation } from "#shared/types/order";
import { useCartStore } from "@/stores/cart";

import styles from "./CheckoutPage.module.scss";

const cartStore = useCartStore();

const lastOrder = useState<OrderConfirmation | null>(
  "last-order-confirmation",
  () => null,
);

const { user } = useUserSession();

const firstName = ref(user.value?.firstName ?? "");
const lastName = ref(user.value?.lastName ?? "");
const email = ref(user.value?.email ?? "");

const phone = ref("");
const city = ref("");
const address = ref("");

const isLoading = ref(false);
const errorMessage = ref("");

async function placeOrder() {
  if (cartStore.items.length === 0) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const order = await $fetch<OrderConfirmation>("/api/orders", {
      method: "POST",

      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        city: city.value,
        address: address.value,
      },
    });

    lastOrder.value = order;

    cartStore.reset();

    await navigateTo("/checkout/success");
  } catch (error) {
    console.error(error);

    errorMessage.value = "Could not place order";
  } finally {
    isLoading.value = false;
  }
}

useSeoMeta({
  title: "Checkout | Flux",
});
</script>

<template>
  <main :class="styles['checkout']">
    <h1 :class="styles['checkout-title']">Checkout</h1>

    <div v-if="cartStore.items.length" :class="styles['checkout-layout']">
      <form
        id="checkout-form"
        :class="styles['checkout-form']"
        @submit.prevent="placeOrder"
      >
        <section :class="styles['checkout-card']">
          <h2 :class="styles['checkout-card-title']">Contact information</h2>

          <div :class="styles['checkout-row']">
            <label :class="styles['checkout-field']">
              <span>First name</span>

              <input
                v-model="firstName"
                type="text"
                autocomplete="given-name"
                required
              />
            </label>

            <label :class="styles['checkout-field']">
              <span>Last name</span>

              <input
                v-model="lastName"
                type="text"
                autocomplete="family-name"
                required
              />
            </label>
          </div>

          <label :class="styles['checkout-field']">
            <span>Email</span>

            <input v-model="email" type="email" autocomplete="email" required />
          </label>

          <label :class="styles['checkout-field']">
            <span>Phone</span>

            <input v-model="phone" type="tel" autocomplete="tel" required />
          </label>
        </section>

        <section :class="styles['checkout-card']">
          <h2 :class="styles['checkout-card-title']">Delivery</h2>

          <label :class="styles['checkout-field']">
            <span>City</span>

            <input
              v-model="city"
              type="text"
              autocomplete="address-level2"
              required
            />
          </label>

          <label :class="styles['checkout-field']">
            <span>Address</span>

            <input
              v-model="address"
              type="text"
              autocomplete="street-address"
              required
            />
          </label>
        </section>
      </form>

      <aside :class="styles['checkout-summary']">
        <h2 :class="styles['checkout-summary-title']">Order summary</h2>

        <div :class="styles['checkout-products']">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            :class="styles['checkout-product']"
          >
            <img :src="item.product.images[0]" :alt="item.product.name" />

            <div :class="styles['checkout-product-info']">
              <strong>
                {{ item.product.name }}
              </strong>

              <span> Quantity: {{ item.quantity }} </span>
            </div>

            <strong> ${{ item.product.price * item.quantity }} </strong>
          </div>
        </div>

        <div :class="styles['checkout-summary-row']">
          <span>Items</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>

        <div :class="styles['checkout-total']">
          <span>Total</span>

          <strong> ${{ cartStore.totalPrice }} </strong>
        </div>

        <p v-if="errorMessage" :class="styles['checkout-error']">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          form="checkout-form"
          :disabled="isLoading"
          :class="styles['checkout-button']"
        >
          {{ isLoading ? "Placing order..." : "Place order" }}
        </button>
      </aside>
    </div>

    <div v-else :class="styles['checkout-empty']">
      <h2>Your cart is empty</h2>

      <NuxtLink to="/catalog"> Browse catalog </NuxtLink>
    </div>
  </main>
</template>