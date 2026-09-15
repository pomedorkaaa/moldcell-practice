<script setup lang="ts">
import styles from "./SearchResults.module.scss";

interface SearchResult {
  name: string;
  brand: string;
  category: string;
  image: string;
  slug: string;
}

const categories = [
  { name: "Keyboards", count: 8 },
  { name: "Mice", count: 6 },
  { name: "Lighting", count: 5 },
  { name: "Audio", count: 6 },
  { name: "Chairs", count: 5 },
];

const products: SearchResult[] = [
  {
    name: "Keychron K8 Pro Wireless",
    brand: "Keychron",
    category: "Keyboards",
    image: "/images/products/keychron-k8-pro-1.webp",
    slug: "keychron-k8-pro",
  },
  {
    name: "Keychron Q1 V2",
    brand: "Keychron",
    category: "Keyboards",
    image: "/images/products/keychron-q1-v2-1.webp",
    slug: "keychron-q1-v2",
  },
  {
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "Mice",
    image: "/images/products/logitech-mx-master-3s-1.webp",
    slug: "logitech-mx-master-3s",
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    image: "/images/products/sony-wh-1000xm5-1.webp",
    slug: "sony-wh-1000xm5",
  },
];
</script>

<template>
  <div :class="styles['search-results']" role="dialog" aria-label="Search results">
    <section :class="styles['search-results-section']">
      <h2 :class="styles['search-results-title']">Categories</h2>
      <ul :class="styles['search-results-categories']">
        <li
          v-for="category in categories"
          :key="category.name"
          :class="styles['search-results-category']"
        >
          <span>{{ category.name }}</span>
          <span :class="styles['search-results-category-count']">{{ category.count }}</span>
        </li>
      </ul>
    </section>

    <section :class="styles['search-results-section']">
      <h2 :class="styles['search-results-title']">Products</h2>
      <div :class="styles['search-results-products']">
        <NuxtLink
          v-for="product in products"
          :key="product.slug"
          :to="`/products/${product.slug}`"
          :class="styles['search-results-product']"
        >
          <img :src="product.image" :alt="product.name" :class="styles['search-results-product-image']" />
          <div>
            <div :class="styles['search-results-product-name']">{{ product.name }}</div>
            <p :class="styles['search-results-product-meta']">{{ product.brand }} / {{ product.category }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
