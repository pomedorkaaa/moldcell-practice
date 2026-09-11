<script setup>
import styles from "./AppHeader.module.scss";
const search = ref("12");
const cartItemsCount = ref(1);
const hasCartItems = computed(() => {
  return cartItemsCount.value > 0;
});

watch(
  search,
  (value, oldValue) => {
    console.log("search: ", { oldValue, value });
  },
  { immediate: true },
);

watch(
  cartItemsCount,
  (value, oldValue) => {
    console.log("cart: ", { oldValue, value });
  },
  { immediate: true },
);

watch(
  hasCartItems,
  (value, oldValue) => {
    console.log("has items in cart: ", { oldValue, value });
  },
  { immediate: true },
);
</script>

<template>
  <header :class="styles['header']">
    <div :class="styles['header-inner']">
      <NuxtLink to="/" :class="styles['header-logo']">
        <span :class="styles['header-logo-title']"> FLUX </span>
        <span :class="styles['header-logo-pointer']">.</span>
      </NuxtLink>
      <NuxtLink to="/catalog" :class="styles['header-catalog']">
        <Icon name="my-icon:catalog" :class="styles['header-catalog-icon']" />
        <span :class="styles['header-catalog-text']">Catalog</span>
      </NuxtLink>
      <div :class="styles['header-search']">
        <input
          type="text"
          placeholder="Search products"
          :class="styles['header-search-input']"
          v-model="search"
        />
        <Icon name="my-icon:search" :class="styles['header-search-icon']" />
      </div>
      <nav :class="styles['header-nav-actions']">
        <NuxtLink to="/profile" :class="styles['header-nav-action']">
          <Icon
            name="my-icon:profile"
            :class="styles['header-nav-action-icon']"
          />
        </NuxtLink>
        <NuxtLink to="/favourites" :class="styles['header-nav-action']">
          <Icon
            name="my-icon:heart"
            :class="styles['header-nav-action-icon']"
          />
        </NuxtLink>
        <NuxtLink to="/cart" :class="styles['header-nav-action']">
          <Icon name="my-icon:cart" :class="styles['header-nav-action-icon']" />
          <span
            v-if="hasCartItems"
            :class="styles['header-nav-action-badge']"
            >{{ cartItemsCount }}</span
          >
        </NuxtLink>
      </nav>
    </div>
    <div>
      Корзина:
      <button @click="cartItemsCount++">Добавить</button>
      <button @click="cartItemsCount = Math.max(cartItemsCount - 1, 0)">
        Удалить
      </button>
      <button @click="cartItemsCount = 0">Сбросить</button>
    </div>
  </header>
</template>
