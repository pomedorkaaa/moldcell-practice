<script setup lang="ts">
import styles from "./ProfilePage.module.scss";

const profileLinks = ["Profile", "Orders", "Favorites", "Addresses"];
const profileDetails = [
  { label: "Full name", value: "Alex Morgan" },
  { label: "Email", value: "alex.morgan@example.com" },
  { label: "Member since", value: "January 2026" },
  { label: "Saved items", value: "3 products" },
];
</script>

<template>
  <section :class="styles['profile-page']">
    <div :class="styles.intro">
      <h1>Profile</h1>
      <p>Manage your account and keep your workspace preferences close.</p>
    </div>

    <div :class="styles.layout">
      <aside :class="styles.card">
        <div :class="styles.identity">
          <div :class="styles['identity-avatar']">AM</div>
          <div>
            <p :class="styles['identity-name']">Alex Morgan</p>
            <p :class="styles['identity-email']">alex.morgan@example.com</p>
          </div>
        </div>
        <nav :class="styles.nav" aria-label="Profile navigation">
          <NuxtLink
            v-for="(link, index) in profileLinks"
            :key="link"
            :to="index === 0 ? '/profile' : index === 2 ? '/favorites' : '/profile'"
            :class="[styles['nav-link'], index === 0 && styles['nav-link--active']]"
          >
            {{ link }}
          </NuxtLink>
        </nav>
      </aside>

      <article :class="styles.card">
        <h2 :class="styles['section-title']">Account details</h2>
        <p :class="styles['section-copy']">A small mock profile for the Flux practice project.</p>
        <div :class="styles.details">
          <div v-for="detail in profileDetails" :key="detail.label" :class="styles['details-item']">
            <span :class="styles['details-label']">{{ detail.label }}</span>
            <span :class="styles['details-value']">{{ detail.value }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
