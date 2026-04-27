<template>
  <div class="admin-entries-page pb-12">
    <div class="header-gradient pt-10 pb-16 px-4">
      <div class="mx-auto" style="max-width: 1120px;">
        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <h1 class="text-h4 font-weight-black text-white mb-1 grandview-font page-title">Admin Registration Entries</h1>
            <div class="d-flex align-center text-blue-lighten-4 text-caption font-weight-bold text-uppercase tracking-wider">
              <v-icon color="blue-lighten-4" size="small" class="mr-2">mdi-shield-account</v-icon>
              All submissions with admin access
            </div>
          </div>

          <div class="d-flex ga-2 flex-wrap justify-end header-actions">
            <v-btn variant="tonal" color="white" rounded="xl" prepend-icon="mdi-refresh" class="text-none header-action-btn" :loading="isLoading" @click="loadEntries">
              Refresh
            </v-btn>
            <v-btn variant="outlined" color="white" rounded="xl" prepend-icon="mdi-logout" class="text-none header-action-btn" @click="logout">
              Logout
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto px-4 mt-n10" style="max-width: 1120px;">
      <v-card class="panel-card mb-6" elevation="10" rounded="xl">
        <v-card-text class="pa-4 pa-sm-6">
          <v-row align="center">
            <v-col cols="12" md="7">
              <v-text-field
                v-model="searchText"
                label="Search by name, phone, record ID, year, address"
                variant="outlined"
                bg-color="blue-grey-lighten-10"
                rounded="lg"
                prepend-inner-icon="mdi-magnify"
                clearable
                hide-details
              />
            </v-col>
            <v-col cols="6" md="2">
              <v-select
                v-model="pageSize"
                :items="pageSizeOptions"
                label="Rows"
                variant="outlined"
                bg-color="blue-grey-lighten-10"
                rounded="lg"
                hide-details
              />
            </v-col>
            <v-col cols="6" md="3" class="text-md-right">
              <div class="text-caption text-grey-darken-1 text-uppercase font-weight-bold">Showing</div>
              <div class="text-h6 font-weight-black color-primary">{{ paginatedEntries.length }} / {{ filteredEntries.length }}</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <div v-if="isLoading">
        <v-card v-for="i in 4" :key="i" class="mb-4 rounded-xl pa-4" elevation="2">
          <v-skeleton-loader type="list-item-three-line" />
        </v-card>
      </div>

      <v-card v-else-if="filteredEntries.length === 0" class="panel-card text-center pa-12" elevation="12" rounded="xl">
        <v-icon size="80" color="blue-grey-lighten-4" class="mb-4">mdi-database-search-outline</v-icon>
        <div class="text-h6 font-weight-bold text-grey-darken-2">No matching entries</div>
        <div class="text-body-2 text-grey-darken-1">Try a different search term or refresh the list.</div>
      </v-card>

      <v-row v-else>
        <v-col cols="12" v-for="entry in paginatedEntries" :key="entry.recordIdentifier">
          <v-card elevation="6" rounded="xl" class="entry-card pa-2" @click="openEntry(entry.recordIdentifier)">
            <div class="d-flex align-start pa-4 ga-4 flex-wrap flex-sm-nowrap entry-content">
              <v-avatar color="primary" size="52">
                <span class="text-white font-weight-bold">{{ entry.name?.charAt(0) || '?' }}</span>
              </v-avatar>

              <div class="flex-grow-1 min-w-0">
                <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                  <div class="text-subtitle-1 font-weight-black color-primary entry-name">{{ entry.name || 'Unnamed Submission' }}</div>
                  <div class="d-flex ga-2 flex-wrap">
                    <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">{{ entry.baiathYear || 'No year' }}</v-chip>
                    <v-chip size="x-small" color="success" variant="tonal" class="font-weight-bold">{{ entry.phone || 'No phone' }}</v-chip>
                  </div>
                </div>

                <div class="text-caption text-grey-darken-1 mt-2 id-text">
                  ID: {{ entry.recordIdentifier }}
                </div>

                <div v-if="entry.whatsappLastSentAt" class="text-caption text-green-darken-2 mt-1 id-text">
                  Last sent at: {{ formatDateTime(entry.whatsappLastSentAt) }}
                </div>

                <div class="text-body-2 text-grey-darken-2 mt-2 text-truncate-2">
                  {{ entry.currentAddress || entry.permanentAddress || 'No address available' }}
                </div>
              </div>

              <div class="align-self-center">
                <div class="d-flex ga-2">
                  <v-btn
                    icon="mdi-file-pdf-box"
                    variant="tonal"
                    color="error"
                    :loading="Boolean(pdfLoadingById[entry.recordIdentifier])"
                    @click.stop="generateAndSharePdf(entry)"
                  />
                  <v-btn
                    icon="mdi-whatsapp"
                    variant="tonal"
                    color="success"
                    :loading="Boolean(whatsappLoadingById[entry.recordIdentifier])"
                    @click.stop="sendWhatsApp(entry)"
                  />
                  <v-btn icon="mdi-chevron-right" variant="tonal" color="primary" />
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="filteredEntries.length > 0" class="d-flex justify-space-between align-center flex-wrap ga-4 mt-8 pagination-wrap">
        <div class="text-body-2 text-grey-darken-1">
          Page {{ currentPage }} of {{ totalPages }}
        </div>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          class="pagination-control"
          rounded="circle"
          color="primary"
          density="comfortable"
        />
      </div>
    </div>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" rounded="pill" elevation="10">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import {
  buildSubmissionPdfFileName,
  createSubmissionPdf,
  extractRecordPayload,
  normalizeFamilyMembers,
  shareOrDownloadPdf,
  type FormSubmissionDetails,
} from '~/utils/registration-pdf'

