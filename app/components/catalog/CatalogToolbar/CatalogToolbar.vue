<script setup lang="ts">
import styles from "./CatalogToolbar.module.scss";

const categories = ["All products", "Keyboards", "Mice", "Audio"];
const selectedCategory = ref("All products");
</script>

<template>
  <div :class="styles.toolbar">
    <div :class="styles['toolbar-left']">
      <button type="button" :class="styles['toolbar-button']">Filters</button>
      <span :class="styles['toolbar-count']">Showing 1–16 of 36</span>
    </div>
    <div :class="styles['toolbar-filters']">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :class="[
          styles['toolbar-filter'],
          selectedCategory === category && styles['toolbar-filter--active'],
        ]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
    <button type="button" :class="styles['toolbar-sort']">Newest</button>
  </div>
</template>
