<script setup lang="ts">
import styles from "./CatalogFilters.module.scss";

const categories = [
  { name: "Keyboards", count: 8 },
  { name: "Mice", count: 6 },
  { name: "Lighting", count: 5 },
  { name: "Audio", count: 6 },
  { name: "Chairs", count: 5 },
  { name: "Accessories", count: 6 },
];
const brands = [
  { name: "Logitech", count: 8 },
  { name: "Keychron", count: 4 },
  { name: "BenQ", count: 3 },
  { name: "NuPhy", count: 2 },
  { name: "HyperX", count: 4 },
  { name: "Xiaomi", count: 3 },
  { name: "Steelcase", count: 5 },
  { name: "Sony", count: 2 },
  { name: "Razer", count: 5 },
];
const selectedCategories = ref<string[]>(["Keyboards"]);
const selectedBrands = ref<string[]>(["Logitech"]);
const inStockOnly = ref(true);

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
      <div :class="styles['filters-price']">
        <span>$29</span><i>–</i><span>$1,099</span>
      </div>
      <div :class="styles['filters-range']" aria-hidden="true"><i /></div>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Category</span>
      <div :class="styles['filters-list']">
        <label v-for="category in categories" :key="category.name" :class="styles['filters-check']">
          <input v-model="selectedCategories" type="checkbox" :value="category.name" />
          <span>{{ category.name }}</span>
          <small>{{ category.count }}</small>
        </label>
      </div>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Brand</span>
      <div :class="styles['filters-list']">
        <label v-for="brand in brands" :key="brand.name" :class="styles['filters-check']">
          <input v-model="selectedBrands" type="checkbox" :value="brand.name" />
          <span>{{ brand.name }}</span>
          <small>{{ brand.count }}</small>
        </label>
      </div>
    </div>
    <label :class="styles['filters-stock']">
      <input v-model="inStockOnly" type="checkbox" />
      <span>In stock only</span>
    </label>
  </aside>
</template>
