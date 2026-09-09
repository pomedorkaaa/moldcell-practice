<script setup lang="ts">
import PromoBar from "~/components/layout/PromoBar/PromoBar.vue";
import AppFooter from "~/components/layout/AppFooter/AppFooter.vue";
import AppHeader from "~/components/layout/AppHeader/AppHeader.vue";
import BaseContainer from "~/components/layout/ui/BaseContainer/BaseContainer.vue";
</script>

<template>
  <div>
    <PromoBar />
    <BaseContainer>
      <AppHeader />
      <main>
        <slot />
      </main>
    </BaseContainer>
    <AppFooter />
  </div>
</template>
