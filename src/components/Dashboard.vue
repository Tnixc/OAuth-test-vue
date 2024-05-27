<template>
  <div v-if="user">
    <p>Hello, {{ user.user_metadata.full_name }}</p>
    <p>email: {{ user.user_metadata.email }}</p>
    <button @mousedown="signOut">Sign Out</button>
    <button @mousedown="some">get data</button>
    <form @submit.prevent="handleSubmit">
      <input type="text" name="name" v-model="formData.namev" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { reactive } from "vue";
const formData = reactive({
  namev: "",
});
const supabase = inject("supabase");
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const signOut = async () => {
  await supabase.auth.signOut();
  authStore.setUser(null);
};

async function handleSubmit() {
  console.log(formData.namev);
  const { data, e } = await supabase.from("Thing").select("*");
  if (data.length === 0) {
    const { error } = await supabase.from("Thing").insert({
      user_uuid: user.value.id,
      data: { name: formData.namev },
    });
    if (error) {
      console.error(error);
    }
  } else {
    const { error } = await supabase
      .from("Thing")
      .update({
        user_uuid: user.value.id,
        data: { name: formData.namev },
      })
      .eq("user_uuid", user.value.id);
    if (error) {
      console.error(error);
    }
  }
  if (e) {
    console.error(e);
  }
}
async function some() {
  const { data, error } = await supabase.from("Thing").select("*");
  console.log(data);
  console.log(data.length);
  if (error) {
    console.error(error);
  }
}
</script>
