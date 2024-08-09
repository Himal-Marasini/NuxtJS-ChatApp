<script setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const login = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${useRuntimeConfig().public.baseUrl}/confirm`,
    },
  });

  if (error) {
    console.error("error", error);
  }
};

watchEffect(() => {
  if (user.value) navigateTo("/chat");
});
</script>

<template>
  <div>
    <p>Login to chat with other users</p>
    <UButton label="Login with Google" @click="login" />
  </div>
</template>
