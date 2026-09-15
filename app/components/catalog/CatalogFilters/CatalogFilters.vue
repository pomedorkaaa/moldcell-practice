<script setup lang="ts">
import styles from "./CatalogFilters.module.scss";

const categories = ["Keyboards", "Mice", "Lighting", "Audio", "Chairs", "Accessories"];
const brands = ["Logitech", "Razer", "Sony", "Keychron", "BenQ"];
const selectedCategories = ref<string[]>([]);
const selectedBrands = ref<string[]>([]);
const inStockOnly = ref(false);

const resetFilters = () => {
  selectedCategories.value = [];
  selectedBrands.value = [];
  inStockOnly.value = false;
};
</script>

<template>
  <aside :class="styles.filters" aria-label="Catalog filters">
    <div :class="styles['filters-header']">
      <h2 :class="styles['filters-title']">Filters</h2>
      <button type="button" :class="styles['filters-reset']" @click="resetFilters">Reset</button>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Price</span>
      <div :class="styles['filters-price']"><span>$29</span><span>$1,099</span></div>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Category</span>
      <div :class="styles['filters-list']">
        <label v-for="category in categories" :key="category" :class="styles['filters-check']">
          <input v-model="selectedCategories" type="checkbox" :value="category" />
          <span>{{ category }}</span>
        </label>
      </div>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Brand</span>
      <div :class="styles['filters-list']">
        <label v-for="brand in brands" :key="brand" :class="styles['filters-check']">
          <input v-model="selectedBrands" type="checkbox" :value="brand" />
          <span>{{ brand }}</span>
        </label>
      </div>
    </div>
    <label :class="styles['filters-stock']">
      <input v-model="inStockOnly" type="checkbox" />
      <span>In stock only</span>
    </label>
  </aside>
</template>
