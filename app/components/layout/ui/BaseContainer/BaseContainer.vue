<script setup>
import styles from "./BaseContainer.module.scss";
</script>

<template>
  <div :class="styles['container']" class="container">
    <slot />
  </div>
</template>
