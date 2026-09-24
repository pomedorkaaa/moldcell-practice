<script setup lang="ts">
import PromoBar from "~/components/layout/PromoBar/PromoBar.vue";
import AppFooter from "~/components/layout/AppFooter/AppFooter.vue";
import AppHeader from "~/components/layout/AppHeader/AppHeader.vue";
import BaseContainer from "~/components/layout/ui/BaseContainer/BaseContainer.vue";
import BreadCrumbs from "~/components/layout/ui/Breadcrumbs/BreadCrumbs.vue";

const route = useRoute();
const isHome = computed(() => route.fullPath === "/");
const pagesArr = computed(() => route.fullPath.split("/").slice(1));
// console.log("ishomeeeee", isHome.value);
// console.log("routeeedeeee", pagesArr.value.length);
// console.log("routeeedeeee", route.fullPath.split("/"));

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const { loggedIn } = useUserSession();

const loadStores = async () => {
  cartStore.reset();
  favoriteStore.reset();

  await Promise.all([
    cartStore.fetchItems(),
    favoriteStore.fetchItems(),
  ]);
};

watch(loggedIn, loadStores, { immediate: true });
</script>

<template>
  <div>
    <PromoBar />
    <AppHeader />
    <BaseContainer>
      <BreadCrumbs v-if="!isHome" :pages="['home', ...pagesArr]" />
      <main>
        <slot />
      </main>
    </BaseContainer>
    <AppFooter />
  </div>
</template>
