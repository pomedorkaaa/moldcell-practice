<script setup lang="ts">
import AppLogo from "../AppLogo/AppLogo.vue";
import BaseContainer from "../ui/BaseContainer/BaseContainer.vue";
import styles from "./AppHeader.module.scss";
import CatalogButton from "./CatalogButton/CatalogButton.vue";
import SearchResults from "../SearchResults/SearchResults.vue";
import { useCartStore } from "../../../stores/cart";
import { useFavoriteStore } from "../../../stores/favorites";
import type { CatalogProduct } from "#shared/types/catalog";

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();
const route = useRoute();
const { loggedIn } = useUserSession();

let timeoutId: ReturnType<typeof setTimeout> | undefined;

const search = ref("");
const products = ref<CatalogProduct[]>([]);
const isSearchFocused = ref(false);
const isLoading = ref(false);

const hasCartItems = computed(() => {
  return cartStore.totalItems > 0;
});
const hasFavoriteItems = computed(() => {
  return favoriteStore.totalItems > 0;
});
const isCatalogPage = computed(() => route.path === "/catalog");
const isSearchOpen = computed(
  () => isSearchFocused.value && search.value.trim().length > 0,
);
// const cartItemsCount = computed(() => cartStore.items.length);

const handleSearchFocusOut = () => {
  window.setTimeout(() => {
    isSearchFocused.value = false;
  }, 0);
};

watch(search, (value) => {
  clearTimeout(timeoutId);

  const query = value.trim();

  if (query.length < 2) {
    products.value = [];
    return;
  }

  timeoutId = setTimeout(async () => {
    isLoading.value = true;

    try {
      products.value = await $fetch<CatalogProduct[]>("/api/products", {
        query: {
          search: query,
        },
      });
    } finally {
      isLoading.value = false;
      console.log(products.value);
      // console.log(value);
    }
  }, 300);
});
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
            @focus="isSearchFocused = true"
            @blur="handleSearchFocusOut"
          />
          <Icon
            name="my-icon:search"
            :class="styles['header-search-icon']"
            mode="svg"
          />
          <SearchResults :products="products" v-if="isSearchOpen" />
        </div>
        <nav :class="styles['header-nav-actions']">
          <NuxtLink
            :to="loggedIn ? '/profile' : '/login'"
            :class="styles['header-nav-action']"
          >
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
            <span
              v-if="hasFavoriteItems"
              :class="styles['header-nav-action-badge']"
              >{{ favoriteStore.totalItems }}</span
            >
          </NuxtLink>
          <NuxtLink to="/cart" :class="styles['header-nav-action']">
            <Icon
              name="my-icon:cart"
              :class="styles['header-nav-action-icon']"
            />
            <span
              v-if="hasCartItems"
              :class="styles['header-nav-action-badge']"
              >{{ cartStore.totalItems }}</span
            >
            <!-- >{{ cartItemsCount }}</span -->
          </NuxtLink>
        </nav>
      </div>
    </BaseContainer>
  </header>
</template>
