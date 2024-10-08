export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  supabase: {
    redirectOptions: {
      login: "/",
      callback: "/confirm",
    },
  },

  runtimeConfig: {
    apiKeySecret: "dev_token",
  },

  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
});
