<template>
  <div id="contact-us" class="contact-us">
    <div class="mt-7" />
    <v-card-title class="d-flex justify-center flex-column align-center">
      <h2 class="heading poppins-extra-bold">Let’s Talk!</h2>
      <div class="poppins text-body-1 mb-1 mt-1 text-wrap text-center">
        Have a question? Drop us a message and we’ll get back to you.
      </div>
    </v-card-title>

    <div class="ml-lg-10 mr-lg-10">
      <div class="d-flex justify-space-around ml-md-10 mr-md-10">
        <v-text-field v-model="form.phone" class="ma-md-10 ma-2 poppins phone-field" label="Phone" required
          :rules="phoneRules" type="tel" variant="outlined" />

        <v-text-field v-model="form.email" class="ma-md-10 ma-2" label="Email" required :rules="emailRules"
          variant="outlined" />
      </div>
      <div class="ml-md-10 mr-md-10">
        <v-textarea v-model="form.message" class="ml-md-10 mr-md-10 ma-2 mt-1" label="Write here" required
          :rules="[v => !!v || 'Message is required']" variant="outlined" />
      </div>
    </div>

    <div class="text-center mb-10">
      <v-btn color="orange-darken-4" variant="tonal" @click="submitForm">
        Request a callback
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const form = ref({
  phone: '',
  email: '',
  message: '',
})

// Validation rules
const phoneRules = [
  (v: string) => !!v || 'Phone is required',
  (v: string) => /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(v) || 'Enter a valid phone number',
]

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email',
]

const submitForm = async () => {
  if (!form.value.phone || !form.value.email || !form.value.message) {
    alert('Please fill out all fields')
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('enq_name', '')
    params.append('enq_email', form.value.email)
    params.append('enq_phone', form.value.phone)
    params.append('enq_message', form.value.message)

    await axios.post('https://mail-sender.vingb.com/send/14d0748d-d1ab-4cd0-9bd7-a16d4ecf10b9', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    alert('Message sent!')
    form.value = { phone: '', email: '', message: '' }
  } catch (error) {
    console.error(error)
    alert('Something went wrong. Please try again later.')
  }
}
</script>

<style scoped>
.contact-us {
  padding-top: 30px !important;
}
</style>
