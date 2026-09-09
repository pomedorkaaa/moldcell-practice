<script setup>
import BaseContainer from "../ui/BaseContainer/BaseContainer.vue";
import styles from "./PromoBar.module.scss";
</script>

<template>
  <section :class="styles['promo-bar']">
    <BaseContainer>
      <p :class="styles['promo-bar-text']">
        Free shipping over $100. 30-day returns.
      </p>
    </BaseContainer>
  </section>
</template>
