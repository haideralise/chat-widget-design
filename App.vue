<template>
  <!-- Theme Switcher Toggle -->
  <button
    @click="showThemePanel = !showThemePanel"
    class="fixed top-4 left-4 z-[10000] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
    title="Theme Switcher"
  >
    <i class="fa-solid fa-gear text-gray-500 text-sm"></i>
  </button>

  <!-- Theme Panel -->
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-2 scale-95"
  >
    <div v-if="showThemePanel" class="fixed top-16 left-4 z-[10000] bg-white rounded-xl shadow-2xl p-4 w-[240px] border border-gray-200">
      <p class="text-sm font-semibold text-gray-700 mb-3">Theme Color</p>
      <div class="grid grid-cols-4 gap-2 mb-3">
        <button
          v-for="preset in presets"
          :key="preset.color"
          @click="primaryColor = preset.color"
          class="w-full aspect-square rounded-lg transition-transform hover:scale-110 flex items-center justify-center"
          :style="{ backgroundColor: preset.color }"
          :title="preset.name"
        >
          <i
            v-if="primaryColor === preset.color"
            class="fa-solid fa-check text-white text-xs"
          ></i>
        </button>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs text-gray-500">Custom:</label>
        <input
          type="color"
          :value="primaryColor"
          @input="primaryColor = $event.target.value"
          class="w-8 h-8 rounded cursor-pointer border-0 p-0"
        />
        <span class="text-xs text-gray-400 font-mono">{{ primaryColor }}</span>
      </div>
    </div>
  </transition>

  <DemoPage />
  <MessageView />
</template>

<script setup>
import { ref, watch, onMounted, provide } from 'vue'
import MessageView from './Message/MessageView.vue'
import DemoPage from './DemoPage.vue'

const showThemePanel = ref(false)
const primaryColor = ref('#0a7d5a')

const presets = [
  { name: 'Green', color: '#0a7d5a' },
  { name: 'Blue', color: '#2563eb' },
  { name: 'Purple', color: '#7c3aed' },
  { name: 'Red', color: '#dc2626' },
  { name: 'Orange', color: '#ea580c' },
  { name: 'Teal', color: '#0d9488' },
  { name: 'Indigo', color: '#4f46e5' },
  { name: 'Pink', color: '#db2777' },
]

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0'))
    .join('')
}

function darken(hex, percent) {
  const { r, g, b } = hexToRgb(hex)
  const f = 1 - percent / 100
  return rgbToHex(r * f, g * f, b * f)
}

function lighten(hex, percent) {
  const { r, g, b } = hexToRgb(hex)
  const f = percent / 100
  return rgbToHex(r + (255 - r) * f, g + (255 - g) * f, b + (255 - b) * f)
}

function applyTheme(hex) {
  const { r, g, b } = hexToRgb(hex)
  const el = document.documentElement

  el.style.setProperty('--widget-primary', hex)
  el.style.setProperty('--widget-primary-hover', darken(hex, 15))
  el.style.setProperty('--widget-primary-light', lighten(hex, 90))
  el.style.setProperty('--widget-primary-rgb', `${r}, ${g}, ${b}`)
  el.style.setProperty('--widget-header-text', darken(hex, 30))
  el.style.setProperty('--widget-gradient-1', lighten(hex, 60))
  el.style.setProperty('--widget-gradient-2', lighten(hex, 65))
  el.style.setProperty('--widget-gradient-3', lighten(hex, 75))
  el.style.setProperty('--widget-gradient-4', lighten(hex, 85))
  el.style.setProperty('--widget-gradient-mobile-start', hex)
  el.style.setProperty('--widget-gradient-mobile-end', darken(hex, 30))
  el.style.setProperty('--widget-avatar-bg', hex.slice(1))
}

provide('themeColor', primaryColor)

watch(primaryColor, (val) => applyTheme(val))
onMounted(() => applyTheme(primaryColor.value))
</script>
