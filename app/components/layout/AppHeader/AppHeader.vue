<script setup>
import styles from "./AppHeader.module.scss";
const search = ref("");
const cartCounter = ref(2);
</script>

<template>
  <header :class="styles['header']">
    <div :class="styles['header-inner']">
      <NuxtLink to="/" :class="styles['header-logo']">
        <span :class="styles['header-logo-title']"> FLUX </span>
        <span :class="styles['header-logo-pointer']">.</span>
      </NuxtLink>
      <NuxtLink to="/catalog" :class="styles['header-catalog']">
        <!-- <img
          src="/icons/catalog.svg"
          alt="catalog-icon"
          :class="styles['header-catalog-icon']"
        /> -->
        <Icon name="my-icon:catalog" :class="styles['header-catalog-icon']" />
        <span :class="styles['header-catalog-text']">Catalog</span>
      </NuxtLink>
      <div :class="styles['header-search']">
        <!-- <img
          src="/icons/search.svg"
          :class="styles['header-search-icon']"
          alt="search-icon"
        /> -->
        <Icon name="my-icon:search" :class="styles['header-search-icon']" />
        <input
          type="text"
          placeholder="Search products"
          :class="styles['header-search-input']"
          v-model="search"
        />
      </div>
      <nav :class="styles['header-actions']">
        <NuxtLink to="/profile" :class="styles['header-action']">
          <!-- <img
            src="/icons/profile.svg"
            :class="styles['header-action-icon']"
            alt="profile icon"
          /> -->
          <Icon name="my-icon:profile" :class="styles['header-action-icon']" />
        </NuxtLink>
        <NuxtLink to="/favourites" :class="styles['header-action']">
          <!-- <img
            src="/icons/heart.svg"
            :class="styles['header-action-icon']"
            alt="heart icon"
          /> -->
          <Icon name="my-icon:heart" :class="styles['header-action-icon']" />
        </NuxtLink>
        <NuxtLink to="/cart" :class="styles['header-action']">
          <!-- <img
            src="/icons/cart.svg"
            :class="styles['header-action-icon']"
            alt="cart icon"
          /> -->
          <Icon name="my-icon:cart" :class="styles['header-action-icon']" />
          <span :class="styles['header-action-badge']">{{ cartCounter }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
