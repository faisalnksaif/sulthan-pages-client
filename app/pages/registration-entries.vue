<template>
  <div class="entries-page py-10 px-4 px-sm-6">
    <div class="mx-auto" style="max-width: 920px;">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-6">
        <h1 class="text-h5 text-sm-h4 font-weight-bold color-primary">My Registration Entries</h1>
        <div class="d-flex ga-2 flex-wrap">
          <v-btn color="primary" variant="tonal" class="text-none" @click="loadEntries" :loading="isLoading">
            Refresh
          </v-btn>
          <v-btn color="blue-darken-3" variant="flat" class="text-none" to="/registration-form?new=1">
            Add New Record
          </v-btn>
          <v-btn color="grey-darken-1" variant="text" class="text-none" to="/registration-form">
            Back To Form
          </v-btn>
        </div>
      </div>

      <v-card elevation="2" rounded="lg" class="section-card mb-6">
        <v-card-text>
          <div class="text-body-2 text-grey-darken-1 mb-2">
            Entries shown here belong to your current browser/device only.
          </div>
          <div class="text-body-2" v-if="!deviceIdentifier">
            Device identifier is not available yet. Open the registration form first.
          </div>
        </v-card-text>
      </v-card>

      <v-card v-if="isLoading" elevation="2" rounded="lg" class="section-card">
        <v-card-text>
          <v-skeleton-loader type="list-item@4" />
        </v-card-text>
      </v-card>

      <v-card v-else-if="entries.length === 0" elevation="2" rounded="lg" class="section-card">
        <v-card-text>
          <div class="text-body-1">No entries found for this device yet.</div>
        </v-card-text>
      </v-card>

      <v-row v-else>
        <v-col cols="12" v-for="entry in entries" :key="entry.recordIdentifier">
          <v-card
            elevation="2"
            rounded="lg"
            class="section-card entry-card"
            @click="editEntry(entry.recordIdentifier)"
          >
            <v-card-text>
              <div class="d-flex align-start justify-space-between flex-wrap ga-3">
                <div>
                  <div class="text-subtitle-1 font-weight-bold color-primary">
                    {{ entry.name || 'Unnamed Submission' }}
                  </div>
                  <div class="text-body-2 text-grey-darken-1">Phone: {{ entry.phone || 'Not provided' }}</div>
                  <div class="text-body-2 text-grey-darken-1">Year of Bai'ath: {{ entry.baiathYear || 'Not provided' }}</div>
                  <div class="text-body-2 text-grey-darken-1">Record ID: {{ entry.recordIdentifier }}</div>
                </div>
                <div class="d-flex ga-2 flex-wrap">
                  <v-btn
                    color="blue-darken-3"
                    variant="flat"
                    class="text-none"
                    @click.stop="editEntry(entry.recordIdentifier)"
                  >
                    Edit
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar v-model="showSnackbar" :color="snackbarColor" timeout="3500">
        {{ snackbarMessage }}
      </v-snackbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const config = useRuntimeConfig()
const apiBaseUrl = config.public.registrationApiBase || 'http://localhost:4000'
const router = useRouter()

const STORAGE_DEVICE_ID = 'registrationForm.deviceIdentifier'
const STORAGE_RECORD_PREFIX = 'registrationForm.record.'
const STORAGE_DEVICE_RECORDS_PREFIX = 'registrationForm.deviceRecords.'

type Entry = {
  recordIdentifier: string
  name: string
  phone: string
  baiathYear: string
  updatedAt?: string
}

const deviceIdentifier = ref('')
const entries = ref<Entry[]>([])
const isLoading = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('green-darken-2')

const showMessage = (message: string, color = 'green-darken-2') => {
  snackbarColor.value = color
  snackbarMessage.value = message
  showSnackbar.value = true
}

const getDeviceRecordListKey = (deviceId: string) => `${STORAGE_DEVICE_RECORDS_PREFIX}${deviceId}`

const readJsonArray = (key: string) => {
  if (typeof localStorage === 'undefined') {
    return []
  }

  try {
    const value = localStorage.getItem(key)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

const getLocalRecord = (recordId: string) => {
  if (!recordId || typeof localStorage === 'undefined') {
    return null
  }

  try {
    const value = localStorage.getItem(`${STORAGE_RECORD_PREFIX}${recordId}`)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

const normalizeApiResponse = (response: any) => {
  if (!response) {
    return []
  }

  if (Array.isArray(response)) {
    return response
  }

  if (Array.isArray(response.data)) {
    return response.data
  }

  if (Array.isArray(response.submissions)) {
    return response.submissions
  }

  if (response.data && typeof response.data === 'object') {
    return [response.data]
  }

  return []
}

const toEntry = (payload: any, fallbackRecordId = ''): Entry | null => {
  const recordId = String(payload?.recordIdentifier || payload?.id || payload?.identifier || fallbackRecordId || '').trim()
  if (!recordId) {
    return null
  }

  return {
    recordIdentifier: recordId,
    name: String(payload?.name || ''),
    phone: String(payload?.phone || ''),
    baiathYear: String(payload?.baiathYear || ''),
    updatedAt: payload?.updatedAt ? String(payload.updatedAt) : undefined,
  }
}

const loadEntries = async () => {
  if (!deviceIdentifier.value) {
    return
  }

  isLoading.value = true

  try {
    const merged = new Map<string, Entry>()

    try {
      const apiResponse = await $fetch(`${apiBaseUrl}/api/public/form-submissions`, {
        method: 'GET',
        query: { deviceIdentifier: deviceIdentifier.value },
      })

      const apiEntries = normalizeApiResponse(apiResponse)
      apiEntries.forEach((item: any) => {
        const entry = toEntry(item)
        if (entry) {
          merged.set(entry.recordIdentifier, entry)
        }
      })
    } catch {
      // Continue with local entries.
    }


    entries.value = Array.from(merged.values())
  } catch (error) {
    console.error('Failed to load entries:', error)
    showMessage('Unable to load entries right now.', 'red-darken-2')
  } finally {
    isLoading.value = false
  }
}

const editEntry = (recordId: string) => {
  router.push({
    path: '/registration-form',
    query: {
      recordId,
    },
  })
}

onMounted(async () => {
  deviceIdentifier.value = typeof localStorage === 'undefined' ? '' : localStorage.getItem(STORAGE_DEVICE_ID) || ''

  if (!deviceIdentifier.value) {
    showMessage('Open the registration form once to initialize your device records.', 'orange-darken-2')
    return
  }

  await loadEntries()
})
</script>

<style scoped>
.entries-page {
  background-color: #f0f4f8;
  min-height: 100vh;
}

.section-card {
  border-left: 6px solid #1976D2;
  background: #ffffff;
  overflow: hidden;
}

.entry-card {
  cursor: pointer;
}

.color-primary {
  color: #0D47A1;
}
</style>
