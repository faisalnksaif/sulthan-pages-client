/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'

// Composables
import { createApp, h, provide } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import apolloClient from './appolo/client'
// Styles
import 'unfonts.css'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

const pinia = createPinia()
app.use(pinia)

registerPlugins(app)

app.mount('#app')
