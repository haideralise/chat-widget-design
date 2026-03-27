<template>
  <div class="flex flex-col h-full">

    <!-- Scrollable content area -->
    <div class="flex-1 overflow-y-auto widget-scroll relative">

      <!-- Green gradient header background -->
      <div class="home-header-bg px-6 pt-8 pb-32 relative">
        <button @click="$emit('close')" class="absolute top-5 right-5 text-black/40 hover:text-black/70">
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </button>

        <!-- Avatar -->
        <div class="w-[52px] h-[52px] rounded-full overflow-hidden mb-8 shadow-md">
          <img
            :src="`https://ui-avatars.com/api/?name=AI&background=${avatarBg}&color=fff&size=52&bold=true&font-size=0.4`"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
        </div>

        <h2 class="text-[26px] font-bold leading-[1.2] text-[var(--widget-header-text)]">Hi there 👋</h2>
        <h2 class="text-[26px] font-bold leading-[1.2] text-[var(--widget-header-text)]">How can we help?</h2>
      </div>

      <!-- White cards overlapping into the gradient -->
      <div class="px-4 -mt-24 pb-4 space-y-2.5 relative z-10">

        <!-- Ask a question card -->
        <div
          @click="$emit('open-chat')"
          class="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] px-5 py-4 flex items-center justify-between cursor-pointer hover:shadow-[0_3px_12px_rgba(0,0,0,0.12)] transition-shadow"
        >
          <div>
            <p class="font-bold text-[#1a1a1a] text-[15px] leading-tight">Ask a question</p>
            <p class="text-[#8b8b8b] text-[13px] mt-1">AI Agent and team can help</p>
          </div>
          <div class="flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <line x1="13" y1="2" x2="13" y2="24" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="2" y1="13" x2="24" y2="13" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="5.2" y1="5.2" x2="20.8" y2="20.8" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="20.8" y1="5.2" x2="5.2" y2="20.8" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
            <i class="fa-solid fa-chevron-right text-[10px] text-[#b0b0b0]"></i>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Tabs -->
    <WidgetTabs active-tab="home" @switch-tab="$emit('switch-tab', $event)" />
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import WidgetTabs from "./WidgetTabs.vue";

defineEmits(["open-chat", "switch-tab", "close"]);

const themeColor = inject("themeColor");
const avatarBg = computed(() => themeColor.value.slice(1));
</script>

<style scoped>
.home-header-bg {
  background: linear-gradient(180deg, var(--widget-gradient-1) 0%, var(--widget-gradient-2) 30%, var(--widget-gradient-3) 55%, var(--widget-gradient-4) 80%, #ffffff 100%);
}

@media (max-width: 767px) {
  .home-header-bg {
    background: linear-gradient(180deg, var(--widget-gradient-mobile-start) 0%, var(--widget-gradient-mobile-end) 100%);
  }
  .home-header-bg h2 {
    color: #ffffff !important;
  }
  .home-header-bg button {
    color: rgba(255, 255, 255, 0.7) !important;
  }
  .home-header-bg button:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
}

.widget-scroll::-webkit-scrollbar { width: 4px; }
.widget-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
</style>
