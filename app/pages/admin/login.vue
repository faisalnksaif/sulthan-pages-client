<template>
  <div class="admin-login-page pb-12">
    <div class="header-gradient pt-12 pb-20 px-4">
      <div class="mx-auto" style="max-width: 520px;">
        <div class="text-center text-white">
          <div class="text-overline font-weight-bold tracking-wider mb-2">ADMIN ACCESS</div>
          <h1 class="text-h4 font-weight-black grandview-font mb-2">Registration Admin</h1>
          <p class="text-body-2 text-blue-lighten-4">Sign in to view all registration entries.</p>
        </div>
      </div>
    </div>

    <div class="mx-auto px-4 mt-n30" style="max-width: 520px;">
      <v-card class="login-card" elevation="14" rounded="xl">
        <v-card-text class="pa-6 pa-sm-8">
          <v-form @submit.prevent="submitLogin">
            <v-text-field
              v-model="email"
              label="Email"
              variant="outlined"
              bg-color="blue-grey-lighten-10"
              rounded="lg"
              prepend-inner-icon="mdi-email-outline"
              autocomplete="email"
              class="mb-3"
            />

            <v-text-field
              v-model="password"
              label="Password"
              variant="outlined"
              bg-color="blue-grey-lighten-10"
              rounded="lg"
              prepend-inner-icon="mdi-lock-outline"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              autocomplete="current-password"
            />

            <v-checkbox
              v-model="rememberMe"
              label="Remember on this device"
              color="primary"
              hide-details
              density="comfortable"
              class="mb-4"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              rounded="pill"
              block
              class="text-none font-weight-bold"
              :loading="isSubmitting"
            >
              Continue to Admin
            </v-btn>
          </v-form>

          <div class="text-caption text-grey-darken-1 mt-4">
            Sign in with your Keystone user account. Your session token is stored in your browser.
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" rounded="pill" elevation="10">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.registrationApiBase || 'http://localhost:4000'
const { setToken, getToken } = useAdminSession()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isSubmitting = ref(false)
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('green-darken-2')

const showMessage = (message: string, color = 'green-darken-2') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  showSnackbar.value = true
}

const submitLogin = async () => {
  const trimmedEmail = email.value.trim()
  const trimmedPassword = password.value.trim()

  if (!trimmedEmail || !trimmedPassword) {
    showMessage('Email and password are required.', 'orange-darken-2')
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{
      ok?: boolean
      sessionToken?: string
      message?: string
    }>(`${apiBaseUrl}/api/public/login`, {
      method: 'POST',
      body: {
        email: trimmedEmail,
        password: trimmedPassword,
      },
    })

    if (!response?.ok || !response.sessionToken) {
      showMessage(response?.message || 'Invalid credentials.', 'red-darken-2')
      return
    }

    setToken(response.sessionToken, rememberMe.value)
    const redirect = (route.query.redirect as string) || '/admin/registration-entries'
    await router.push(redirect)
  } catch (error: any) {
    const status = error?.status || error?.response?.status
    const message = error?.data?.message || error?.response?._data?.message

    if (status === 400 || status === 401) {
      showMessage(message || 'Invalid email or password.', 'red-darken-2')
      return
    }

    showMessage(message || 'Unable to login right now.', 'red-darken-2')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  if (!process.client) {
    return
  }

  if (getToken()) {
    const redirect = (route.query.redirect as string) || '/admin/registration-entries'
    await router.replace(redirect)
  }
})
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/grandview');

.admin-login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f7fb 0%, #eef3f8 100%);
}

.header-gradient {
  background: linear-gradient(135deg, #102c57 0%, #1f5fa8 100%);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.login-card {
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.grandview-font {
  font-family: 'Grandview', sans-serif;
}
</style>