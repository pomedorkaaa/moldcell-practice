// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/styles/main.scss"],
  modules: ["@nuxt/icon", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  icon: {
    customCollections: [
      {
        prefix: "my-icon",
        // `dir` is resolved as a filesystem path by @nuxt/icon, not as a Nuxt alias.
        dir: "./app/assets/icons",
      },
    ],
  },
});
