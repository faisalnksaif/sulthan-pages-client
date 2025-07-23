<template>
  <div style="height: 80vh; position: relative">
    <v-parallax scale=".5" src="/home.jpg" style="height: 80vh;">
      <div style="background: rgba(0, 0, 0, 0.6); height: 100%">
        <div class="d-flex align-center flex-row justify-center fill-height">
          <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <!-- <h1 class="text-h2 font-weight-bold mb-4 poppins-bold text-center">
              Sulthan Pages
            </h1> -->
            <div class="logo-wrapper">
              <img class="logo" src="/logo.png" style="width: 20em; ">
            </div>
            <div class="typewriter pl-4">
              <h3 class="subheading ">
                "A Call to Thawheed"
              </h3>

            </div>
          </div>
        </div>
      </div>
    </v-parallax>

    <div class="image">
      <Transition name="slide-fade">
        <img v-if="showImage" src="/mahan.png">
      </Transition>
    </div>
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
  /* Ensures the content is not revealed until the animation */
  border-right: .15em solid green;
  /* The typwriter cursor */
  white-space: nowrap;
  /* Keeps the content on a single line */
  margin: 0 auto;
  /* Gives that scrolling effect as the typing happens */
  letter-spacing: .1em;
  /* Adjust as needed */
  animation:
    typing 3.5s steps(30, end),
    blink-caret 2s step-end infinite;
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
    border-color: green
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
  /* transform: translateX(200px); */
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

.logo-wrapper {
  /* background-color: white; */
}

.logo {
  filter: brightness(0) invert(1);
}
</style>
