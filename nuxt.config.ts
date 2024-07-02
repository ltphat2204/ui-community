// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', "@nuxt/icon"],
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_ANALYTICS_ID
      }
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          "flexBasis": {
            "1/2": "calc(50% - 1rem)",
            "1/3": "calc(33.33% - 1rem)",
          },
          "width": {
            "1/2": "calc(50% - 1rem)",
            "1/3": "calc(33.33% - 1rem)",
          }
        }
      }
    }
  }
})