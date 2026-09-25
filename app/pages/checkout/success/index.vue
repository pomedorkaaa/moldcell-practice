<script setup lang="ts">
import type { OrderConfirmation } from "#shared/types/order";

import styles from "./index.module.scss";

const order = useState<OrderConfirmation | null>(
  "last-order-confirmation",
  () => null,
);

if (!order.value) {
  await navigateTo("/catalog");
}

onBeforeRouteLeave(() => {
  order.value = null;
});

useSeoMeta({
  title: () =>
    order.value
      ? `Order #FLUX-${1000 + order.value.id} | Flux`
      : "Order placed | Flux",
});
</script>

<template>
  <main v-if="order" :class="styles['success']">
    <div :class="styles['success-header']">
      <div :class="styles['success-icon']">✓</div>

      <h1 :class="styles['success-title']">Order placed successfully</h1>

      <p :class="styles['success-description']">
        Thank you for your order. We have received your order and will process
        it soon.
      </p>

      <span :class="styles['success-order-number']">
        Order #FLUX-{{ 1000 + order.id }}
      </span>
    </div>

    <div :class="styles['success-content']">
      <section :class="styles['success-card']">
        <div :class="styles['success-section']">
          <h2
            :class="[
              styles['success-card-title'],
              styles['success-card-title-divided'],
            ]"
          >
            Order summary
          </h2>

          <div :class="styles['success-products']">
            <div
              v-for="item in order.items"
              :key="item.productId"
              :class="styles['success-product']"
            >
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.productName"
                :class="styles['success-product-image']"
              />

              <div :class="styles['success-product-info']">
                <strong>
                  {{ item.productName }}
                </strong>

                <span> ${{ item.unitPrice }} × {{ item.quantity }} </span>
              </div>

              <strong :class="styles['success-product-total']">
                ${{ item.unitPrice * item.quantity }}
              </strong>
            </div>
          </div>

          <div :class="styles['success-total']">
            <span>Total</span>

            <strong> ${{ order.total }} </strong>
          </div>
        </div>

        <div :class="styles['success-section']">
          <h2 :class="styles['success-card-title']">Contact information</h2>

          <dl :class="styles['success-info']">
            <div>
              <dt>Name</dt>
              <dd>{{ order.firstName }} {{ order.lastName }}</dd>
            </div>

            <div>
              <dt>Email</dt>
              <dd>{{ order.email }}</dd>
            </div>

            <div>
              <dt>Phone</dt>
              <dd>{{ order.phone }}</dd>
            </div>
          </dl>
        </div>

        <div :class="styles['success-section']">
          <h2 :class="styles['success-card-title']">Delivery</h2>

          <dl :class="styles['success-info']">
            <div>
              <dt>City</dt>
              <dd>{{ order.city }}</dd>
            </div>

            <div>
              <dt>Address</dt>
              <dd>{{ order.address }}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>

    <div :class="styles['success-actions']">
      <NuxtLink to="/catalog" :class="styles['success-primary-link']">
        Continue shopping
      </NuxtLink>
    </div>
  </main>
</template>
