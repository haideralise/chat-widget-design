<template>
  <div class="flex flex-col h-full">
    <!-- Chat Header -->
    <div class="border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
      <button @click="$emit('back')" class="text-gray-400 hover:text-gray-600 text-sm">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div class="flex items-center gap-2.5 flex-1">
        <div class="flex-shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L14 12H6L13 17L10 26L16 21L22 26L19 17L26 12H18L16 4Z" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="0.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <p class="text-[14px] font-bold text-[#1a1a1a]">Fin</p>
          <p class="text-[12px] text-gray-500">The team can also help</p>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600 mr-1">
        <i class="fa-solid fa-ellipsis text-sm"></i>
      </button>
      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        <i class="fa-solid fa-xmark text-base"></i>
      </button>
    </div>

    <!-- Chat Messages -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto widget-scroll px-4 py-5 space-y-3">
      <template v-for="(msg, index) in messages" :key="index">
        <!-- AI Message -->
        <div v-if="msg.role === 'ai'" class="chat-bubble-in">
          <div class="max-w-[310px]">
            <div class="bg-[#f4f4f4] rounded-2xl rounded-bl-md px-4 py-3">
              <p class="text-[14px] text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">{{ msg.text }}</p>
            </div>
            <p
              v-if="!messages[index + 1] || messages[index + 1].role !== 'ai'"
              class="text-[11px] text-gray-400 mt-1.5 ml-1"
            >
              Fin &middot; AI Agent &middot; {{ msg.time }}
            </p>
          </div>
        </div>
        <!-- User Message (text) -->
        <div v-else-if="!msg.attachment" class="flex justify-end chat-bubble-in">
          <div class="max-w-[310px]">
            <div class="bg-[#0a7d5a] text-white rounded-2xl rounded-br-md px-4 py-3">
              <p class="text-[14px] leading-relaxed whitespace-pre-wrap">{{ msg.text }}</p>
            </div>
          </div>
        </div>
        <!-- User Message (attachment) -->
        <div v-else class="flex justify-end chat-bubble-in">
          <div class="max-w-[310px]">
            <!-- Image -->
            <div v-if="msg.attachment.type === 'image'" class="bg-[#0a7d5a] rounded-2xl rounded-br-md p-1.5">
              <img :src="msg.attachment.url" :alt="msg.attachment.name" class="rounded-xl max-w-full max-h-48 object-cover" />
            </div>
            <!-- Audio -->
            <div v-else-if="msg.attachment.type === 'audio'" class="bg-[#0a7d5a] text-white rounded-2xl rounded-br-md px-4 py-3">
              <div class="flex items-center gap-2 mb-2">
                <i class="fa-solid fa-microphone text-xs"></i>
                <span class="text-[13px]">Voice message</span>
              </div>
              <audio :src="msg.attachment.url" controls class="w-full h-8 [&::-webkit-media-controls-panel]:bg-transparent"></audio>
            </div>
            <!-- GIF -->
            <div v-else-if="msg.attachment.type === 'gif'" class="rounded-2xl rounded-br-md overflow-hidden">
              <img :src="msg.attachment.url" :alt="msg.attachment.name" class="max-w-full max-h-48 object-cover" />
            </div>
            <!-- File -->
            <div v-else class="bg-[#0a7d5a] text-white rounded-2xl rounded-br-md px-4 py-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-file text-sm"></i>
                <span class="text-[13px] truncate">{{ msg.attachment.name }}</span>
              </div>
              <span class="text-[11px] text-white/70 mt-1 block">{{ formatFileSize(msg.attachment.size) }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="chat-bubble-in">
        <div class="bg-[#f4f4f4] rounded-2xl rounded-bl-md px-5 py-3.5 inline-block">
          <div class="flex gap-1.5 items-center">
            <span class="w-[7px] h-[7px] bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-[7px] h-[7px] bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-[7px] h-[7px] bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- File Preview -->
    <div v-if="filePreview" class="px-4 py-2 border-t border-gray-200 bg-gray-50 flex items-center gap-3 flex-shrink-0">
      <div v-if="filePreview.isImage" class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <img :src="filePreview.url" class="w-full h-full object-cover" />
      </div>
      <div v-else class="w-12 h-12 rounded-lg bg-[#0a7d5a]/10 flex items-center justify-center flex-shrink-0">
        <i class="fa-solid fa-file text-[#0a7d5a]"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[13px] text-[#1a1a1a] truncate">{{ filePreview.name }}</p>
        <p class="text-[11px] text-gray-400">{{ formatFileSize(filePreview.size) }}</p>
      </div>
      <button @click="clearFilePreview" class="text-gray-400 hover:text-gray-600">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Audio Recording Bar -->
    <div v-if="audioRecorder.is_recording" class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center gap-3 flex-shrink-0">
      <button @click="cancelRecording" class="text-red-500 hover:text-red-600">
        <i class="fa-solid fa-trash text-sm"></i>
      </button>
      <div class="flex-1 flex items-center gap-2">
        <span class="text-[13px] text-[#1a1a1a] font-medium">{{ audioRecorder.timeCount() }}</span>
        <span class="flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>
      <button @click="sendRecording" class="w-8 h-8 bg-[#0a7d5a] text-white rounded-full flex items-center justify-center hover:bg-[#096b4d]">
        <i class="fa-solid fa-arrow-up text-xs"></i>
      </button>
    </div>

    <!-- Chat Input -->
    <div v-if="!audioRecorder.is_recording" class="px-4 py-3 flex-shrink-0 relative">
      <div class="border border-[#0a7d5a] rounded-2xl px-4 py-2.5 focus-within:shadow-[0_0_0_1px_#0a7d5a] transition-shadow">
        <textarea
          ref="textareaRef"
          v-model="userInput"
          @keydown.enter.exact.prevent="handleSend"
          @input="autoResize"
          placeholder="Ask a question..."
          rows="1"
          class="w-full resize-none text-[14px] text-[#1a1a1a] placeholder-gray-400 outline-none bg-transparent overflow-hidden"
          style="max-height: 80px"
        ></textarea>
        <div class="flex items-center justify-between mt-1.5">
          <div class="flex items-center gap-4 text-gray-400">
            <!-- File Upload -->
            <button @click="triggerFileUpload" class="hover:text-gray-600 transition-colors">
              <i class="fa-solid fa-paperclip text-[15px]"></i>
            </button>
            <input
              ref="fileInputRef"
              type="file"
              class="hidden"
              accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,.rar"
              @change="onFileSelected"
            />

            <!-- Emoji Picker -->
            <div class="relative">
              <button @click="toggleEmojiPicker" class="hover:text-gray-600 transition-colors">
                <i class="fa-regular fa-face-smile text-[15px]"></i>
              </button>
              <div v-if="showEmojiPicker" class="absolute bottom-8 left-0 z-50">
                <EmojiPicker
                  :display-recent="true"
                  :hide-group-names="true"
                  :disable-sticky-group-names="true"
                  @select="onSelectEmoji"
                />
              </div>
            </div>

            <!-- GIF Picker -->
            <div class="relative">
              <button @click="toggleGifPicker" class="hover:text-gray-600 transition-colors">
                <span class="text-[12px] font-extrabold tracking-tight">GIF</span>
              </button>
              <div v-if="showGifPicker" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
                <GifPicker @select="onSelectGif" :is-open="showGifPicker" />
              </div>
            </div>

            <!-- Microphone -->
            <button @click="startRecording" class="hover:text-gray-600 transition-colors">
              <i class="fa-solid fa-microphone text-[15px]"></i>
            </button>
          </div>
          <button
            @click="handleSend"
            :disabled="!userInput.trim() && !filePreview"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            :class="(userInput.trim() || filePreview) ? 'bg-[#0a7d5a] text-white hover:bg-[#096b4d]' : 'bg-gray-200 text-gray-400'"
          >
            <i class="fa-solid fa-arrow-up text-xs"></i>
          </button>
        </div>
      </div>
      <p class="text-center text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-gray-400">
          <path d="M12 2L9.5 9.5H2L8 14L5.5 22L12 17L18.5 22L16 14L22 9.5H14.5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        Powered by Fin
      </p>
    </div>

    <!-- Click-away overlay for pickers -->
    <div
      v-if="showEmojiPicker || showGifPicker"
      class="fixed inset-0 z-40"
      @click="showEmojiPicker = false; showGifPicker = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import GifPicker from "@/components/giphy/GifPicker.vue";

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  isTyping: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["send", "send-attachment", "back", "close"]);

const userInput = ref("");
const chatContainer = ref(null);
const textareaRef = ref(null);
const fileInputRef = ref(null);

// Picker toggles
const showEmojiPicker = ref(false);
const showGifPicker = ref(false);

// File preview
const filePreview = ref(null);
let selectedFile = null;

// Audio recorder
const audioRecorder = reactive({
  timer: 0,
  stop_time: 120,
  recorder: null,
  stream: null,
  chunks: [],
  is_recording: false,
  timeInterval: null,
  timeCount() {
    const minutes = Math.floor(audioRecorder.timer / 60);
    const seconds = audioRecorder.timer % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  },
});

// --- File Upload ---
function triggerFileUpload() {
  fileInputRef.value?.click();
}

function onFileSelected(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  selectedFile = file;
  const isImage = file.type.startsWith("image/");
  const url = URL.createObjectURL(file);

  filePreview.value = {
    name: file.name,
    size: file.size,
    isImage,
    url,
  };

  // Reset the input so the same file can be re-selected
  event.target.value = "";
}

function clearFilePreview() {
  if (filePreview.value?.url) {
    URL.revokeObjectURL(filePreview.value.url);
  }
  filePreview.value = null;
  selectedFile = null;
}

// --- Emoji Picker ---
function toggleEmojiPicker() {
  showGifPicker.value = false;
  showEmojiPicker.value = !showEmojiPicker.value;
}

function onSelectEmoji(emoji) {
  userInput.value += emoji.i;
  showEmojiPicker.value = false;
  textareaRef.value?.focus();
}

// --- GIF Picker ---
function toggleGifPicker() {
  showEmojiPicker.value = false;
  showGifPicker.value = !showGifPicker.value;
}

function onSelectGif(gif) {
  showGifPicker.value = false;
  const gifUrl = gif.images?.fixed_height?.url || gif.images?.original?.url;
  emit("send-attachment", {
    type: "gif",
    url: gifUrl,
    name: gif.title || "GIF",
  });
}

// --- Audio Recording ---
function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Microphone is not supported in this browser.");
    return;
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
    audioRecorder.recorder = new MediaRecorder(mediaStream);
    audioRecorder.stream = mediaStream;
    audioRecorder.chunks = [];
    audioRecorder.timer = 0;

    audioRecorder.recorder.onstart = () => {
      audioRecorder.is_recording = true;
      audioRecorder.timeInterval = setInterval(() => {
        audioRecorder.timer += 1;
        if (audioRecorder.timer >= audioRecorder.stop_time) {
          sendRecording();
        }
      }, 1000);
    };

    audioRecorder.recorder.ondataavailable = (e) => {
      audioRecorder.chunks.push(e.data);
    };

    audioRecorder.recorder.start();
  }).catch(() => {
    alert("Microphone access denied.");
  });
}

