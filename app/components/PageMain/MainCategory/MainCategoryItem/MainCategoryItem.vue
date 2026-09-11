<script setup>
import styles from "./MainCategoryItem.module.scss";
const { category } = defineProps({
  category: String,
});
</script>

<template>
  <div :class="styles['main-category-item']">
    <h5>{{ category }}</h5>
    <img :src="`/images/categories/${category}.webp`" :alt="category" />
  </div>
</template>
