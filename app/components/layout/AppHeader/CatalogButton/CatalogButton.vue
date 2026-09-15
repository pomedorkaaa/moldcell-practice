<script setup>
import styles from "./CatalogButton.module.scss";
const { isCatalogPage } = defineProps({
  isCatalogPage: Boolean,
});
</script>

<template>
  <NuxtLink
    to="/catalog"
    :class="[
      styles['button-catalog'],
      isCatalogPage && styles['button-catalog--onCatalog'],
    ]"
  >
    <Icon
      name="my-icon:catalog"
      :class="styles['button-catalog-icon']"
      mode="svg"
    />
    <span :class="styles['button-catalog-text']">Catalog</span>
  </NuxtLink>
</template>
