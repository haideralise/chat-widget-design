<template>
  <div class="border-t border-gray-200 flex flex-shrink-0 bg-white">
    <button
      @click="$emit('switch-tab', 'home')"
      class="flex-1 flex flex-col items-center py-3 transition-colors"
      :class="activeTab === 'home' ? 'text-[var(--widget-primary)]' : 'text-[#9ca3af] hover:text-[#6b7280]'"
    >
      <i
        class="text-[20px] mb-1"
        :class="activeTab === 'home' ? 'fa-solid fa-house' : 'fa-solid fa-house'"
      ></i>
      <span class="text-[12px] font-medium">Home</span>
    </button>
    <button
      @click="$emit('switch-tab', 'messages')"
      class="flex-1 flex flex-col items-center py-3 transition-colors"
      :class="activeTab === 'messages' ? 'text-[var(--widget-primary)]' : 'text-[#9ca3af] hover:text-[#6b7280]'"
    >
      <i
        class="text-[20px] mb-1"
        :class="activeTab === 'messages' ? 'fa-solid fa-comment-dots' : 'fa-regular fa-comment-dots'"
      ></i>
      <span class="text-[12px] font-medium">Messages</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    default: "home",
  },
});

defineEmits(["switch-tab"]);
</script>
