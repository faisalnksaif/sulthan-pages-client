// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: [
    './styles/settings.scss', // global styles
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  app: {
    baseURL: '/',
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/about-us',
        '/our-guides',
        '/quote/mission',
        '/quote/voiceOfKhalifa',
        '/sitemap.xml',
      ],
    }
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  site: {
    url: 'https://sulthanpages.com',   // ✅ required for sitemap
    name: 'Sulthan Pages',             // optional
  },
  sitemap: {
    exclude: ['/admin/**'],
    sources: ['/api/sitemap-articles'], // tell sitemap where to get article URLs
    autoLastmod: true,                  // adds <lastmod> automatically
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    }
  },
  robots: {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: ['https://sulthanpages.com/sitemap.xml']
  }
})