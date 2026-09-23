<script setup lang="ts">
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
  <main>
    <form @submit.prevent="handleSubmit">
      <h1>Login</h1>

      <label>
        Email

        <input v-model="email" type="email" autocomplete="email" required />
      </label>

      <label>
        Password

        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
        />
      </label>

      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>

      <NuxtLink to="/register"> Create account </NuxtLink>
    </form>
  </main>
</template>
