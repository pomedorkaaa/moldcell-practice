<script setup lang="ts">
import styles from "./CatalogToolbar.module.scss";

const categories = ["All products", "Keyboards", "Mice", "Audio"];
const selectedCategory = ref("All products");
</script>

<template>
  <div :class="styles.toolbar">
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
    <button type="button" :class="styles['toolbar-sort']">Sort: Featured</button>
  </div>
</template>
