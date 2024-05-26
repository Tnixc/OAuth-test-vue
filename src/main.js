import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createClient } from "@supabase/supabase-js";
import { useAuthStore } from "./store/auth";

const supabase = createClient(
  "https://culcnkusqdekedddmute.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1bGNua3VzcWRla2VkZGRtdXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNzcwMzYsImV4cCI6MjAyMzg1MzAzNn0.8iIx6tF_ZUAAqQO2pN97WKBkaC0k5KODxP6v_37wTSc",
);

const app = createApp(App);
app.use(createPinia());
app.provide("supabase", supabase);

supabase.auth.onAuthStateChange((event, session) => {
  const authStore = useAuthStore();
  if (event === "SIGNED_IN") {
    authStore.setUser(session.user);
  } else if (event !== "INITIAL_SESSION") {
    authStore.setUser(null);
  }
});

app.mount("#app");
