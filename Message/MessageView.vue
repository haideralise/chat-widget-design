<template>
  <div class="relative min-h-screen">
    <!-- Floating Chat Button (rounded square, hidden on mobile when open) -->
    <button
      v-if="!state.isOpen"
      @click="state.isOpen = true"
      class="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#0a7d5a] rounded-2xl shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-[#096b4d] z-50"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2C7.373 2 2 6.925 2 13c0 3.38 1.674 6.41 4.3 8.49.09.07.15.18.15.3l.03 2.71c.01.49.53.81.97.59l3.02-1.51c.1-.05.21-.06.32-.04.99.22 2.04.34 3.13.34 6.627 0 12-4.925 12-11S20.627 2 14 2z" fill="white"/>
        <circle cx="9.5" cy="13" r="1.5" fill="#0a7d5a"/>
        <circle cx="14" cy="13" r="1.5" fill="#0a7d5a"/>
        <circle cx="18.5" cy="13" r="1.5" fill="#0a7d5a"/>
      </svg>
    </button>

    <!-- Minimize Button (rounded square, hidden on mobile) -->
    <button
      v-if="state.isOpen"
      @click="closeWidget"
      class="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#0a7d5a] rounded-2xl shadow-lg items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-[#096b4d] z-50 hidden md:flex"
    >
      <i class="fa-solid fa-chevron-down text-white text-xl"></i>
    </button>

    <!-- Chat Widget Panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="state.isOpen"
        class="fixed z-40 bg-white shadow-2xl flex flex-col overflow-hidden
               bottom-24 right-5 w-[400px] h-[620px] rounded-2xl
               max-md:inset-0 max-md:w-full max-md:h-full max-md:rounded-none max-md:bottom-0 max-md:right-0 max-md:z-[9999]"
      >
        <AiChatHome
          v-if="state.currentView === 'home'"
          @open-chat="openChat"
          @switch-tab="state.currentView = $event"
          @close="closeWidget"
        />

        <AiChatMessages
          v-if="state.currentView === 'messages'"
          :conversations="state.conversations"
          @open-chat="openChat"
          @open-conversation="openConversation"
          @switch-tab="state.currentView = $event"
          @close="closeWidget"
        />

        <AiChatConversation
          v-if="state.currentView === 'chat'"
          :messages="state.chatMessages"
          :is-typing="state.isTyping"
          @send="sendMessage"
          @send-attachment="sendAttachment"
          @back="goBack"
          @close="closeWidget"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import AiChatHome from "./components/AiChatHome.vue";
import AiChatMessages from "./components/AiChatMessages.vue";
import AiChatConversation from "./components/AiChatConversation.vue";

const state = reactive({
  isOpen: false,
  currentView: "home",
  previousView: "home",
  isTyping: false,
  conversations: [],
  chatMessages: [
    {
      role: "ai",
      text: "Hi there! You're speaking with Fin AI Agent.\nI'm well trained and ready to assist you today but you can ask for the team at any time.",
      time: "Just now",
    },
    {
      role: "ai",
      text: "How can I help?",
      time: "Just now",
    },
  ],
});

function closeWidget() {
  state.isOpen = false;
  state.currentView = "home";
}

function openChat() {
  state.previousView = state.currentView;
  state.currentView = "chat";
}

function openConversation(conv) {
  state.previousView = "messages";
  state.currentView = "chat";
}

function goBack() {
  state.currentView = state.previousView || "home";
}

function sendAttachment(attachment) {
  state.chatMessages.push({
    role: "user",
    text: "",
    time: "Just now",
    attachment: {
      type: attachment.type,
      url: attachment.url,
      name: attachment.name,
      size: attachment.size || 0,
    },
  });

  state.isTyping = true;

  setTimeout(() => {
    state.isTyping = false;
    state.chatMessages.push({
      role: "ai",
      text: attachment.type === "audio"
        ? "I received your voice message. Let me process that for you."
        : attachment.type === "gif"
        ? "Nice GIF! How can I help you?"
        : `I received your file "${attachment.name}". How can I assist you with it?`,
      time: "Just now",
    });

    trackConversation(attachment.name || "Attachment");
  }, 1200);
}

function sendMessage(text) {
  if (!text.trim()) return;

  state.chatMessages.push({
    role: "user",
    text: text,
    time: "Just now",
  });

  state.isTyping = true;

  setTimeout(() => {
    state.isTyping = false;

    const responses = [
      "Thank you for your question! Let me look into that for you.",
      "That's a great question. Based on what I know, I can help you with that.",
      "I understand your concern. Let me provide you with some helpful information.",
      "Sure, I'd be happy to help! Here's what I can tell you about that.",
      "Let me check that for you. Is there anything else you'd like to know?",
    ];

    state.chatMessages.push({
      role: "ai",
      text: responses[Math.floor(Math.random() * responses.length)],
      time: "Just now",
    });

    trackConversation(text);
  }, 1200);
}

function trackConversation(lastMessage) {
  const existing = state.conversations.find((c) => c.id === "current");
  if (existing) {
    existing.lastMessage = lastMessage;
    existing.time = "Just now";
  } else {
    state.conversations.unshift({
      id: "current",
      title: "AI Agent",
      lastMessage: lastMessage,
      time: "Just now",
    });
  }
}
</script>
