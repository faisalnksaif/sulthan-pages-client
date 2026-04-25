<template>
  <div class="form-page pb-12">
    <div class="header-gradient pt-10 pb-16 px-4">
      <div class="mx-auto" style="max-width: 920px;">
        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <h1 class="text-h4 font-weight-black text-white mb-1 grandview-font">Quthubuzzaman Center</h1>
            <div class="d-flex align-center">
              <v-badge dot color="success" class="mr-2" inline></v-badge>
              <span class="text-blue-lighten-4 text-caption font-weight-bold text-uppercase tracking-wider">Registration
                Portal</span>
            </div>
          </div>
          <v-btn variant="tonal" color="white" rounded="xl" prepend-icon="mdi-format-list-bulleted"
            to="/registration-entries" class="text-none">
            My Entries
          </v-btn>
        </div>
      </div>
    </div>

    <div class="mx-auto px-4 mt-n10" style="max-width: 920px;">
      <v-form @submit.prevent="submitForm">
        <v-card class="main-form-card" elevation="12" rounded="xl">
          <div class="pa-6 border-b">
            <div class="d-flex align-center justify-space-between mb-6">
              <div class="malayalam-font text-h5 font-weight-bold color-primary">രജിസ്ട്രേഷൻ ഫോം</div>
              <v-chip color="primary" variant="flat" size="small" class="font-weight-bold">
                STEP {{ currentStepIndex }} / {{ totalSteps }}
              </v-chip>
            </div>

            <div class="step-progress-container">
              <div v-for="n in totalSteps" :key="n" class="step-dot" :class="{ 'active': currentStepIndex >= n }"></div>
              <div class="step-line">
                <div class="step-line-fill" :style="{ width: ((currentStepIndex - 1) / (totalSteps - 1)) * 100 + '%' }">
                </div>
              </div>
            </div>
          </div>

          <v-card-text class="pa-6 pa-sm-10">
            <v-window v-model="currentStep">

              <v-window-item :value="1">
                <div class="section-title malayalam-font mb-6">വ്യക്തിഗത വിവരങ്ങൾ (Personal Details)</div>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="form.name" label="പേര് (Full Name)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" prepend-inner-icon="mdi-account" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.phone" label="ഫോൺ നമ്പർ (Phone)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" prepend-inner-icon="mdi-phone" type="tel"
                      inputmode="numeric" pattern="[0-9]*" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.baiathYear" label="ബൈഅത്ത് വർഷം (Year)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" prepend-inner-icon="mdi-calendar-check"
                      inputmode="numeric" min="0" />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="form.age" label="വയസ്സ് (Age)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" type="number" inputmode="numeric" min="0" />
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="form.bloodGroup" :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                      label="Blood Group" variant="outlined" bg-color="blue-grey-lighten-10" rounded="lg" />
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item :value="2">
                <div class="section-title malayalam-font mb-6">സ്ഥലവും തൊഴിലും (Location & Profession)</div>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="form.permanentAddress" label="സ്ഥിരമായ വിലാസം (Permanent Address)"
                      variant="outlined" bg-color="blue-grey-lighten-10" rounded="lg" rows="2" />
                  </v-col>

                  <v-col cols="12" class="py-0">
                    <v-checkbox v-model="sameAsPermanent"
                      label="നിലവിലെ വിലാസവും ഇത് തന്നെയാണ് (Same as Permanent Address)" color="primary" hide-details
                      density="compact" @change="handleAddressSync" />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea v-model="form.currentAddress" label="നിലവിലെ വിലാസം (Current Address)"
                      variant="outlined" bg-color="blue-grey-lighten-10" rounded="lg" rows="2"
                      :disabled="sameAsPermanent" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field v-model="form.education" label="വിദ്യാഭ്യാസം (Education)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="form.job" label="ജോലി (Job)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="form.hobbies" label="വിനോദങ്ങൾ (Hobbies)" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" />
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item :value="3">
                <div class="d-flex align-center justify-space-between mb-6">
                  <div class="section-title malayalam-font">കുടുംബാംഗങ്ങൾ (Family Members)</div>
                  <v-btn color="primary" variant="flat" rounded="pill" size="small" prepend-icon="mdi-plus"
                    @click="addFamilyMember">Add Member</v-btn>
                </div>
                <v-row>
                  <v-col v-for="(member, index) in form.familyMembers" :key="index" cols="12" md="6">
                    <v-card class="member-card pa-4 rounded-xl border" elevation="0">
                      <div class="d-flex justify-space-between align-center mb-4">
                        <span class="text-subtitle-2 font-weight-bold color-primary">Member #{{ index + 1 }}</span>
                        <v-btn icon="mdi-close" color="red-lighten-1" variant="text" size="small"
                          @click="removeMember(index)" :disabled="form.familyMembers.length === 1" />
                      </div>
                      <v-row dense>
                        <v-col cols="12"><v-text-field v-model="member.name" label="പേര്" variant="outlined"
                            bg-color="blue-grey-lighten-10" density="comfortable" /></v-col>

                        <v-col cols="12"><v-text-field v-model="member.relation" label="ബന്ധം" variant="outlined"
                            bg-color="blue-grey-lighten-10" density="comfortable" /></v-col>

                        <v-col cols="6"><v-text-field v-model="member.age" label="വയസ്സ്" variant="outlined"
                            bg-color="blue-grey-lighten-10" density="comfortable" type="number" inputmode="numeric"
                            min="0" /></v-col>
                        <v-col cols="6"><v-select v-model="member.blood"
                            :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']" label="Blood" variant="outlined"
                            bg-color="blue-grey-lighten-10" density="comfortable" /></v-col>
                        <v-col cols="12" class="d-flex ga-4">
                          <v-checkbox v-model="member.baiath" label="ബൈഅത്ത്" color="primary" density="compact"
                            hide-details />
                          <v-checkbox v-model="member.married" label="വിവാഹം" color="primary" density="compact"
                            hide-details />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item :value="4">
                <div class="section-title malayalam-font mb-6">സാമൂഹിക പ്രവർത്തനങ്ങൾ (Social & Activities)</div>
                <v-row>
                  <v-col cols="6" md="3"><v-text-field v-model="form.lit" label="സാഹിത്യം" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" /></v-col>
                  <v-col cols="6" md="3"><v-text-field v-model="form.sports" label="കായികം" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" /></v-col>
                  <v-col cols="6" md="3"><v-text-field v-model="form.martial" label="ആയോധനം" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" /></v-col>
                  <v-col cols="6" md="3"><v-text-field v-model="form.cultural" label="സാംസ്‌കാരികം" variant="outlined"
                      bg-color="blue-grey-lighten-10" rounded="lg" /></v-col>
                  <v-col cols="12">
                    <v-divider class="my-4" />
                    <v-row>
                      <v-col cols="12" md="6"><v-text-field v-model="form.politics" label="രാഷ്ട്രീയം"
                          variant="outlined" bg-color="blue-grey-lighten-10" rounded="lg" /></v-col>
                      <v-col cols="12" md="6"><v-text-field v-model="form.position" label="ഭാരവാഹിത്വം"
                          variant="outlined" bg-color="blue-grey-lighten-10" rounded="lg" /></v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>

            <div class="d-flex justify-space-between align-center mt-10">
              <v-btn v-if="currentStepIndex > 1" variant="text" color="grey-darken-2" prepend-icon="mdi-arrow-left"
                @click="prevStep">Back</v-btn>
              <div v-else></div>

              <v-btn v-if="currentStepIndex < totalSteps" color="primary" size="large" rounded="pill"
                class="px-10 text-none" @click="nextStep">
                Continue
              </v-btn>
              <v-btn v-else color="success" size="large" rounded="pill" class="px-10 text-none" :loading="isSubmitting"
                @click="submitForm">
                {{ isEditMode ? 'Update Record' : 'Submit Form' }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-form>
    </div>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" rounded="pill" elevation="10">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const config = useRuntimeConfig()
const apiBaseUrl = config.public.registrationApiBase || 'http://localhost:4000'
const route = useRoute()
const router = useRouter()

const STORAGE_DEVICE_ID = 'registrationForm.deviceIdentifier'
const DEVICE_ID_COOKIE_KEY = STORAGE_DEVICE_ID

const generateDeviceId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `dev-${crypto.randomUUID()}`
  }
  return `dev-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`
}

