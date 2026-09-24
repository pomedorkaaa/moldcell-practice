<script setup lang="ts">
import styles from "./AuthPage.module.scss";

const email = ref("");
const password = ref("");

const isLoading = ref(false);
const errorMessage = ref("");

const { loggedIn, fetch: fetchUserSession } = useUserSession();

if (loggedIn.value) {
  await navigateTo("/profile");
}

async function handleSubmit() {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    await fetchUserSession();

    await navigateTo("/profile");
  } catch {
    errorMessage.value = "Invalid email or password";
  } finally {
    isLoading.value = false;
  }
}

useSeoMeta({
  title: "Login | Flux",
});
</script>

<template>
  <main :class="styles['auth-page']">
    <section :class="styles.card">
      <div :class="styles.intro">
        <h1>Welcome back</h1>
        <p>Sign in to keep your cart and favorites connected to your account.</p>
      </div>

      <form :class="styles.form" @submit.prevent="handleSubmit">
        <label :class="styles.field">
          <span>Email</span>

          <input v-model="email" type="email" autocomplete="email" required />
        </label>

        <label :class="styles.field">
          <span>Password</span>

          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </label>

        <p v-if="errorMessage" :class="styles.error">{{ errorMessage }}</p>

        <button :class="styles.submit" type="submit" :disabled="isLoading">
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <p :class="styles.footer">
        Don't have an account?
        <NuxtLink to="/register">Create one</NuxtLink>
      </p>
    </section>
  </main>
</template>
