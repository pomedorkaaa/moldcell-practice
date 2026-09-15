<script setup>
import AppLogo from "../AppLogo/AppLogo.vue";
import BaseContainer from "../ui/BaseContainer/BaseContainer.vue";
import styles from "./AppFooter.module.scss";

const footerSections = [
  {
    heading: "Shop",
    links: [
      { label: "All products", to: "/catalog" },
      { label: "Keyboards", to: "/catalog" },
      { label: "Mice", to: "/catalog" },
      { label: "Audio", to: "/catalog" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Delivery", to: "/checkout" },
      { label: "Returns", to: "/" },
      { label: "Contact", to: "/" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Profile", to: "/profile" },
      { label: "Favorites", to: "/favorites" },
      { label: "Cart", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
    ],
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
          <NuxtLink :to="link.to" v-for="link in section.links">
            {{ link.label }}
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
