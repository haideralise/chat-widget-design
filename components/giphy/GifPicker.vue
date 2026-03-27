<template>
  <div class="w-[280px] h-[320px] bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
    <div class="px-3 py-2 border-b border-gray-100">
      <input
        v-model="search"
        type="text"
        placeholder="Search GIFs..."
        class="w-full text-sm px-3 py-1.5 rounded-lg bg-gray-100 outline-none placeholder-gray-400"
      />
    </div>
    <div class="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-1.5 auto-rows-min">
      <div
        v-for="gif in sampleGifs"
        :key="gif.id"
        @click="$emit('select', gif)"
        class="cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
      >
        <img :src="gif.images.fixed_height.url" :alt="gif.title" class="w-full h-24 object-cover" />
      </div>
    </div>
    <div class="px-3 py-2 border-t border-gray-100 text-center">
      <span class="text-[10px] text-gray-400">GIF Picker Stub — connect Giphy API later</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])

const search = ref('')

const sampleGifs = [
  {
    id: '1',
    title: 'Thumbs Up',
    images: { fixed_height: { url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif' }, original: { url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif' } }
  },
  {
    id: '2',
    title: 'Hello',
    images: { fixed_height: { url: 'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif' }, original: { url: 'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif' } }
  },
  {
    id: '3',
    title: 'Thank You',
    images: { fixed_height: { url: 'https://media.giphy.com/media/osjgQPWRx3cac/giphy.gif' }, original: { url: 'https://media.giphy.com/media/osjgQPWRx3cac/giphy.gif' } }
  },
  {
    id: '4',
    title: 'Laughing',
    images: { fixed_height: { url: 'https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif' }, original: { url: 'https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif' } }
  },
]
</script>
