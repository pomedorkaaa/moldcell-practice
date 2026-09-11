<script setup>
import styles from "./MainHero.module.scss";
</script>

<template>
  <section :class="styles['main-hero']">
    <div :class="styles['main-hero-desc']">
      <span :class="styles['main-hero-desc-headnote']">
        Workspace Essentials
      </span>
      <h1 :class="styles['main-hero-desc-heading']">
        Tech that fits your flow.
      </h1>
      <p :class="styles['main-hero-desc-caption']">
        Keyboards, audio, lighting and workspace gear selected for focused,
        comfortable work.
      </p>
      <NuxtLink href="/catalog" :class="styles['main-hero-desc-link']">
        <span :class="styles['main-hero-desc-link-text']">Shop collection</span>
        <Icon name="my-icon:arrow" mode="svg" />
      </NuxtLink>
    </div>
    <div>
      <img
        :class="styles['main-hero-image']"
        src="/images/hero/flux-hero-workspace.webp"
        alt="main hero"
      />
    </div>
  </section>
</template>
