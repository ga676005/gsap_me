<script setup lang="ts">
import { gsap } from 'gsap'

const tl = gsap.timeline()
function run() {
  tl.from('#demo', { autoAlpha: 0 })
    .from('#title', { scale: 0, opacity: 0, ease: 'back' })
    .from('#freds img', { y: 160, stagger: 0.1, duration: 0.8, ease: 'back' })
    .add('test') // tl.play('test') 可以直接跳到這
    .from('#time', { xPercent: 100, duration: 0.2 })
}

onMounted(() => {
  run()
})
</script>

<template>
  <div class="wrapper">
    <div id="demo">
      <UButton @click="tl.play()">
        play
      </UButton>
      <UButton @click="tl.pause()">
        pause
      </UButton>
      <UButton @click="tl.reverse()">
        reverse
      </UButton>
      <UButton @click="tl.restart()">
        restart
      </UButton>
      <UButton @click="tl.play('test')">
        jump to test
      </UButton>
      <img id="title" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/meet-the-freds.png" alt="">
      <div id="freds">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred.svg">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-purple.svg">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-blue.svg">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-pink.svg">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-orange.svg">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-red.svg">
      </div>
      <img id="time" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/time.png">
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  color: white;
  font-family: 'Kanit', sans-serif;
  background: #020202;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#demo {
  overflow: hidden;
  position: relative;
  width: 800px;
  height: 410px;
  border: 1px solid #333;
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/space-background.png);
}

#title {
  position: absolute;
  top: 120px;
  left: 40px;
}

#freds {
  position: absolute;
  top: 250px;
  left: 20px;
}

#freds img {
  width: 122px;
  display: inline-block;
}

#time {
  position: absolute;
  top: 25px;
  right: 0;
}
</style>
