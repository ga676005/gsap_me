<script setup lang="ts">
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

// Register the plugin
gsap.registerPlugin(MorphSVGPlugin)

const isAnimating = ref(false)
const currentShape = ref('circle')

// SVG element references with proper types
const circleRef = ref<SVGCircleElement | null>(null)
const squareRef = ref<SVGRectElement | null>(null)
const originalCircleRef = ref<SVGCircleElement | null>(null)
const starRef = ref<SVGPathElement | null>(null)
const heartRef = ref<SVGPathElement | null>(null)

// Will store the path elements after conversion
const circlePath = ref<SVGPathElement | null>(null)
const squarePath = ref<SVGPathElement | null>(null)
const originalCirclePath = ref<SVGPathElement | null>(null)

onMounted(() => {
  // Convert SVG elements to paths
  if (circleRef.value && squareRef.value && originalCircleRef.value) {
    try {
      // Convert circle to path - get the first element from the array
      const circlePathArray = MorphSVGPlugin.convertToPath(circleRef.value)
      if (circlePathArray && circlePathArray.length > 0) {
        const circlePathElement = circlePathArray[0] as SVGPathElement
        circlePathElement.id = 'circlePath'
        circlePathElement.setAttribute('fill', 'none')
        circlePathElement.setAttribute('stroke', '#FF5E5E')
        circlePathElement.setAttribute('stroke-width', '8')
        circlePath.value = circlePathElement
      }

      // Convert square to path - get the first element from the array
      const squarePathArray = MorphSVGPlugin.convertToPath(squareRef.value)
      if (squarePathArray && squarePathArray.length > 0) {
        const squarePathElement = squarePathArray[0] as SVGPathElement
        squarePathElement.id = 'squarePath'
        squarePathElement.setAttribute('fill', 'none')
        squarePathElement.setAttribute('stroke', '#4CAF50')
        squarePathElement.setAttribute('stroke-width', '8')
        squarePathElement.style.visibility = 'hidden'
        squarePath.value = squarePathElement
      }

      // Convert original circle to path - get the first element from the array
      const originalCirclePathArray = MorphSVGPlugin.convertToPath(originalCircleRef.value)
      if (originalCirclePathArray && originalCirclePathArray.length > 0) {
        const originalCirclePathElement = originalCirclePathArray[0] as SVGPathElement
        originalCirclePathElement.id = 'originalCirclePath'
        originalCirclePathElement.setAttribute('fill', 'none')
        originalCirclePathElement.setAttribute('stroke', '#FF5E5E')
        originalCirclePathElement.setAttribute('stroke-width', '8')
        originalCirclePathElement.style.visibility = 'hidden'
        originalCirclePath.value = originalCirclePathElement
      }

      // Replace original elements with converted paths if all conversions were successful
      if (circlePath.value && squarePath.value && originalCirclePath.value) {
        circleRef.value.parentNode?.replaceChild(circlePath.value, circleRef.value)
        squareRef.value.parentNode?.replaceChild(squarePath.value, squareRef.value)
        originalCircleRef.value.parentNode?.replaceChild(originalCirclePath.value, originalCircleRef.value)
      }
    }
    catch (error) {
      console.error('Error converting SVG elements to paths:', error)
    }
  }
})

