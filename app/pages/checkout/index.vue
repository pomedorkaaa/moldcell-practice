<script setup lang="ts">
import styles from "./CheckoutPage.module.scss";
import { mockProduct } from "~/utils/mock-products";

const customer = reactive({
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@example.com",
  address: "42 Workspace Avenue",
  city: "Chisinau",
  country: "Moldova",
});

const total = mockProduct.price;
</script>

<template>
  <section :class="styles['checkout-page']">
    <div :class="styles.intro">
      <h1>Checkout</h1>
      <p>Almost there. Add your details and we will prepare the order.</p>
    </div>

    <div :class="styles.layout">
      <section :class="styles.card">
        <h2 :class="styles['card-title']">Shipping details</h2>
        <form :class="styles.form" @submit.prevent>
          <div :class="styles['form-row']">
            <div :class="styles['form-field']">
              <label for="first-name">First name</label>
              <input id="first-name" v-model="customer.firstName" type="text" />
            </div>
            <div :class="styles['form-field']">
              <label for="last-name">Last name</label>
              <input id="last-name" v-model="customer.lastName" type="text" />
            </div>
          </div>
          <div :class="styles['form-field']">
            <label for="email">Email address</label>
            <input id="email" v-model="customer.email" type="email" />
          </div>
          <div :class="styles['form-field']">
            <label for="address">Address</label>
            <input id="address" v-model="customer.address" type="text" />
          </div>
          <div :class="styles['form-row']">
            <div :class="styles['form-field']">
              <label for="city">City</label>
              <input id="city" v-model="customer.city" type="text" />
            </div>
            <div :class="styles['form-field']">
              <label for="country">Country</label>
              <select id="country" v-model="customer.country">
                <option>Moldova</option>
                <option>Romania</option>
                <option>Ukraine</option>
              </select>
            </div>
          </div>
          <button type="submit" :class="styles['form-button']">Place mock order</button>
        </form>
      </section>

      <aside :class="styles.card">
        <h2 :class="styles['card-title']">Order summary</h2>
        <div :class="styles['summary-product']">
          <img :src="mockProduct.images[0]" :alt="mockProduct.name" :class="styles['summary-product-image']" />
          <div>
            <div :class="styles['summary-product-name']">{{ mockProduct.name }}</div>
            <p :class="styles['summary-product-meta']">Quantity: 1</p>
          </div>
          <strong :class="styles['summary-product-price']">${{ mockProduct.price }}</strong>
        </div>
        <div :class="styles['summary-row']"><span>Subtotal</span><strong>${{ total }}</strong></div>
        <div :class="styles['summary-row']"><span>Shipping</span><strong>Free</strong></div>
        <div :class="[styles['summary-row'], styles['summary-row--total']]"><span>Total</span><strong>${{ total }}</strong></div>
        <p :class="styles['secure-note']">This is a mock checkout screen. Payment integration can be added later.</p>
      </aside>
    </div>
  </section>
</template>
