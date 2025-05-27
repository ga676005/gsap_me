<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { gsap } from 'gsap'

gsap.defaults({ duration: 0.2 })

const links = shallowRef([{
  name: 'HOME',
  animatedComposable: useAnimatedButton(),
}, {
  name: 'ABOUT',
  animatedComposable: useAnimatedButton(),
}, {
  name: 'CONTACT',
  animatedComposable: useAnimatedButton(),
}])

function useAnimatedButton() {
  const item = shallowRef<HTMLElement>()
  const dot = shallowRef<HTMLElement>()
  const text = shallowRef<HTMLElement>()

  let tl: GSAPTimeline = gsap.timeline({ paused: true })

  function setupTimeline() {
    if (!item.value || !dot.value || !text.value) {
      return
    }
    tl = gsap.timeline({ paused: true })
    tl.to(dot.value, { scale: 1.2, backgroundColor: 'white' })
      .to(text.value, { color: 'white', scale: 1.2, x: 6, transformOrigin: 'left' }, '<')
  }

  watchEffect(() => {
    setupTimeline()
  })

  function setTemplateRef(el: Element | ComponentPublicInstance | null, name: 'item' | 'dot' | 'text') {
    if (!el)
      return

    const element = '$el' in el ? (el.$el as HTMLElement) : (el as HTMLElement)

    if (name === 'item') {
      item.value = element
    }
    else if (name === 'dot') {
      dot.value = element
    }
    else if (name === 'text') {
      text.value = element
    }
  }

  function play() {
    tl.play()
  }

  function reverse() {
    tl.reverse()
  }

  return {
    tl,
    item,
    play,
    reverse,
    setTemplateRef,
  }
}

const toggle = ref(true)
</script>

<template>
  <div class="w-screen h-screen grid place-content-center bg-gray-700">
    <button class="bg-white select-none" @click="toggle = !toggle">
      toggle
    </button>

    <div v-if="toggle">
      <div
        v-for="link in links"
        :key="link.name"
        :ref="el => link.animatedComposable.setTemplateRef(el, 'item')"
        class="flex gap-2 items-center"
        @mouseenter="link.animatedComposable.play"
        @mouseleave="link.animatedComposable.reverse"
      >
        <div
          :ref="el => link.animatedComposable.setTemplateRef(el, 'dot')"
          class="size-4 rounded-full"
          style="background-color: white;"
        />
        <button
          :ref="el => link.animatedComposable.setTemplateRef(el, 'text')"
          style="color: white"
        >
          {{ link.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
