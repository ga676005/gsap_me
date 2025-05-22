<script setup lang="ts">
import { gsap } from 'gsap'

function run() {
  const tl = gsap.timeline()
  tl.from('.fred1', { y: 100, duration: 1 })
    .from('.fred2', { y: 100, duration: 1 }, '+=0.5') // += 相對前一個動畫結束前晚x秒
    .from('.fred3', { y: 100, duration: 1 }, '-=0.5') // -= 相對前一個動畫結束前早x秒
    .from('.fred4', { y: 100, duration: 1 }, '<') // 跟前一個動畫同時開始
    .from('.fred5', { y: 100, duration: 1 }, '<0.5') // 比前一個動畫早x秒開始
    .from('.fred6', { y: 100, duration: 1 }, 0.5) // 數字絕對時間，第x秒開始
}

onMounted(() => {
  run()
})
</script>

<template>
  <div class="wrapper">
    <div id="demo">
      <img id="title" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/meet-the-freds.png" alt="">
      <div id="freds">
        <img class="fred1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred.svg">
        <img class="fred2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-purple.svg">
        <img class="fred3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-blue.svg">
        <img class="fred4" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-pink.svg">
        <img class="fred5" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-orange.svg">
        <img class="fred6" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-red.svg">
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
