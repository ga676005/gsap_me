<script setup lang="ts">
import { gsap } from 'gsap'

function to_example() {
  // to
  gsap.to('.fred', { x: 500, rotation: 360, duration: 2 })
}

function from_example() {
  // from
  gsap.from('.fred', { x: 500, rotation: 360, duration: 2 })
}

function fromTo_example() {
  // fromTo
  gsap.fromTo('.fred', { x: 500, y: 500, rotation: 360, duration: 2 }, { x: 200, y: 200, rotation: 180, duration: 2 })
}

function keyframes_example() {
  // 只有 .to 才能使用 keyframes
  // -= 跟 += 可以設相對值
  gsap.to('.fred', { keyframes: [{ x: 500, y: 200 }, { x: '-=200', y: '-=100' }] })
}

function random_example() {
  // 內建 random  https://gsap.com/docs/v3/GSAP/gsap.to()/?ref=6234#random-values
  gsap.to('.fred', { x: 'random(100, 300, 50)' })
}

function timeline_example() {
  // timeline
  const tl = gsap.timeline()
  tl.to('.green', { x: 500, duration: 1, ease: 'bounce.out' })
  tl.to('.pink', { x: 500, duration: 1, delay: -1, ease: 'back(3)' })
}
// timeline_example()

function repeat_example() {
  // repeat: -1 無限循環 yoyo: true 來回循環
  gsap.to('.fred', { x: 300, repeat: -1, duration: 2, yoyo: true })
}

function stagger_example() {
  // 這兩個寫法是一樣的
  // gsap.to('#freds img', { y: -50, stagger: 0.5 })

  gsap.to('#freds img', {
    y: -50,
    stagger: {
      // each: 0.5, // 每個元素間隔 0.5 秒，就像 stagger: 0.5 一樣
      amount: 0.5, // 動畫平均分配在 0.5 秒內開始，用 amount 的時候 each 沒用
      from: 'edges', // 'start', 'end', 'center', 'edges', 'random'
    },
  })
}

function tweenControl_example() {
  const tween = gsap.to('.fred', {
    x: 500,
    duration: 2,
    paused: true, // 要用這個動畫才不會自動播放，才能控制
    ease: 'power4',
  })

  document.querySelector('[data-play]')?.addEventListener('click', () => tween.play())
  document.querySelector('[data-pause]')?.addEventListener('click', () => tween.pause())
  document.querySelector('[data-restart]')?.addEventListener('click', () => tween.restart())
  document.querySelector('[data-reverse]')?.addEventListener('click', () => tween.reverse())
}

function fix_from_example() {
  // https://codepen.io/snorkltv/pen/jOYqqLd
  // 用 from 的時候因為沒有給 to 的值，連續 hover 觸發時，會從觸發當下的值開始，而不是從初始值開始

  // 改成 fromTo 就行了
  // gsap.fromTo(bg, { scale: 0, duration: 1 }, { scale: 1, ease: 'circ' })
}

onMounted(() => {
  tweenControl_example()
  stagger_example()
})
</script>

<template>
  <div>
    <h1>GSAP Basic</h1>
    <div class="flex gap-2">
      <button data-play>
        play
      </button>
      <button data-pause>
        pause
      </button>
      <button data-restart>
        restart
      </button>
      <button data-reverse>
        reverse
      </button>
    </div>
    <img class="fred green" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred.svg" alt="" width="150">
    <img class="fred pink" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-pink.svg" alt="" width="150">

    <div id="freds" class="flex gap-1 h-[100px] mt-10">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred.svg" alt="">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-purple.svg" alt="">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-blue.svg" alt="">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-pink.svg" alt="">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-orange.svg" alt="">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/fred-red.svg" alt="">
    </div>
  </div>
</template>

<style scoped>

</style>
