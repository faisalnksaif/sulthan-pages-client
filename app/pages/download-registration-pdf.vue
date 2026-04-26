<template>
  <div class="download-page pa-4 pa-sm-8">
    <v-card class="mx-auto" max-width="720" rounded="xl" elevation="8">
      <v-card-title class="text-h6 font-weight-bold">
        Registration PDF Download
      </v-card-title>

      <v-card-text>
        <p class="text-body-1 mb-3">{{ statusMessage }}</p>
        <p v-if="recordId" class="text-caption text-grey-darken-1 mb-4">
          Record ID: {{ recordId }}
        </p>

        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          density="comfortable"
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>

        <v-btn
          color="primary"
          rounded="pill"
          :loading="isGenerating"
          @click="generateAndDownload"
        >
          Download PDF
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {
  buildSubmissionPdfFileName,
  createSubmissionPdf,
  extractRecordPayload,
  normalizeFamilyMembers,
  type FormSubmissionDetails,
} from '~/utils/registration-pdf'

const config = useRuntimeConfig()
const apiBaseUrl = config.public.registrationApiBase || 'http://localhost:4000'
const route = useRoute()

const isGenerating = ref(false)
const errorMessage = ref('')
const statusMessage = ref('Preparing PDF download...')

const recordId = computed(() => {
  const value = route.query.recordId
  return typeof value === 'string' ? value.trim() : ''
})

const downloadBlob = (blob: Blob, fileName: string) => {
  if (!process.client) {
    return
  }

  const blobUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = blobUrl
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(blobUrl)
}

const fetchFullEntry = async (id: string): Promise<FormSubmissionDetails | null> => {
  const response = await $fetch(`${apiBaseUrl}/api/public/form-submissions/${id}`, {
    method: 'GET',
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

const generateAndDownload = async () => {
  if (!recordId.value) {
    errorMessage.value = 'Missing record ID in the link.'
    statusMessage.value = 'Unable to continue.'
    return
  }

  isGenerating.value = true
  errorMessage.value = ''
  statusMessage.value = 'Generating PDF...'

  try {
    const fullEntry = await fetchFullEntry(recordId.value)
    if (!fullEntry) {
      throw new Error('Record not found')
    }

    const normalizedEntry = {
      ...fullEntry,
      recordIdentifier: fullEntry.recordIdentifier || fullEntry.id || recordId.value,
    }

    const pdfBlob = await createSubmissionPdf(normalizedEntry)
    const fileName = buildSubmissionPdfFileName(normalizedEntry, recordId.value)
    downloadBlob(pdfBlob, fileName)

    statusMessage.value = 'PDF downloaded successfully.'
  } catch (error) {
    console.error('Download PDF page failed:', error)
    errorMessage.value = 'Unable to generate this PDF from the link.'
    statusMessage.value = 'Please try again later.'
  } finally {
    isGenerating.value = false
  }
}

onMounted(async () => {
  await generateAndDownload()
})
</script>

<style scoped>
.download-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}
</style>
