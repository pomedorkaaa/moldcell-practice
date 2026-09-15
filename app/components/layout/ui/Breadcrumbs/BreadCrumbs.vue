<script setup>
import styles from "./BreadCrumbs.module.scss";

const { pages } = defineProps({
  pages: Array,
});

// console.log(pages);
</script>

<template>
  <div :class="styles['breadcrumbs']">
    <NuxtLink
      to="/"
      v-for="page in pages"
      :class="styles['breadcrumbs-item']"
      >{{ page }}</NuxtLink
    >
  </div>
</template>
