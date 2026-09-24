<script setup lang="ts">
import styles from "../login/AuthPage.module.scss";

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
  <main :class="styles['auth-page']">
    <section :class="styles.card">
      <div :class="styles.intro">
        <h1>Create your account</h1>
        <p>Save your cart and favorites while you shop across devices.</p>
      </div>

      <form :class="styles.form" @submit.prevent="handleSubmit">
        <label :class="styles.field">
          <span>First name</span>

          <input
            v-model="firstName"
            type="text"
            autocomplete="given-name"
            required
          />
        </label>

        <label :class="styles.field">
          <span>Last name</span>

          <input
            v-model="lastName"
            type="text"
            autocomplete="family-name"
            required
          />
        </label>

        <label :class="styles.field">
          <span>Email</span>

          <input v-model="email" type="email" autocomplete="email" required />
        </label>

        <label :class="styles.field">
          <span>Password</span>

          <input
            v-model="password"
            type="password"
            minlength="8"
            autocomplete="new-password"
            required
          />
        </label>

        <p v-if="errorMessage" :class="styles.error">{{ errorMessage }}</p>

        <button :class="styles.submit" type="submit" :disabled="isLoading">
          {{ isLoading ? "Creating account..." : "Create account" }}
        </button>
      </form>

      <p :class="styles.footer">
        Already have an account?
        <NuxtLink to="/login">Sign in</NuxtLink>
      </p>
    </section>
  </main>
</template>
