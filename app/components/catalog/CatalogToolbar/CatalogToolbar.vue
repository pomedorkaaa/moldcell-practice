<script setup lang="ts">
import { catalogSortValues } from "~~/server/schemas/catalog-query";
import styles from "./CatalogToolbar.module.scss";

const categories = ["All products", "Keyboards", "Mice", "Audio"];
const selectedCategory = ref("All products");

const route = useRoute();

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

function onSortChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit("change", target.value);
}
</script>

<template>
  <div :class="styles.toolbar">
    <div :class="styles['toolbar-left']">
      <button type="button" :class="styles['toolbar-button']">Filters</button>
      <span :class="styles['toolbar-count']">Showing 1–18 of 36</span>
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

    <select
      :class="styles['toolbar-sort']"
      :value="route.query.sort || catalogSortValues[0]"
      @change="onSortChange"
    >
      <option v-for="sortValue in catalogSortValues" :value="sortValue">
        {{ sortValue }}
      </option>
    </select>
  </div>
</template>
