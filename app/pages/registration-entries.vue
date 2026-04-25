<template>
  <div class="entries-page pb-12">
    <div class="header-gradient pt-10 pb-16 px-4">
      <div class="mx-auto" style="max-width: 920px;">
        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <h1 class="text-h4 font-weight-black text-white mb-1 grandview-font">My Registration Entries</h1>
            <div class="d-flex align-center">
              <v-icon color="blue-lighten-4" size="small" class="mr-2">mdi-database-check</v-icon>
              <span class="text-blue-lighten-4 text-caption font-weight-bold text-uppercase tracking-wider">Device Records</span>
            </div>
          </div>
          <div class="d-flex ga-2">
            <v-btn
              variant="tonal"
              color="white"
              rounded="xl"
              prepend-icon="mdi-plus"
              to="/registration-form?new=1"
              class="text-none"
            >
              Add New
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto px-4 mt-n10" style="max-width: 920px;">
      
      <v-card class="main-form-card mb-6" elevation="8" rounded="xl">
        <v-card-text class="pa-4 d-flex align-center">
          <v-avatar color="blue-lighten-5" size="40" class="mr-4">
            <v-icon color="primary">mdi-cellphone-link</v-icon>
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Local Storage Active</div>
            <div class="text-body-2">Showing entries for this browser only.</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-refresh" variant="text" :loading="isLoading" @click="loadEntries" color="primary"></v-btn>
        </v-card-text>
      </v-card>

      <div v-if="isLoading">
        <v-card v-for="i in 3" :key="i" class="mb-4 rounded-xl pa-4" elevation="2">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-card>
      </div>

      <v-card v-else-if="entries.length === 0" class="main-form-card text-center pa-12" elevation="12" rounded="xl">
        <v-icon size="80" color="blue-grey-lighten-4" class="mb-4">mdi-clipboard-text-off-outline</v-icon>
        <div class="text-h6 font-weight-bold text-grey-darken-2">No entries found</div>
        <div class="text-body-2 text-grey-darken-1 mb-6">You haven't submitted any registrations from this device yet.</div>
        <v-btn color="primary" size="large" rounded="pill" to="/registration-form?new=1" class="px-8 text-none">
          Create First Entry
        </v-btn>
      </v-card>

      <v-row v-else>
        <v-col cols="12" v-for="entry in entries" :key="entry.recordIdentifier">
          <v-card
            elevation="6"
            rounded="xl"
            class="entry-card pa-2"
            @click="editEntry(entry.recordIdentifier)"
          >
            <div class="d-flex align-center pa-4">
              <v-avatar color="primary" size="48" class="mr-4">
                <span class="text-white font-weight-bold">{{ entry.name?.charAt(0) || '?' }}</span>
              </v-avatar>
              
              <div class="flex-grow-1">
                <div class="d-flex align-center justify-space-between">
                  <div class="text-subtitle-1 font-weight-black color-primary">{{ entry.name || 'Unnamed Submission' }}</div>
                  <v-chip size="x-small" color="success" variant="tonal" class="font-weight-bold">SUBMITTED</v-chip>
                </div>
                
                <div class="d-flex align-center text-caption text-grey-darken-1 mt-1">
                  <v-icon size="14" class="mr-1">mdi-phone</v-icon>
                  {{ entry.phone || 'N/A' }}
                  <v-divider vertical class="mx-2"></v-divider>
                  <v-icon size="14" class="mr-1">mdi-calendar-check</v-icon>
                  {{ entry.baiathYear || 'N/A' }}
                </div>
              </div>

              <div class="ml-4">
                <v-btn icon="mdi-chevron-right" variant="tonal" color="primary"></v-btn>
              </div>
            </div>
            
            <v-divider></v-divider>
            
            <div class="px-4 py-2 d-flex align-center justify-space-between bg-blue-grey-lighten-5 rounded-b-xl">
              <span class="text-overline text-grey-darken-1">ID: {{ entry.recordIdentifier.slice(-8).toUpperCase() }}</span>
              <span class="text-caption text-grey-darken-1 italic">Tap to edit</span>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-8">
        <v-btn variant="text" color="grey-darken-1" prepend-icon="mdi-arrow-left" to="/registration-form" class="text-none">
          Back to Form
        </v-btn>
      </div>
    </div>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" rounded="pill" elevation="10">
      <div class="text-center font-weight-bold">{{ snackbarMessage }}</div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const apiBaseUrl = config.public.registrationApiBase || 'http://localhost:4000'
const router = useRouter()

const STORAGE_DEVICE_ID = 'registrationForm.deviceIdentifier'

const generateDeviceId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `dev-${crypto.randomUUID()}`
  }
  return `dev-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`
}

type Entry = {
  recordIdentifier: string
  name: string
  phone: string
  baiathYear: string
}

const deviceIdentifier = ref('')
const entries = ref<Entry[]>([])
const isLoading = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('green-darken-2')

const showMessage = (msg: string, color = 'green-darken-2') => {
  snackbarMessage.value = msg
  snackbarColor.value = color
  showSnackbar.value = true
}

const normalizeApiResponse = (response: any) => {
  if (!response) return []
  if (Array.isArray(response)) return response
  return response.data || response.submissions || []
}

const loadEntries = async () => {
  if (!deviceIdentifier.value) return
  isLoading.value = true
  try {
    const apiResponse = await $fetch(`${apiBaseUrl}/api/public/form-submissions`, {
      method: 'GET',
      query: { deviceIdentifier: deviceIdentifier.value },
    })

    const rawData = normalizeApiResponse(apiResponse)
    entries.value = rawData.map((item: any) => ({
      recordIdentifier: item.recordIdentifier || item.id,
      name: item.name || '',
      phone: item.phone || '',
      baiathYear: item.baiathYear || ''
    }))
  } catch (error) {
    console.error('Failed to load entries:', error)
    showMessage('Unable to load entries.', 'red-darken-2')
  } finally {
    isLoading.value = false
  }
}

const editEntry = (recordId: string) => {
  router.push({ path: '/registration-form', query: { recordId } })
}

onMounted(async () => {
  if (process.client) {
    let stored = localStorage.getItem(STORAGE_DEVICE_ID) || ''
    if (!stored) {
      stored = generateDeviceId()
      localStorage.setItem(STORAGE_DEVICE_ID, stored)
    }
    deviceIdentifier.value = stored
    await loadEntries()
  }
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/grandview');

.entries-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

.header-gradient {
  background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.main-form-card {
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.entry-card {
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  cursor: pointer;
  background: white;
}

.entry-card:hover {
  transform: translateY(-4px);
  border-color: #1976d2 !important;
}

.color-primary {
  color: #0d47a1;
}

.grandview-font {
  font-family: 'Grandview', sans-serif;
}
</style>