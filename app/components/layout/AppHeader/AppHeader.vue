<script setup>
import AppLogo from "../AppLogo/AppLogo.vue";
import BaseContainer from "../ui/BaseContainer/BaseContainer.vue";
import styles from "./AppHeader.module.scss";
import CatalogButton from "./CatalogButton/CatalogButton.vue";
import SearchResults from "../SearchResults/SearchResults.vue";

const search = ref("");
const cartItemsCount = ref(0);
const hasCartItems = computed(() => {
  return cartItemsCount.value > 0;
});

const route = useRoute();
const isCatalogPage = computed(() => route.path === "/catalog");
const isSearchOpen = computed(() => search.value.trim().length > 0);
</script>

<template>
  <header :class="styles['header']">
    <BaseContainer>
      <div :class="styles['header-inner']">
        <AppLogo />
        <CatalogButton :isCatalogPage="isCatalogPage" />
        <div :class="styles['header-search']">
          <input
            type="text"
            placeholder="Search products"
            :class="styles['header-search-input']"
            v-model="search"
            aria-label="Search products"
          />
          <Icon
            name="my-icon:search"
            :class="styles['header-search-icon']"
            mode="svg"
          />
          <SearchResults v-if="isSearchOpen" />
        </div>
        <nav :class="styles['header-nav-actions']">
          <NuxtLink to="/profile" :class="styles['header-nav-action']">
            <Icon
              name="my-icon:profile"
              :class="styles['header-nav-action-icon']"
            />
          </NuxtLink>
          <NuxtLink to="/favorites" :class="styles['header-nav-action']">
            <Icon
              name="my-icon:heart"
              :class="styles['header-nav-action-icon']"
            />
          </NuxtLink>
          <NuxtLink to="/cart" :class="styles['header-nav-action']">
            <Icon
              name="my-icon:cart"
              :class="styles['header-nav-action-icon']"
            />
            <span
              v-if="hasCartItems"
              :class="styles['header-nav-action-badge']"
              >{{ cartItemsCount }}</span
            >
          </NuxtLink>
        </nav>
      </div>
    </BaseContainer>
  </header>
</template>
