<script setup lang="ts">
import { gsap } from 'gsap'

gsap.defaults({ duration: 0.2 })

function setup() {
  const tl = gsap.timeline({ paused: true })
  tl.to('[data-dot]', { scale: 1.2, backgroundColor: 'white' })
    .to('[data-text]', { color: 'white', scale: 1.2, x: 6, transformOrigin: 'left' }, '<')

  const item = document.querySelector('[data-item]')
  item?.addEventListener('mouseenter', () => {
    tl.play()
  })
  item?.addEventListener('mouseleave', () => {
    tl.reverse()
  })
}

let tl: GSAPTimeline
const item = useTemplateRef('item')
const dot = useTemplateRef('dot')
const text = useTemplateRef('text')

function onMouseEnter() {
  tl.play()
}

function onMouseLeave() {
  tl.reverse()
}

onMounted(() => {
  // js
  setup()

  // vue
  tl = gsap.timeline({ paused: true })
  tl.to(dot.value, { scale: 1.2, backgroundColor: 'orange' })
    .to(text.value, { color: 'orange', scale: 1.2, x: 6, transformOrigin: 'left' }, '<')
})
</script>

<template>
  <div class="w-screen h-screen grid place-content-center bg-gray-700">
    <div data-item class="flex gap-2 items-center">
      <!-- 不能用 tailwind 的顏色，因為有透明值，
       這樣顏色在 transition 時透明值也會變，會吃到背景色  -->
      <div data-dot class="size-4 rounded-full" style="background-color: orange;" />
      <button data-text style="color: orange">
        HOME
      </button>
    </div>

    <div ref="item" class="flex gap-2 items-center" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
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
