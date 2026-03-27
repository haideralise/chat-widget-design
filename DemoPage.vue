<template>
  <div class="min-h-screen bg-[#0a0a0b] bg-grid flex items-center justify-center px-6">
    <div class="text-center max-w-xl">
      <div class="inline-flex items-center space-x-2 bg-[#1a1a1d] border border-[#242428] rounded-full px-4 py-2 mb-8">
        <span class="w-2 h-2 bg-[#00d4ff] rounded-full"></span>
        <span class="text-sm text-gray-400">Widget Preview</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
        <span class="gradient-text">Test your widget.</span><br>
        <span class="text-white">Right here.</span>
      </h1>
      <p class="text-gray-500 text-lg leading-relaxed mb-4">
        "Any sufficiently advanced technology is indistinguishable from magic."
      </p>
      <p class="text-gray-600 text-sm">— Arthur C. Clarke</p>
    </div>
  </div>
</template>

<style scoped>
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
.gradient-text {
  background: linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
