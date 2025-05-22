<script setup lang="ts">
import { GSDevTools } from 'gsap/GSDevTools'

function gsapDevTool() {
  // 這會影響到 repeat: -1 無限循環的動畫，除非 .create({loop: true})
  gsap.registerPlugin(GSDevTools)
  GSDevTools.create()
}
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
