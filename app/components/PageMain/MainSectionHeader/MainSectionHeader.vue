<script setup>
import styles from "./MainSectionHeader.module.scss";
const { title, desc, link } = defineProps({
  title: String,
  desc: String,
  link: {
    to: String,
    label: String,
  },
});
</script>

<template>
  <div :class="styles['main-section-header']">
    <div :class="styles['main-section-header-text']">
      <h2>{{ title }}</h2>
      <p>{{ desc }}</p>
    </div>
    <NuxtLink :to="link.to" :class="styles['main-section-header-link']">
      {{ link.label }}
      <Icon name="my-icon:arrow" mode="svg" />
    </NuxtLink>
  </div>
</template>
