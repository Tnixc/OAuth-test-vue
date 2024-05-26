<template>
  <main class="p-4">
    <div>
      <button
        class="border rounded-md p-4 cursor-pointer flex gap-3 items-center justify-center"
        v-if="!user"
        @mousedown="signIn"
      >
        <AntDesignGoogleCircleFilled class="size-6" /> Sign In with google
      </button>
    </div>
    <Dashboard />
  </main>
</template>

<script setup>
import AntDesignGoogleCircleFilled from "./components/icones/AntDesignGoogleCircleFilled.vue";
import Dashboard from "@/components/Dashboard.vue";
import { inject, computed } from "vue";
import { useAuthStore } from "@/store/auth";

const supabase = inject("supabase");
const authStore = useAuthStore();
const user = computed(() => authStore.user);

async function signIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google", // Or any other provider you have setup for OAuth
  });
  if (error) {
    console.error(error);
  }
}
</script>