function cancelRecording() {
  clearInterval(audioRecorder.timeInterval);
  if (audioRecorder.stream) {
    audioRecorder.stream.getTracks().forEach((track) => track.stop());
  }
  if (audioRecorder.recorder && audioRecorder.recorder.state !== "inactive") {
    audioRecorder.recorder.stop();
  }
  audioRecorder.is_recording = false;
  audioRecorder.chunks = [];
}

function sendRecording() {
  clearInterval(audioRecorder.timeInterval);

  if (audioRecorder.recorder && audioRecorder.recorder.state !== "inactive") {
    audioRecorder.recorder.requestData();
    audioRecorder.recorder.stop();
  }

  if (audioRecorder.stream) {
    audioRecorder.stream.getTracks().forEach((track) => track.stop());
  }

  audioRecorder.recorder.onstop = () => {
    const blob = new Blob(audioRecorder.chunks, { type: "audio/ogg; codecs=opus" });
    const url = URL.createObjectURL(blob);

    emit("send-attachment", {
      type: "audio",
      url,
      name: "Voice message",
      blob,
    });

    audioRecorder.is_recording = false;
    audioRecorder.chunks = [];
  };
}

// --- Send ---
function autoResize() {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function handleSend() {
  // If file is attached, send as attachment
  if (filePreview.value && selectedFile) {
    const isImage = selectedFile.type.startsWith("image/");
    emit("send-attachment", {
      type: isImage ? "image" : "file",
      url: filePreview.value.url,
      name: selectedFile.name,
      size: selectedFile.size,
      file: selectedFile,
    });
    // Also send text if present
    if (userInput.value.trim()) {
      emit("send", userInput.value.trim());
    }
    clearFilePreview();
    userInput.value = "";
    return;
  }

  const text = userInput.value.trim();
  if (!text) return;
  emit("send", text);
  userInput.value = "";
  nextTick(() => {
    if (textareaRef.value) textareaRef.value.style.height = "auto";
  });
}

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

watch(
  () => props.messages.length,
  () => nextTick(() => scrollToBottom())
);

watch(
  () => props.isTyping,
  () => nextTick(() => scrollToBottom())
);
</script>

<style scoped>
.chat-bubble-in {
  animation: bubbleIn 0.3s ease forwards;
}
@keyframes bubbleIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.widget-scroll::-webkit-scrollbar { width: 4px; }
.widget-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
</style>