const getCookieValue = (key: string) => {
  if (!process.client) {
    return ''
  }

  const prefix = `${key}=`
  const entry = document.cookie
    .split('; ')
    .find((item) => item.startsWith(prefix))

  return entry ? decodeURIComponent(entry.slice(prefix.length)) : ''
}

const getStoredDeviceId = () => {
  if (!process.client) {
    return ''
  }

  try {
    const value = localStorage.getItem(STORAGE_DEVICE_ID) || ''
    if (value) {
      return value
    }
  } catch {
    // Ignore storage access errors and fall back to cookies.
  }

  return getCookieValue(DEVICE_ID_COOKIE_KEY)
}

const persistDeviceId = (value: string) => {
  if (!process.client || !value) {
    return
  }

  try {
    localStorage.setItem(STORAGE_DEVICE_ID, value)
  } catch {
    // Ignore storage access errors and keep cookie as fallback.
  }

  document.cookie = `${DEVICE_ID_COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`
}

const ensureDeviceId = (fallback = '') => {
  const existing = getStoredDeviceId()
  const next = existing || fallback || generateDeviceId()

  persistDeviceId(next)
  return next
}

const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('green-darken-2')
const currentStep = ref(1)
const isSubmitting = ref(false)
const totalSteps = 4
const sameAsPermanent = ref(false)
const deviceIdentifier = ref('')
const currentRecordId = ref('')
const isEditMode = ref(false)