function morphToSquare() {
  if (isAnimating.value || !circlePath.value || !squarePath.value)
    return

  isAnimating.value = true
  currentShape.value = 'square'

  // Morph between paths
  gsap.to('#circlePath', {
    morphSVG: '#squarePath',
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

function morphToCircle() {
  if (isAnimating.value || !circlePath.value || !originalCirclePath.value)
    return

  isAnimating.value = true
  currentShape.value = 'circle'

  // Morph back to circle
  gsap.to('#circlePath', {
    morphSVG: '#originalCirclePath',
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

function morphToStar() {
  if (isAnimating.value || !circlePath.value || !starRef.value)
    return

  isAnimating.value = true
  currentShape.value = 'star'

  // Morph to star
  gsap.to('#circlePath', {
    morphSVG: '#star',
    duration: 1.5,
    ease: 'elastic.out(1, 0.3)',
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

function morphToHeart() {
  if (isAnimating.value || !circlePath.value || !heartRef.value)
    return

  isAnimating.value = true
  currentShape.value = 'heart'

  // Morph to heart with a bounce effect
  gsap.to('#circlePath', {
    morphSVG: '#heart',
    duration: 1.2,
    ease: 'back.out(1.7)',
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

function complexMorph() {
  if (isAnimating.value || !circlePath.value || !squarePath.value || !starRef.value || !originalCirclePath.value || !heartRef.value)
    return

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating.value = false
      currentShape.value = 'circle'
    },
  })

  isAnimating.value = true

  // Create a sequence of morphs including the heart
  tl.to('#circlePath', {
    morphSVG: '#squarePath',
    duration: 0.7,
    ease: 'power1.inOut',
  })
    .to('#circlePath', {
      morphSVG: '#star',
      duration: 0.7,
      ease: 'power1.inOut',
    })
    .to('#circlePath', {
      morphSVG: '#heart',
      duration: 0.7,
      ease: 'power1.inOut',
    })
    .to('#circlePath', {
      morphSVG: '#originalCirclePath',
      duration: 0.7,
      ease: 'power1.inOut',
    })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-8">
    <h1 class="text-3xl font-bold text-white mb-8">
      GSAP MorphSVG Example
    </h1>

    <div class="flex justify-center items-center mb-8">
      <p class="text-white mb-2">
        Current Shape: {{ currentShape }}
      </p>
    </div>

    <div class="w-64 h-64 flex justify-center items-center mb-8">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <!-- Original elements that will be converted to paths via JS -->
        <circle
          ref="circleRef"
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#FF5E5E"
          stroke-width="8"
        />

        <circle
          ref="originalCircleRef"
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#FF5E5E"
          stroke-width="8"
          style="visibility: hidden;"
        />

        <rect
          ref="squareRef"
          x="20"
          y="20"
          width="160"
          height="160"
          fill="none"
          stroke="#4CAF50"
          stroke-width="8"
          style="visibility: hidden;"
        />

        <!-- Star shape (already a path) -->
        <path
          id="star"
          ref="starRef"
          d="M100 10 L118 66 L178 66 L128 100 L146 156 L100 124 L54 156 L72 100 L22 66 L82 66 Z"
          fill="none"
          stroke="#2196F3"
          stroke-width="8"
          style="visibility: hidden;"
        />

        <!-- Heart shape (path) -->
        <path
          id="heart"
          ref="heartRef"
          d="M100,177.5 C65,140 20,115 20,70 C20,40 40,20 70,20 C85,20 100,30 100,40 C100,30 115,20 130,20 C160,20 180,40 180,70 C180,115 135,140 100,177.5 Z"
          fill="none"
          stroke="#E91E63"
          stroke-width="8"
          style="visibility: hidden;"
        />
      </svg>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <button
        :disabled="isAnimating || currentShape === 'circle'"
        class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        @click="morphToCircle"
      >
        Circle
      </button>

      <button
        :disabled="isAnimating || currentShape === 'square'"
        class="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        @click="morphToSquare"
      >
        Square
      </button>

      <button
        :disabled="isAnimating || currentShape === 'star'"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        @click="morphToStar"
      >
        Star
      </button>

      <button
        :disabled="isAnimating || currentShape === 'heart'"
        class="px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50"
        @click="morphToHeart"
      >
        Heart
      </button>

      <button
        :disabled="isAnimating"
        class="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        @click="complexMorph"
      >
        Complex Morph Sequence
      </button>
    </div>

    <div class="mt-8 text-white max-w-2xl">
      <h2 class="text-xl font-bold mb-2">
        About MorphSVG Plugin
      </h2>
      <p class="mb-4">
        MorphSVG is a premium GSAP plugin that allows smooth morphing between SVG shapes,
        even if they have different numbers of points.
      </p>
      <p class="mb-4">
        <strong>Important:</strong> MorphSVG requires path elements for morphing. Native SVG elements
        like circles and rectangles must be converted to paths using MorphSVGPlugin.convertToPath().
      </p>
      <p class="mb-4">
        <strong>Note:</strong> This example assumes you have the MorphSVG plugin.
        If you're using the free version of GSAP, you'll need to purchase Club GreenSock
        membership to use this plugin in production.
      </p>
      <p>
        Learn more at:
        <a
          href="https://greensock.com/morphsvg/"
          target="_blank"
          class="text-blue-400 underline"
        >
          https://greensock.com/morphsvg/
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:not(:disabled):active {
  transform: translateY(0);
}
</style>
