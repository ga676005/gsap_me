<script setup lang="ts">
const links = [
  {
    name: '01.tween_basic',
    path: '01_gsap_express/01.tween_basic',
  },
  {
    name: '02.timeline_basic',
    path: '01_gsap_express/02.timeline_basic',
  },
  {
    name: '03.position_parameter',
    path: '01_gsap_express/03.position_parameter',
  },
  {
    name: '04.animated_buttons',
    path: '01_gsap_express/04.animated_buttons',
  },
  {
    name: '05.animated_buttons_in_vFor',
    path: '01_gsap_express/05.animated_buttons_in_vFor',
  },
]
</script>

<template>
  <UContainer>
    <div class="grid gap-2">
      <UButton v-for="link in links" :key="link.path" class="button" :to="link.path">
        {{ link.name }}
      </UButton>
    </div>
  </UContainer>
</template>

<style scoped>
</style>
