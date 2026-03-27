<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-gray-200 px-4 py-4 flex items-center relative flex-shrink-0">
      <div class="flex-1 text-center">
        <h3 class="font-semibold text-[#1a1a1a] text-[15px]">Messages</h3>
      </div>
      <button @click="$emit('close')" class="absolute right-4 text-gray-400 hover:text-gray-600">
        <i class="fa-solid fa-xmark text-base"></i>
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="conversations.length === 0" class="flex-1 flex flex-col items-center justify-center px-6">
      <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
        <i class="fa-solid fa-comment-dots text-gray-400 text-xl"></i>
      </div>
      <p class="font-semibold text-[#1a1a1a] text-[15px]">No messages</p>
      <p class="text-gray-500 text-[13px] mt-1.5 text-center">Messages from the team will be shown here</p>
    </div>

    <!-- Conversations List -->
    <div v-else class="flex-1 overflow-y-auto widget-scroll">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        @click="$emit('open-conversation', conv)"
        class="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-[var(--widget-primary-light)] rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-[var(--widget-primary)]">
              <path d="M12 2L9.5 9.5H2L8 14L5.5 22L12 17L18.5 22L16 14L22 9.5H14.5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-[#1a1a1a] truncate">{{ conv.title || 'AI Agent' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ conv.lastMessage }}</p>
          </div>
          <span class="text-xs text-gray-400 flex-shrink-0">{{ conv.time }}</span>
        </div>
      </div>
    </div>

    <!-- Ask a question button -->
    <div class="p-4">
      <button
        @click="$emit('open-chat')"
        class="mx-auto bg-[var(--widget-primary)] hover:bg-[var(--widget-primary-hover)] text-white font-medium py-2.5 px-6 rounded-full text-[13px] flex items-center justify-center gap-2 transition-colors"
      >
        Ask a question
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-white">
          <circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.3"/>
          <path d="M12 6L10 10H6L9 13L7.5 18L12 15L16.5 18L15 13L18 10H14L12 6Z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <!-- Bottom Tabs -->
    <WidgetTabs active-tab="messages" @switch-tab="$emit('switch-tab', $event)" />
  </div>
</template>

<script setup>
import WidgetTabs from "./WidgetTabs.vue";

defineProps({
  conversations: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["open-chat", "open-conversation", "switch-tab", "close"]);
</script>

<style scoped>
.widget-scroll::-webkit-scrollbar { width: 4px; }
.widget-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
</style>
