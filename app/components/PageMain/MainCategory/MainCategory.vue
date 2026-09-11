<script setup>
import MainSectionHeader from "../MainSectionHeader/MainSectionHeader.vue";
import styles from "./MainCategory.module.scss";
import MainCategoryItem from "./MainCategoryItem/MainCategoryItem.vue";

const categoryItems = [
  "accessories",
  "audio",
  "chairs",
  "keyboards",
  "lighting",
  "mice",
];
</script>

<template>
  <section :class="styles['main-category']">
    <MainSectionHeader
      title="Shop by category"
      desc="Everything for a cleaner, more comfortable setup."
      :link="{ to: '/catalog', label: 'View All' }"
    />
    <div :class="styles['main-category-items']">
      <MainCategoryItem
        v-for="category in categoryItems"
        :category="category"
      />
    </div>
  </section>
</template>