definePageMeta({
  middleware: 'admin-auth',
})

type Entry = {
  recordIdentifier: string
  name: string
  phone: string
  baiathYear: string
  permanentAddress: string
  currentAddress: string
  whatsappLastSentAt: string
}

const config = useRuntimeConfig()
const apiBaseUrl = config.public.registrationApiBase || 'http://localhost:4000'
const router = useRouter()
const { buildAuthHeaders, clearToken } = useAdminSession()

const entries = ref<Entry[]>([])
const isLoading = ref(false)
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOptions = [10, 20, 50, 100]
const pdfLoadingById = ref<Record<string, boolean>>({})
const whatsappLoadingById = ref<Record<string, boolean>>({})
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('green-darken-2')

const showMessage = (message: string, color = 'green-darken-2') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  showSnackbar.value = true
}

const normalizeApiResponse = (response: any) => {
  if (!response) return []
  if (Array.isArray(response)) return response
  return response.data || response.submissions || []
}

const filteredEntries = computed(() => {
  const term = searchText.value.trim().toLowerCase()
  if (!term) {
    return entries.value
  }

  return entries.value.filter((entry) => {
    const haystack = [
      entry.recordIdentifier,
      entry.name,
      entry.phone,
      entry.baiathYear,
      entry.permanentAddress,
      entry.currentAddress,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(term)
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredEntries.value.length / pageSize.value))
})

const paginatedEntries = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredEntries.value.slice(start, start + pageSize.value)
})

watch([searchText, pageSize], () => {
  currentPage.value = 1
})

watch(totalPages, (value) => {
  if (currentPage.value > value) {
    currentPage.value = value
  }
})

const loadEntries = async () => {
  isLoading.value = true

  try {
    const response = await $fetch(`${apiBaseUrl}/api/protected/form-submissions`, {
      method: 'GET',
      headers: buildAuthHeaders(),
    })

    const rawData = normalizeApiResponse(response)
    entries.value = rawData.map((item: any) => ({
      recordIdentifier: item.recordIdentifier || item.id || '',
      name: item.name || '',
      phone: item.phone || '',
      baiathYear: item.baiathYear || '',
      permanentAddress: item.permanentAddress || '',
      currentAddress: item.currentAddress || '',
      whatsappLastSentAt: item.whatsappLastSentAt || '',
    }))
  } catch (error: any) {
    console.error('Failed to load admin entries:', error)

    const status = error?.status || error?.response?.status
    if (status === 401 || status === 403) {
      clearToken()
      showMessage('Session expired. Please sign in again.', 'red-darken-2')
      await router.push('/admin/login')
      return
    }

    showMessage('Unable to load admin entries.', 'red-darken-2')
  } finally {
    isLoading.value = false
  }
}

const openEntry = async (recordId: string) => {
  await router.push({ path: '/registration-form', query: { recordId } })
}

const fetchFullEntry = async (recordId: string): Promise<FormSubmissionDetails | null> => {
  const response = await $fetch(`${apiBaseUrl}/api/public/form-submissions/${recordId}`, {
    method: 'GET',
    headers: buildAuthHeaders(),
  })

  const payload = extractRecordPayload(response)
  if (!payload) {
    return null
  }

  return {
    ...payload,
    familyMembers: normalizeFamilyMembers(payload.familyMembers),
  }
}

