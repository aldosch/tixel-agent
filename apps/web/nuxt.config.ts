export default defineNuxtConfig({
  modules: [],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      eveHost: process.env.EVE_NUXT_PRODUCTION_ORIGIN || '',
    },
  },

  app: {
    head: {
      title: 'Tixel | The Honest Ticket Exchange',
      meta: [
        { name: 'description', content: 'Buy and sell tickets securely with Tixel. Face value tickets, buyer guarantee, and AI-powered price checking.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Semi+Expanded:wght@400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
});