const initialMember = () => ({ name: '', relation: '', age: '', blood: '', edu: '', baiath: false, married: false, job: '' })

const initialForm = () => ({
  deviceIdentifier: '',
  recordIdentifier: '',
  name: '',
  phone: '',
  baiathYear: '',
  age: '',
  bloodGroup: '',
  permanentAddress: '',
  currentAddress: '',
  education: '',
  job: '',
  hobbies: '',
  lit: '',
  sports: '',
  martial: '',
  cultural: '',
  politics: '',
  position: '',
  familyMembers: [initialMember()]
})

const form = ref(initialForm())

const showMessage = (msg: string, color = 'green-darken-2') => {
  snackbarMessage.value = msg
  snackbarColor.value = color
  showSnackbar.value = true
}

const normalizeRecordPayload = (payload: any) => {
  const source = payload && typeof payload === 'object' ? payload : {}
  const normalized = {
    ...initialForm(),
    ...source,
  }

  const members = Array.isArray(source.familyMembers) ? source.familyMembers : []
  normalized.familyMembers = members.length
    ? members.map((member: any) => ({ ...initialMember(), ...(member || {}) }))
    : [initialMember()]

  return normalized
}

const extractRecordPayload = (response: any) => {
  if (!response) return null
  if (Array.isArray(response)) return response[0] || null
  if (response.data) {
    if (Array.isArray(response.data)) return response.data[0] || null
    return response.data
  }
  if (response.submission) return response.submission
  return response
}