const generateAndSharePdf = async (entry: Entry) => {
  const recordId = entry.recordIdentifier
  if (!recordId) {
    showMessage('Unable to find record ID for this entry.', 'orange-darken-2')
    return
  }

  pdfLoadingById.value = {
    ...pdfLoadingById.value,
    [recordId]: true,
  }

  try {
    const fullEntry = await fetchFullEntry(recordId)
    if (!fullEntry) {
      showMessage('Unable to load this record for PDF generation.', 'red-darken-2')
      return
    }

    const pdfBlob = await createSubmissionPdf({
      ...fullEntry,
      recordIdentifier: fullEntry.recordIdentifier || fullEntry.id || recordId,
    })
    const fileName = buildSubmissionPdfFileName(fullEntry, recordId)
    const result = await shareOrDownloadPdf(pdfBlob, fileName, {
      shareTitle: 'രജിസ്ട്രേഷൻ വിശദാംശങ്ങൾ',
      shareText: `${fullEntry.name || 'അംഗം'} എന്ന ആളിന്റെ രജിസ്ട്രേഷൻ PDF`,
    })

    if (result === 'shared') {
      showMessage('PDF ഷെയർ ചെയ്തു. Share sheet-ൽ WhatsApp തിരഞ്ഞെടുക്കാം.', 'green-darken-2')
    } else {
      showMessage('PDF ഡൗൺലോഡ് ചെയ്തു. ഇത് WhatsApp-ൽ അറ്റാച്ച് ചെയ്യാം.', 'blue-darken-2')
    }
  } catch (error) {
    console.error('PDF generation failed:', error)
    showMessage('ഈ രേഖയ്ക്ക് PDF സൃഷ്ടിക്കാൻ കഴിഞ്ഞില്ല.', 'red-darken-2')
  } finally {
    pdfLoadingById.value = {
      ...pdfLoadingById.value,
      [recordId]: false,
    }
  }
}

const normalizePhoneForWhatsApp = (value: string) => {
  const raw = String(value || '').trim()
  if (!raw) return ''

  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''

  if (raw.startsWith('+')) {
    return digits
  }

  // UAE local mobile numbers usually start with 05XXXXXXXX.
  if (digits.startsWith('05') && digits.length === 10) {
    return `971${digits.slice(1)}`
  }

  // Also handle UAE numbers entered without the leading zero.
  if (digits.startsWith('5') && digits.length === 9) {
    return `971${digits}`
  }

  if (digits.length === 10) {
    return `91${digits}`
  }

  return digits
}

const formatDateTime = (value: string) => {
  if (!value) return ''

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed)
}

const setEntryLastSentAt = (recordId: string, sentAt: string) => {
  entries.value = entries.value.map((item) => {
    if (item.recordIdentifier !== recordId) {
      return item
    }

    return {
      ...item,
      whatsappLastSentAt: sentAt,
    }
  })
}

const markWhatsAppSent = async (recordId: string) => {
  const response = await $fetch<{ ok?: boolean; whatsappLastSentAt?: string }>(
    `${apiBaseUrl}/api/protected/form-submissions/${recordId}/whatsapp-sent`,
    {
      method: 'POST',
      headers: buildAuthHeaders(),
    },
  )

  const sentAt = response?.whatsappLastSentAt || new Date().toISOString()
  setEntryLastSentAt(recordId, sentAt)
}

const buildPdfDownloadLink = (recordId: string) => {
  const path = `/download-registration-pdf?recordId=${encodeURIComponent(recordId)}`
  if (!process.client) {
    return path
  }

  return `${window.location.origin}${path}`
}

const buildWhatsAppText = (entry: Entry, downloadLink?: string) => {
  const name = entry.name || 'അംഗം'

  const lines = [
    `അസ്സലാമു അലൈക്കും ${name},`,
    '',
    'ഖുതുബുസ്സമാൻ സെന്ററിലെ നിങ്ങളുടെ രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയായിരിക്കുന്നു',
    '',
    'നിങ്ങളുടെ രജിസ്ട്രേഷൻ വിവരങ്ങൾ അടങ്ങിയ PDF ഇതിനോടൊപ്പം ചേർത്തിട്ടുണ്ട്.'
  ]

  if (downloadLink) {
    lines.push(`ലിങ്ക്: ${downloadLink}`)
  }

  lines.push('', 'ജസാക്കള്ളാഹു ഖൈറൻ.')

  return lines.join('\n')
}

