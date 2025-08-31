<template>
  <div style="height: 80vh; position: relative">
    <v-parallax scale=".5" src="/home.jpg" style="height: 80vh;">
      <div style="background: rgba(0, 0, 0, 0.7); height: 100%">
        <div class="d-flex align-center flex-row justify-center fill-height">
          <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <!-- <h1 class="text-h2 font-weight-bold mb-4 poppins-bold text-center">
              Sulthan Pages
            </h1> -->
            <Transition name="slide-fade">
              <div v-if="showImage" class="logo-wrapper d-flex justify-center align-center">
                <img class="logo" src="/logo.png" loading="lazy">
              </div>
            </Transition>

            <div class="typewriter pl-4">
              <h3 class="subheading ">
                To Allah — through the true successors of the Prophet ﷺ
              </h3>

            </div>
          </div>
        </div>
      </div>
    </v-parallax>

    <!-- <div class="image">
      <Transition name="slide-fade">
        <img v-if="showImage" src="/mahan.png">
      </Transition>
    </div> -->
  </div>

</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const showImage = ref(false)

  onMounted(() => {
    showImage.value = true
  })
</script>
<style scoped>
.typewriter .subheading {
  color: #fff;
  font-family: monospace;
  overflow: hidden;
  font-size: 1em;
  /* The typwriter cursor */
  /* Keeps the content on a single line */
  margin: 0 auto;
  /* Gives that scrolling effect as the typing happens */
  letter-spacing: .1em;
  /* Adjust as needed */
}

@media screen and (max-width: 600px) {
  .typewriter .subheading {
    text-align: center;
  }
}

@media screen and (min-width: 600px) {
  .typewriter .subheading {
    white-space: nowrap;
    border-right: .15em solid rgba(235, 157, 13, 0.831);
    animation:
      typing 5s steps(50, end),
      blink-caret 2s step-end infinite;
  }
}

@media (max-width: 600px) {
  .typewriter .subheading {
    font-size: 1.3em;
  }
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {

  from,
  to {
    border-color: rgba(235, 157, 13, 0.831)
  }

  50% {
    border-color: transparent
  }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.image {
  position: absolute;
  z-index: 99999;
}

.image img {
  width: 120%
}

@media (max-width: 600px) {
  .image {
    right: 40px !important;
    bottom: -64px !important;
  }

  .image {
    width: 150px
  }
}

@media (max-width: 1320px) and (min-width: 600px) {
  .image {
    right: -80px;
    bottom: -114px;
  }

  .image img {
    width: 80%
  }
}

@media (max-width: 4500px) and (min-width: 1320px) {
  .image {
    bottom: -168px;
    right: 100px;
  }
}

.logo {
  width: 50%;
}

@media (max-width: 600px) {
  .logo {
    width: 80%;
  }
}
</style>
