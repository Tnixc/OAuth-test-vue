<template>
    <div class="flex flex-wrap gap-4">
        <div class="flex flex-col justify-between gap-4">
            <Button class="p-4 cursor-pointer flex gap-3 items-center justify-center" @mousedown="signIn">
                <AntDesignGoogleCircleFilled class="size-6" /> Sign in with Google
            </Button>
            <p class="text-secondary-foreground w-min opacity-30">
                Your data remains 100% private. It is not shared with anyone. Email tnixxc@gmail.com for any inquires.
            </p>
        </div>
        <div class="flex-grow h-screen bg relative max-h-[calc(100dvh-2rem)]"></div>
    </div>
</template>
<style scoped>
.bg {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-position: center;
    opacity: 0.1;
}
.bg::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 1rem 1rem white;
    position: absolute;
}
</style>
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import AntDesignGoogleCircleFilled from "@/components/icones/AntDesignGoogleCircleFilled.vue";
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