const sendWhatsApp = async (entry: Entry) => {
  const recordId = entry.recordIdentifier
  const phone = normalizePhoneForWhatsApp(entry.phone)

  if (!phone) {
    showMessage('Phone number is not available for this entry.', 'orange-darken-2')
    return
  }

  if (!recordId) {
    showMessage('Unable to find record ID for this entry.', 'orange-darken-2')
    return
  }

  if (entry.whatsappLastSentAt && process.client) {
    const sentAt = formatDateTime(entry.whatsappLastSentAt)
    const shouldResend = window.confirm(
      `Already sent on ${sentAt || 'previously'}. Do you want to send again?`,
    )

    if (!shouldResend) {
      return
    }
  }

  const initialText = encodeURIComponent(buildWhatsAppText(entry, buildPdfDownloadLink(recordId)))
  const whatsappUrl = `https://wa.me/${phone}?text=${initialText}`
  if (process.client) {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  try {
    await markWhatsAppSent(recordId)
  } catch (markError) {
    console.error('Failed to update WhatsApp last sent time:', markError)
  }

  whatsappLoadingById.value = {
    ...whatsappLoadingById.value,
    [recordId]: true,
  }

  try {
    const fullEntry = await fetchFullEntry(recordId)
    if (!fullEntry) {
      showMessage('Unable to load this record for WhatsApp sharing.', 'red-darken-2')
      return
    }

    const mergedEntry = {
      ...fullEntry,
      recordIdentifier: fullEntry.recordIdentifier || fullEntry.id || recordId,
    }

    const downloadLink = buildPdfDownloadLink(recordId)
    const whatsappText = buildWhatsAppText(entry, downloadLink)
    const pdfBlob = await createSubmissionPdf(mergedEntry)
    const fileName = buildSubmissionPdfFileName(mergedEntry, recordId)
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' })

    if (process.client && navigator.share) {
      const canShareWithFiles = typeof navigator.canShare === 'function'
        ? navigator.canShare({ files: [pdfFile] })
        : false

      if (canShareWithFiles) {
        await navigator.share({
          title: 'രജിസ്ട്രേഷൻ വിശദാംശങ്ങൾ',
          text: whatsappText,
          files: [pdfFile],
        })
        showMessage('WhatsApp തുറന്നു. PDF ഷെയർ ചെയ്യാൻ Share sheet-ൽ WhatsApp തിരഞ്ഞെടുക്കാം.', 'green-darken-2')
        return
      }
    }

    await shareOrDownloadPdf(pdfBlob, fileName, {
      shareTitle: 'രജിസ്ട്രേഷൻ വിശദാംശങ്ങൾ',
      shareText: whatsappText,
    })

    showMessage('WhatsApp തുറന്നു. PDF ഡൗൺലോഡ് ചെയ്തു, ആവശ്യമായാൽ അറ്റാച്ച് ചെയ്ത് അയയ്ക്കുക.', 'blue-darken-2')
  } catch (error: any) {
    if (error?.name !== 'AbortError') {
      console.error('WhatsApp share failed:', error)
      showMessage('WhatsApp-ലേക്ക് PDF ചേർത്ത് അയയ്ക്കാൻ കഴിഞ്ഞില്ല.', 'red-darken-2')
    }
  } finally {
    whatsappLoadingById.value = {
      ...whatsappLoadingById.value,
      [recordId]: false,
    }
  }
}

const logout = async () => {
  clearToken()
  await router.push('/admin/login')
}

onMounted(async () => {
  await loadEntries()
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/grandview');

.admin-entries-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

.header-gradient {
  background: linear-gradient(135deg, #102c57 0%, #1f5fa8 100%);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.panel-card {
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.entry-card {
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  cursor: pointer;
  background: white;
}

.entry-card:hover {
  transform: translateY(-3px);
  border-color: #1976d2 !important;
}

.color-primary {
  color: #0d47a1;
}

.grandview-font {
  font-family: 'Grandview', sans-serif;
}

.text-truncate-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.entry-name,
.id-text {
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (max-width: 600px) {
  .page-title {
    font-size: 1.5rem !important;
    line-height: 1.2;
  }

  .header-gradient {
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
  }

  .header-actions {
    width: 100%;
  }

  .header-action-btn {
    flex: 1 1 calc(50% - 8px);
    min-width: 132px;
  }

  .entry-content {
    padding: 12px !important;
    gap: 12px !important;
  }

  .pagination-wrap {
    justify-content: center !important;
  }

  .pagination-wrap > .text-body-2 {
    width: 100%;
    text-align: center;
  }

  .pagination-control {
    width: 100%;
    justify-content: center;
  }
}
</style>