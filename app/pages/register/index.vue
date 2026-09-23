<script setup lang="ts">
const firstName = ref("");
const lastName = ref("");
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
    await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      },
    });

    await fetchUserSession();
    // await favoritesStore.fetchItems();

    await navigateTo("/profile");
  } catch {
    errorMessage.value = "Could not create account";
  } finally {
    isLoading.value = false;
  }
}

useSeoMeta({
  title: "Register | Flux",
});
</script>

<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <h1>Create account</h1>

      <label>
        First name

        <input
          v-model="firstName"
          type="text"
          autocomplete="given-name"
          required
        />
      </label>

      <label>
        Last name

        <input
          v-model="lastName"
          type="text"
          autocomplete="family-name"
          required
        />
      </label>

      <label>
        Email

        <input v-model="email" type="email" autocomplete="email" required />
      </label>

      <label>
        Password

        <input
          v-model="password"
          type="password"
          minlength="8"
          autocomplete="new-password"
          required
        />
      </label>

      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Creating account..." : "Create account" }}
      </button>

      <NuxtLink to="/login"> Already have an account? </NuxtLink>
    </form>
  </main>
</template>
