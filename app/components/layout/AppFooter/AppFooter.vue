<script setup>
import AppLogo from "../AppLogo/AppLogo.vue";
import BaseContainer from "../ui/BaseContainer/BaseContainer.vue";
import styles from "./AppFooter.module.scss";

const footerSections = [
  {
    heading: "Shop",
    links: ["All products", "Keyboards", "Mice", "Audio"],
  },
  {
    heading: "Help",
    links: ["Delivery", "Returns", "Contact"],
  },
  {
    heading: "Account",
    links: ["Profile", "Favorites", "Cart", "Checkout"],
  },
];
</script>

<template>
  <footer :class="styles['footer']">
    <BaseContainer>
      <div :class="styles['footer-inner']">
        <div :class="styles['footer-inner-base']">
          <AppLogo />
          <p :class="styles['footer-inner-base-text']">
            Well-designed tech for a better workspace.
          </p>
        </div>
        <!-- <div :class="styles['footer-links']"> -->
        <div
          v-for="section in footerSections"
          :class="styles['footer-inner-links-section']"
        >
          <h6 :class="styles['footer-inner-links-section-heading']">
            {{ section.heading }}
          </h6>
          <NuxtLink to="/" v-for="link in section.links">
            {{ link }}
          </NuxtLink>
        </div>
        <!-- </div> -->
      </div>
      <div :class="styles['footer-copyright']">
        <p>(c) 2026 Flux</p>
        <p>Nuxt e-commerce project</p>
      </div>
    </BaseContainer>
  </footer>
</template>