const loadRecord = async (recordId: string) => {
  try {
    const byPath = await $fetch(`${apiBaseUrl}/api/public/form-submissions/${recordId}`, {
      method: 'GET',
    })
    const payload = extractRecordPayload(byPath)
    if (payload) return payload
  } catch {
    // Fallback to query endpoint.
  }

  try {
    const byQuery = await $fetch(`${apiBaseUrl}/api/public/form-submissions`, {
      method: 'GET',
      query: {
        recordIdentifier: recordId,
        deviceIdentifier: deviceIdentifier.value || undefined,
      },
    })
    return extractRecordPayload(byQuery)
  } catch {
    return null
  }
}

const handleAddressSync = () => {
  if (sameAsPermanent.value) {
    form.value.currentAddress = form.value.permanentAddress
  }
}

watch(() => form.value.permanentAddress, (newVal) => {
  if (sameAsPermanent.value) {
    form.value.currentAddress = newVal
  }
})

const currentStepIndex = computed(() => Number(currentStep.value))

const nextStep = () => {
  if (currentStepIndex.value === 1 && (!form.value.name || !form.value.phone)) {
    showMessage('Please provide Name and Phone', 'orange-darken-2')
    return
  }
  currentStep.value++
}

const prevStep = () => {
  if (currentStepIndex.value > 1) currentStep.value--
}

const addFamilyMember = () => form.value.familyMembers.push(initialMember())
const removeMember = (index: number) => form.value.familyMembers.splice(index, 1)

const submitForm = async () => {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    form.value.deviceIdentifier = deviceIdentifier.value
    form.value.recordIdentifier = currentRecordId.value

    if (isEditMode.value && currentRecordId.value) {
      await $fetch(`${apiBaseUrl}/api/public/form-submissions/${currentRecordId.value}`, {
        method: 'PUT',
        body: form.value,
      })
      showMessage('Registration updated successfully!')
    } else {
      const response: any = await $fetch(`${apiBaseUrl}/api/public/form-submissions`, {
        method: 'POST',
        body: form.value,
      })

      const created = extractRecordPayload(response)
      const createdId = created?.recordIdentifier || created?.id || ''
      if (createdId) {
        currentRecordId.value = createdId
        form.value.recordIdentifier = createdId
      }

      isEditMode.value = true
      showMessage('Registration submitted successfully!')
    }

    await router.push('/registration-entries')
  } catch (e) {
    console.error('Form submit failed:', e)
    showMessage('Error submitting form', 'red-darken-2')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  if (!process.client) {
    return
  }

  deviceIdentifier.value = ensureDeviceId()

  const recordId = ((route.query.recordId as string) || '').trim()
  if (!recordId) {
    return
  }

  currentRecordId.value = recordId
  const payload = await loadRecord(recordId)

  if (!payload) {
    showMessage('Unable to load this record.', 'red-darken-2')
    return
  }

  form.value = normalizeRecordPayload(payload)
  const persistedDeviceId = payload?.deviceIdentifier || deviceIdentifier.value
  deviceIdentifier.value = ensureDeviceId(persistedDeviceId)
  form.value.deviceIdentifier = deviceIdentifier.value
  form.value.recordIdentifier = recordId
  isEditMode.value = true
  showMessage('Record loaded. You can edit and update it now.', 'blue-darken-2')
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/grandview');

.form-page {
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
}

.section-title {
  font-size: 1rem;
  font-weight: 800;
  color: #1a237e;
  letter-spacing: 0.5px;
}

.color-primary {
  color: #0d47a1;
}

.malayalam-font {
  font-family: 'Meera', 'Kartika', sans-serif;
}

.step-progress-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-dot {
  width: 10px;
  height: 10px;
  background: #cbd5e1;
  border-radius: 50%;
  z-index: 2;
  transition: 0.3s;
}

.step-dot.active {
  background: #1976d2;
  transform: scale(1.4);
}

.step-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #e2e8f0;
  transform: translateY(-50%);
  z-index: 1;
}

.step-line-fill {
  height: 100%;
  background: #1976d2;
  transition: 0.4s ease;
}

.member-card {
  background: #fff;
  transition: 0.2s;
}
</style>