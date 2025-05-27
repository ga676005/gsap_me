<script setup lang="ts">
import { gsap } from 'gsap'

gsap.defaults({ duration: 0.2 })

/**
 * 1. js
 */
function jsStyle() {
  const item = document.querySelector('[data-item]')
  const dot = item?.querySelector('[data-dot]')
  const text = item?.querySelector('[data-text]')
  if (!item || !dot || !text) {
    return
  }

  const tl = gsap.timeline({ paused: true })
  tl.to(dot, { scale: 1.2, backgroundColor: 'white' })
    .to(text, { color: 'white', scale: 1.2, x: 6, transformOrigin: 'left' }, '<')

  item?.addEventListener('mouseenter', () => {
    tl.play()
  })
  item?.addEventListener('mouseleave', () => {
    tl.reverse()
  })
}

onMounted(() => {
  jsStyle()
})

onUpdated(() => {
  jsStyle()
})

/**
 * 2. vue
 */

function useVueStyle() {
  let tl: GSAPTimeline
  const item = useTemplateRef('item')
  const dot = useTemplateRef('dot')
  const text = useTemplateRef('text')

  function play() {
    tl.play()
  }

  function reverse() {
    tl.reverse()
  }

  watchEffect(() => {
    if (!item.value || !dot.value || !text.value) {
      return
    }

    tl = gsap.timeline({ paused: true })
    tl.to(dot.value, { scale: 1.2, backgroundColor: 'orange' })
      .to(text.value, { color: 'orange', scale: 1.2, x: 6, transformOrigin: 'left' }, '<')
  })

  return {
    play,
    reverse,
  }
}

const { play, reverse } = useVueStyle()

const toggle = ref(true)
</script>

<template>
  <div class="w-screen h-screen grid place-content-center bg-gray-700">
    <button class="bg-white" @click="toggle = !toggle">
      toggle
    </button>
    <div v-if="toggle" data-item class="flex gap-2 items-center">
      <!-- 不能用 tailwind 的顏色，因為有透明值，
       這樣顏色在 transition 時透明值也會變，會吃到背景色  -->
      <div data-dot class="size-4 rounded-full" style="background-color: orange;" />
      <button data-text style="color: orange">
        HOME
      </button>
    </div>

    <div
      v-if="toggle"
      ref="item"
      class="flex gap-2 items-center"
      @mouseenter="play"
      @mouseleave="reverse"
    >
      <!-- 不能用 tailwind 的顏色，因為有透明值，
       這樣顏色在 transition 時透明值也會變，會吃到背景色  -->
      <div ref="dot" class="size-4 rounded-full" style="background-color: white;" />
      <button ref="text" style="color: white">
        HOME
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
