<template>
    <div>
        <button v-if="!user" @mousedown="signIn">Sign In with google</button>
    </div>
    <Dashboard />
</template>

<script setup>
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
}
</script>
