<script setup>
import styles from "./AppLogo.module.scss";
// const { isInFooter = false } = defineProps({
//   isInFooter: Boolean,
// });
</script>

<template>
  <NuxtLink to="/" :class="styles['app-logo']">
    <span :class="styles['app-logo-title']">
      <!-- <span :class="styles[`app-logo-title${isInFooter ? '--inFooter' : ''}`]"> -->
      FLUX
    </span>
    <span :class="styles['app-logo-pointer']">.</span>
  </NuxtLink>
</template>
