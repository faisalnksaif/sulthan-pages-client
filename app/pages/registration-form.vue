<template>
  <div class="form-page py-10 px-4 px-sm-6">
    <div class="mx-auto" style="max-width: 920px;">

      <div class="mb-6 pa-6 pa-sm-8 rounded-lg text-center">
        <h1 class="text-h4 text-sm-h3 font-weight-black mb-2 color-primary grandview-font">Quthubuzzaman Center</h1>
      </div>

      <v-form ref="formRef" @submit.prevent="submitForm">

        <!-- <h2 class="text-h5 malayalam-font text-blue-darken-3 mb-3">വ്യക്തിവിവരങ്ങൾ</h2> -->

        <v-card class="mb-5 section-card " elevation="2" rounded="lg">

          <v-card-text>
            <div class="text-h6 malayalam-font color-primary mb-3">വ്യക്തിവിവരങ്ങൾ</div>

            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.name" label="പേര് (Name)" variant="outlined" density="comfortable"
                  color="primary" />
              </v-col>
              <!-- <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.serialNo"
                  label="SERIAL NO"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col> -->
              <v-col cols="12" md="6">
                <v-text-field v-model="form.phone" label="ഫോൺ നമ്പർ (Phone Number)" variant="outlined"
                  density="comfortable" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.baiathYear" label="ബൈഅത്ത് ചെയ്‌ത വർഷം (Year of Bai'ath)" variant="outlined"
                  density="comfortable" />
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="form.age" label="വയസ്സ് (Age)" variant="outlined" density="comfortable"
                  type="number" />
              </v-col>
              <v-col cols="6" md="6">
                <v-select v-model="form.bloodGroup" label="രക്തഗ്രൂപ്പ് (Blood Group)" variant="outlined"
                  density="comfortable" :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea v-model="form.permanentAddress" label="സ്ഥിരമായ വിലാസം (Permanent Address)"
                  variant="outlined" density="comfortable" rows="2" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="form.currentAddress" label="നിലവിലെ വിലാസം (Current Address)" variant="outlined"
                  density="comfortable" rows="2" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.education" label="വിദ്യഭ്യാസം (Education)" variant="outlined"
                  density="comfortable" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.job" label="ജോലി (Job)" variant="outlined" density="comfortable" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.hobbies" label="വിനോദങ്ങൾ (Hobbies)" variant="outlined"
                  density="comfortable" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>



        <v-card class="mb-5 section-card" elevation="2" rounded="lg">
          <v-card-title class="d-flex align-center justify-space-between py-4 px-4 px-sm-6">
            <span class="text-h6 malayalam-font color-primary">കുടുംബാംഗങ്ങൾ</span>
            <v-btn color="blue-darken-3" variant="tonal" prepend-icon="mdi-plus" class="text-none"
              @click="addFamilyMember">
              ADD MEMBER
            </v-btn>
          </v-card-title>

          <v-card-text class="pa-4 bg-grey-lighten-4">
            <v-row>
              <v-col v-for="(member, index) in form.familyMembers" :key="'member-' + index" cols="12" md="6">
                <v-card class="rounded-lg border-blue" elevation="1">
                  <v-toolbar density="compact" color="blue-lighten-5" flat>
                    <v-toolbar-title class="text-subtitle-2 font-weight-bold color-primary">Member #{{ index + 1
                    }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" size="x-small" variant="text" color="red" @click="removeMember(index)"
                      :disabled="form.familyMembers.length === 1" />
                  </v-toolbar>
                  <v-card-text class="pa-4">
                    <v-row dense>
                      <v-col cols="12"><v-text-field v-model="member.name" label="പേര്" variant="outlined"
                          density="comfortable" /></v-col>
                      <v-col cols="6">
                        <v-text-field v-model="member.age" label="വയസ്സ്" variant="outlined" density="comfortable"
                          type="number" min="0" />
                      </v-col>
                      <v-col cols="6">
                        <v-select v-model="member.blood" label="രക്തഗ്രൂപ്പ്" variant="outlined" density="comfortable"
                          :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']" />
                      </v-col>
                      <v-col cols="12"><v-text-field v-model="member.edu" label="വിദ്യാഭ്യാസം" variant="outlined"
                          density="comfortable" /></v-col>
                      <v-col cols="6"><v-checkbox v-model="member.baiath" label="ബൈഅത്ത്" density="comfortable"
                          color="primary" hide-details /></v-col>
                      <v-col cols="6"><v-checkbox v-model="member.married" label="വിവാഹം" density="comfortable"
                          color="primary" hide-details /></v-col>
                      <v-col cols="12"><v-text-field v-model="member.job" label="ജോലി" variant="outlined"
                          density="comfortable" hide-details /></v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="mb-5 section-card" elevation="2" rounded="lg">
          <v-card-title class="malayalam-font color-primary px-6 pt-4">മറ്റു വിവരങ്ങൾ</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.lit" label="സാഹിത്യം" variant="outlined"
                  density="comfortable" /></v-col>
              <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.sports" label="കായികം" variant="outlined"
                  density="comfortable" /></v-col>
              <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.martial" label="ആയോധനം" variant="outlined"
                  density="comfortable" /></v-col>
              <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.cultural" label="സാംസ്‌കാരികം"
                  variant="outlined" density="comfortable" /></v-col>
              <v-col cols="12">
                <p class="text-body-2 mb-2 font-weight-bold">ഏതെങ്കിലും സംഘടനയിൽ പ്രവർത്തിക്കുന്നുണ്ടോ? (ഉണ്ടെങ്കിൽ
                  വിവരിക്കുക)</p>
                <v-row>
                  <v-col cols="12" md="6"><v-text-field v-model="form.politics" label="രാഷ്ട്രീയം" variant="outlined"
                      density="comfortable" /></v-col>
                  <v-col cols="12" md="6"><v-text-field v-model="form.position" label="ഭാരവാഹിത്വം" variant="outlined"
                      density="comfortable" /></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <div class="submit-actions d-flex flex-wrap ga-3 justify-end mt-6 mb-10">
          <v-btn class="action-btn" variant="text" color="grey-darken-1" @click="resetForm">Clear All</v-btn>
          <v-btn class="action-btn px-8" type="submit" color="blue-darken-3" variant="flat">Submit Form</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initialMember = () => ({ name: '', age: '', blood: '', edu: '', baiath: false, married: false, job: '' })

const form = ref({
  name: '',
  serialNo: '',
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

const addFamilyMember = () => {
  form.value.familyMembers.push(initialMember())
}

const removeMember = (index: number) => {
  form.value.familyMembers.splice(index, 1)
}

const resetForm = () => {
  if (confirm("Are you sure you want to clear the form?")) {
    location.reload()
  }
}

const submitForm = () => {
  console.log('Final Submission Data:', form.value)
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/grandview');

.form-page {
  background-color: #f0f4f8;
  min-height: 100vh;
}

.header-card {
  background: #ffffff;
  border-top: 10px solid #1565C0;
  box-shadow: 0 10px 25px rgba(21, 101, 192, 0.1);
}

.section-card {
  border-left: 6px solid #1976D2;
  background: #ffffff;
  overflow: hidden;
}

.color-primary {
  color: #0D47A1;
}

.malayalam-font {
  font-family: 'Meera', 'Kartika', sans-serif;
  font-weight: 600;
}

.grandview-font {
  font-family: 'Grandview', 'Times New Roman', serif;
}

.border-blue {
  border: 1px solid #BBDEFB !important;
}

@media (max-width: 600px) {
  .action-btn {
    width: 100%;
  }

  .submit-actions {
    flex-direction: column-reverse;
  }
}
</style>