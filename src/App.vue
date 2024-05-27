<template>
  <body class="dark">
    <main class="p-4">
      <SignIn v-if="!user" />
      <Dashboard v-if="user" />
    </main>
  </body>
</template>

<script setup lang="ts">
import Dashboard from "@/components/Dashboard.vue";
import SignIn from "@/components/SignIn.vue";
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
