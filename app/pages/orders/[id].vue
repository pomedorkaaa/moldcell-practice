<script setup lang="ts">
import type { OrderDetails } from "#shared/types/order";

import styles from "./order.module.scss";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();

const { data: order, error } = await useFetch<OrderDetails>(
  () => `/api/orders/${route.params.id}`,
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? "Could not load order",
    fatal: true,
  });
}

if (!order.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Order not found",
    fatal: true,
  });
}

useSeoMeta({
  title: () => `Order #FLUX-${1000 + (order.value?.id ?? 0)} | Flux`,
});
</script>

<template>
  <main v-if="order" :class="styles['order']">
    <NuxtLink to="/profile" :class="styles['order-back']">
      ← Back to account
    </NuxtLink>

    <div :class="styles['order-header']">
      <div>
        <span :class="styles['order-label']"> Order </span>

        <h1 :class="styles['order-title']">#FLUX-{{ 1000 + order.id }}</h1>

        <p :class="styles['order-date']">
          {{
            new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          }}
        </p>
      </div>

      <span :class="styles['order-status']">
        {{ order.status }}
      </span>
    </div>

    <div :class="styles['order-layout']">
      <section :class="styles['order-card']">
        <h2 :class="styles['order-card-title']">Items</h2>

        <div :class="styles['order-items']">
          <article
            v-for="item in order.items"
            :key="item.id"
            :class="styles['order-item']"
          >
            <div :class="styles['order-item-media']">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.productName"
                :class="styles['order-item-image']"
              />
            </div>

            <div :class="styles['order-item-info']">
              <strong>
                {{ item.productName }}
              </strong>

              <span> ${{ item.unitPrice }} × {{ item.quantity }} </span>
            </div>

            <strong :class="styles['order-item-total']">
              ${{ item.unitPrice * item.quantity }}
            </strong>
          </article>
        </div>

        <div :class="styles['order-total']">
          <span>Total</span>

          <strong> ${{ order.total }} </strong>
        </div>
      </section>

      <aside :class="styles['order-details']">
        <section :class="styles['order-card']">
          <h2 :class="styles['order-card-title']">Customer</h2>

          <dl :class="styles['order-info']">
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
        </section>

        <section :class="styles['order-card']">
          <h2 :class="styles['order-card-title']">Delivery</h2>

          <dl :class="styles['order-info']">
            <div>
              <dt>City</dt>
              <dd>{{ order.city }}</dd>
            </div>

            <div>
              <dt>Address</dt>
              <dd>{{ order.address }}</dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>
  </main>
</template>
