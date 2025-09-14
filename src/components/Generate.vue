<template>
  <div class="generate-container">
    <!-- Neural Network Background -->
    <BgNeural 
      class="absolute inset-0 z-0" 
      :hue="220"
      :saturation="0.9"
      :chroma="0.7"
    />
    
    <!-- Background Effects (Reduced Opacity) -->
    <div class="background-effects">
      <div class="grid-pattern"></div>
      <div class="glow-orb glow-orb-1"></div>
      <div class="glow-orb glow-orb-2"></div>
      <div class="scanning-line"></div>
    </div>

    <!-- Back to Home Button -->
    <div class="back-button-container">
      <RippleButton
        @click="goToHome"
        class="back-button"
        :ripple-duration="600"
      >
        <span class="back-icon">←</span>
        <span class="back-text">返回首页</span>
      </RippleButton>
    </div>

    <!-- Main Layout -->
    <div class="main-layout relative z-10">
      <div class="left-panel" v-motion-slide-visible-once-left>
        <BorderBeam 
          :color-from="'#00d4ff'" 
          :color-to="'#9333ea'"
          :duration="12000"
          :border-width="2"
          :size="180"
        />
        <!-- Top Section -->
        <div class="left-top-section">
          <div class="panel-header">
            <h2 class="panel-title">
              <span class="icon">⚡</span>
              AI 图像生成
            </h2>
            <div class="status-indicator" :class="{ active: isGenerating }">
              <div class="pulse"></div>
              <TypingAnimation
                v-if="isGenerating"
                :text="'AI 处理中...'"
                :type-speed="120"
                :loop="false"
                cursor-color="#00d4ff"
                class="status-text"
              />
              <span v-else>准备就绪</span>
            </div>
          </div>

          <!-- Upload Section -->
          <div class="control-section">
            <h3 class="section-title">上传图片</h3>
            <div 
              class="upload-area clickable" 
              :class="{ 'has-file': uploadedFile, 'drag-over': isDragOver }"
              @click="triggerFileUpload"
              @dragover.prevent="isDragOver = true"
              @dragleave.prevent="isDragOver = false"
              @drop.prevent="handleFileDrop"
            >
              <input 
                ref="fileInput" 
                type="file" 
                accept="image/*" 
                @change="handleFileSelect" 
                style="display: none;"
              >
              
              <div v-if="!uploadedFile" class="upload-placeholder">
                <div class="upload-icon">📁</div>
                <p class="upload-text">点击或拖拽上传图片</p>
                <p class="upload-hint">支持 JPG, PNG, GIF 格式</p>
              </div>
              
              <div v-else class="uploaded-file">
                <img :src="uploadedImageUrl" alt="Uploaded" class="preview-image">
                <button @click.stop="clearFile" class="clear-button clickable">✕</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="left-bottom-section">
          <!-- Prompt Section -->
          <div class="control-section">
            <h3 class="section-title">提示词</h3>
            <div class="prompt-container">
              <BorderBeam 
                :color-from="'#9333ea'" 
                :color-to="'#ec4899'"
                :duration="18000"
                :border-width="1.5"
                :size="120"
                :delay="6000"
              />
              <textarea
                v-model="promptText"
                class="prompt-input"
                placeholder="描述你想要生成的图片效果..."
                rows="4"
              ></textarea>
              <div class="prompt-counter">{{ promptText.length }}/500</div>
            </div>
          </div>

          <!-- Generate Button -->
          <div class="control-section">
            <GradientButton
              class="generate-button-gradient"
              :class="{ 'generating': isGenerating, 'disabled': !canGenerate }"
              :disabled="!canGenerate"
              @click="generateImage"
              :colors="['#00d4ff', '#9333ea', '#ec4899', '#10b981', '#00d4ff']"
              :duration="3000"
              :border-width="3"
              :blur="6"
              bg-color="rgba(15, 23, 42, 0.8)"
            >
              <div class="button-content-gradient">
                <span v-if="!isGenerating" class="button-text">
                  <span class="icon">🎨</span>
                  生成图片
                </span>
                <span v-else class="button-text generating">
                  <span class="loading-spinner"></span>
                  AI 处理中...
                </span>
              </div>
            </GradientButton>
          </div>
        </div>
      </div>

      <!-- Right Panel - Display -->
      <div class="right-panel" v-motion-slide-visible-once-right>
        <BorderBeam 
          :color-from="'#ec4899'" 
          :color-to="'#10b981'"
          :duration="15000"
          :border-width="2"
          :size="160"
          :delay="3000"
        />
        <div class="display-header">
          <h3 class="display-title">生成结果</h3>
          <div class="display-controls">
            <button v-if="generatedImage" @click="downloadImage" class="control-btn">
              <span>💾</span> 保存
            </button>
            <button v-if="generatedImage" @click="openFullscreen" class="control-btn">
              <span>🔍</span> 放大
            </button>
          </div>
        </div>
        
        <div class="display-area">
          <!-- Empty State -->
          <div v-if="!generatedImage && !isGenerating" class="empty-state">
            <div class="empty-icon">🖼️</div>
            <p class="empty-text">AI 生成的图片将在这里显示</p>
            <p class="empty-hint">上传图片并输入提示词开始创作</p>
          </div>

          <!-- Loading State with Neural Background -->
          <div v-if="isGenerating" class="loading-state">
            <!-- Enhanced Neural Background for Generation -->
            <BgNeural 
              class="absolute inset-0 z-0" 
              :hue="280"
              :saturation="1.0"
              :chroma="0.9"
            />
            
            <div class="ai-processing relative z-10">
              <Orbit
                :size="140"
                :orbit-count="3"
                :circles-per-orbit="6"
                :colors="['#00d4ff', '#9333ea', '#ec4899', '#10b981']"
                :duration="[6, 9, 12]"
                :reverse="[false, true, false]"
                :show-connections="true"
                connection-color="#00d4ff"
                class="processing-orbits"
              >
                <div class="processing-center">
                  <div class="processing-text-large">AI</div>
                </div>
              </Orbit>
              
              <TypingAnimation
                :text="[
                  '人工智能正在处理中...',
                  '正在分析图像内容...',
                  '创意算法运行中...',
                  '生成高质量图像...'
                ]"
                :type-speed="80"
                :delete-speed="40"
                :pause-time="1500"
                :loop="true"
                cursor-color="#00d4ff"
                class="text-lg font-medium mt-4"
              />
              <p class="countdown-text">
                预计需要 
                <span class="countdown-number text-cyan-400 font-bold text-xl mx-1">
                  {{ remainingTime }}
                </span>
                秒
              </p>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Generated Image -->
          <div v-if="generatedImage" class="result-container">
            <img 
              :src="generatedImage" 
              alt="Generated" 
              class="generated-image"
              @click="openFullscreen"
            >
            <div class="image-overlay">
              <button @click="openFullscreen" class="fullscreen-btn">
                <span>🔍</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Modal -->
    <div v-if="showFullscreen" class="fullscreen-modal" @click="closeFullscreen">
      <div class="fullscreen-content" @click.stop>
        <img :src="generatedImage" alt="Generated Full" class="fullscreen-image">
        <button @click="closeFullscreen" class="close-fullscreen">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { BgNeural } from '@/components/ui/bg-neural'
import { RippleButton } from '@/components/ui/ripple-button'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Orbit } from '@/components/ui/orbiting-circles'
import { GradientButton } from '@/components/ui/gradient-button'
import { BorderBeam } from '@/components/ui/border-beam'

const router = useRouter()

// Navigation
const goToHome = () => {
  router.push('/')
}

// Reactive state
const uploadedFile = ref<File | null>(null)
const uploadedImageUrl = ref('')
const promptText = ref('')
const isGenerating = ref(false)
const generatedImage = ref('')
const isDragOver = ref(false)
const showFullscreen = ref(false)
const fileInput = ref<HTMLInputElement>()
const remainingTime = ref(5)
const progress = ref(0)

let generateTimer: NodeJS.Timeout | null = null
let progressTimer: NodeJS.Timeout | null = null

// Computed properties
const canGenerate = computed(() => {
  return uploadedFile.value && promptText.value.trim().length > 0 && !isGenerating.value
})

// File handling
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

const handleFileDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件')
    return
  }
  
  uploadedFile.value = file
  uploadedImageUrl.value = URL.createObjectURL(file)
}

const clearFile = () => {
  if (uploadedImageUrl.value) {
    URL.revokeObjectURL(uploadedImageUrl.value)
  }
  uploadedFile.value = null
  uploadedImageUrl.value = ''
  generatedImage.value = ''
}

// Generate image
const generateImage = () => {
  if (!canGenerate.value) return
  
  isGenerating.value = true
  remainingTime.value = 5
  progress.value = 0
  
  // More precise progress animation (50ms intervals for smoother progress)
  let elapsed = 0
  const totalTime = 5000 // 5 seconds
  const interval = 50 // 50ms intervals
  
  progressTimer = setInterval(() => {
    elapsed += interval
    
    // Update progress every 50ms
    const newProgress = (elapsed / totalTime) * 100
    progress.value = Math.min(newProgress, 100)
    
    // Update remaining time every 1000ms
    const newRemainingTime = Math.max(0, Math.ceil((totalTime - elapsed) / 1000))
    if (newRemainingTime !== remainingTime.value) {
      remainingTime.value = newRemainingTime
      console.log(`倒计时: ${newRemainingTime}, 进度: ${Math.round(progress.value)}%`)
    }
    
    // Stop when complete
    if (elapsed >= totalTime) {
      clearInterval(progressTimer!)
      progressTimer = null
      progress.value = 100
      remainingTime.value = 0
    }
  }, interval)
  
  // Simulate AI processing for 5 seconds
  generateTimer = setTimeout(() => {
    // Use the uploaded image as the "generated" result
    generatedImage.value = uploadedImageUrl.value
    isGenerating.value = false
    progress.value = 100
    remainingTime.value = 0
    
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }
  }, totalTime)
}

// Image display controls
const openFullscreen = () => {
  showFullscreen.value = true
}

const closeFullscreen = () => {
  showFullscreen.value = false
}

const downloadImage = () => {
  if (generatedImage.value) {
    const link = document.createElement('a')
    link.href = generatedImage.value
    link.download = 'ai-generated-image.jpg'
    link.click()
  }
}

// Cleanup
onUnmounted(() => {
  if (generateTimer) clearTimeout(generateTimer)
  if (progressTimer) clearInterval(progressTimer)
  if (uploadedImageUrl.value) {
    URL.revokeObjectURL(uploadedImageUrl.value)
  }
})
</script>

<style scoped>
.generate-container {
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, rgba(10, 14, 46, 0.3) 0%, rgba(26, 26, 62, 0.3) 50%, rgba(45, 27, 105, 0.3) 100%);
  color: white;
  overflow: hidden;
}

/* Background Effects */
.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.3;
}

.grid-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: float-glow 6s ease-in-out infinite;
}

.glow-orb-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.glow-orb-2 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  bottom: 30%;
  right: 15%;
  animation-delay: 3s;
}

@keyframes float-glow {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
}

.scanning-line {
  position: absolute;
  width: 2px;
  height: 100vh;
  background: linear-gradient(to bottom, transparent, #00d4ff, transparent);
  right: 30%;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateX(-100vw); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100vw); opacity: 0; }
}

/* Back Button */
.back-button-container {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 50;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-button:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.4);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.25);
}

.back-button:active {
  transform: translateY(0);
}

.back-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: translateX(-2px);
}

.back-text {
  white-space: nowrap;
}

/* Main Layout */
.main-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 400px 1fr;
  height: calc(100vh - 4rem);
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: stretch;
}

/* Left Panel */
.left-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.panel-header {
  margin-bottom: 2rem;
  text-align: center;
}

/* Left Panel Sections */
.left-top-section {
  flex: 0 0 auto;
}

.left-bottom-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.left-bottom-section .control-section:last-child {
  margin-bottom: 0;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #00d4ff, #9333ea);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.status-indicator.active {
  color: #00d4ff;
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
  transition: all 0.3s ease;
}

.status-indicator.active .pulse {
  background: #00d4ff;
  animation: pulse-glow 1.5s infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Control Sections */
.control-section {
  margin-bottom: 1.5rem;
}

.left-top-section .control-section {
  margin-bottom: 0.5rem;
}

.left-bottom-section .control-section {
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Upload Area */
.upload-area {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  
  /* 发光脉冲边框 */
  animation: pulse-glow-border 2s ease-in-out infinite;
  box-shadow: 
    0 0 0 1px rgba(0, 212, 255, 0.1),
    0 0 20px rgba(0, 212, 255, 0.1),
    inset 0 0 20px rgba(0, 212, 255, 0.05);
}

.upload-area:hover, .upload-area.drag-over {
  border-color: rgba(0, 212, 255, 0.8);
  background: rgba(0, 212, 255, 0.05);
  transform: scale(1.02);
  animation: pulse-glow-border-active 1s ease-in-out infinite;
  box-shadow: 
    0 0 0 2px rgba(0, 212, 255, 0.4),
    0 0 30px rgba(0, 212, 255, 0.3),
    inset 0 0 30px rgba(0, 212, 255, 0.1);
}

.upload-area.has-file {
  padding: 0;
  border-style: solid;
  border-color: rgba(0, 212, 255, 0.6);
  animation: pulse-glow-border-success 3s ease-in-out infinite;
  box-shadow: 
    0 0 0 1px rgba(0, 212, 255, 0.3),
    0 0 25px rgba(0, 212, 255, 0.2),
    inset 0 0 25px rgba(0, 212, 255, 0.08);
}

.upload-placeholder .upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-text {
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.9rem;
  color: #94a3b8;
}

.uploaded-file {
  position: relative;
}

.preview-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.clear-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: rgba(239, 68, 68, 1);
  transform: scale(1.1);
}

@keyframes grid-move-slow {
  0% { transform: translate(0, 0); }
  100% { transform: translate(20px, 20px); }
}

@keyframes pulse-glow-border {
  0%, 100% {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 0 0 1px rgba(0, 212, 255, 0.1),
      0 0 20px rgba(0, 212, 255, 0.1),
      inset 0 0 20px rgba(0, 212, 255, 0.05);
  }
  50% {
    border-color: rgba(0, 212, 255, 0.5);
    box-shadow: 
      0 0 0 1px rgba(0, 212, 255, 0.2),
      0 0 25px rgba(0, 212, 255, 0.2),
      inset 0 0 25px rgba(0, 212, 255, 0.1);
  }
}

@keyframes pulse-glow-border-active {
  0%, 100% {
    box-shadow: 
      0 0 0 2px rgba(0, 212, 255, 0.4),
      0 0 30px rgba(0, 212, 255, 0.3),
      inset 0 0 30px rgba(0, 212, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 0 2px rgba(0, 212, 255, 0.6),
      0 0 40px rgba(0, 212, 255, 0.5),
      inset 0 0 40px rgba(0, 212, 255, 0.2);
  }
}

@keyframes pulse-glow-border-success {
  0%, 100% {
    border-color: rgba(0, 212, 255, 0.6);
    box-shadow: 
      0 0 0 1px rgba(0, 212, 255, 0.3),
      0 0 25px rgba(0, 212, 255, 0.2),
      inset 0 0 25px rgba(0, 212, 255, 0.08);
  }
  50% {
    border-color: rgba(0, 212, 255, 0.8);
    box-shadow: 
      0 0 0 1px rgba(0, 212, 255, 0.4),
      0 0 35px rgba(0, 212, 255, 0.3),
      inset 0 0 35px rgba(0, 212, 255, 0.15);
  }
}

/* Prompt Input */
.prompt-container {
  position: relative;
}

.prompt-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 0.95rem;
  resize: none;
  transition: all 0.3s ease;
  height: 240px;
  max-height: 240px;
}

.prompt-input:focus {
  outline: none;
  border-color: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

.prompt-input::placeholder {
  color: #94a3b8;
}

.prompt-counter {
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 0.8rem;
  color: #94a3b8;
}

/* Generate Button Gradient */
.generate-button-gradient {
  width: 100%;
  min-height: 48px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.generate-button-gradient.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.generate-button-gradient.generating {
  animation: generating-pulse 2s ease-in-out infinite;
}

@keyframes generating-pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.02);
    opacity: 0.9;
  }
}

.button-content-gradient {
  position: relative;
  z-index: 10;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.button-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Right Panel */
.right-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.display-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #e2e8f0;
}

.display-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.control-btn:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: #00d4ff;
}

/* Display Area */
.display-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  position: relative;
}

/* Empty State */
.empty-state {
  text-align: center;
  opacity: 0.7;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.empty-hint {
  color: #94a3b8;
}

/* AI Processing with Orbiting Circles */
.ai-processing {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.processing-orbits {
  margin-bottom: 1rem;
}

.processing-center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%);
  border: 2px solid rgba(0, 212, 255, 0.4);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 20px rgba(0, 212, 255, 0.3),
    inset 0 0 20px rgba(0, 212, 255, 0.1);
  animation: center-pulse 2s ease-in-out infinite;
}

.processing-text-large {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00d4ff;
  text-shadow: 
    0 0 10px rgba(0, 212, 255, 0.8),
    0 0 20px rgba(0, 212, 255, 0.4);
  animation: text-glow 3s ease-in-out infinite;
}

@keyframes center-pulse {
  0%, 100% { 
    transform: scale(1);
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 
      0 0 20px rgba(0, 212, 255, 0.3),
      inset 0 0 20px rgba(0, 212, 255, 0.1);
  }
  50% { 
    transform: scale(1.05);
    border-color: rgba(0, 212, 255, 0.8);
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.5),
      inset 0 0 30px rgba(0, 212, 255, 0.2);
  }
}

@keyframes text-glow {
  0%, 100% { 
    text-shadow: 
      0 0 10px rgba(0, 212, 255, 0.8),
      0 0 20px rgba(0, 212, 255, 0.4);
  }
  50% { 
    text-shadow: 
      0 0 15px rgba(0, 212, 255, 1),
      0 0 30px rgba(0, 212, 255, 0.6),
      0 0 40px rgba(147, 51, 234, 0.4);
  }
}


.progress-bar {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #9333ea);
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Result Display */
.result-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.generated-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.generated-image:hover {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.result-container:hover .image-overlay {
  opacity: 1;
}

.fullscreen-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.fullscreen-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

/* Fullscreen Modal */
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.fullscreen-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.close-fullscreen {
  position: absolute;
  top: -40px;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-fullscreen:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Loading State Enhancements */
.countdown-text {
  color: #e2e8f0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.countdown-number {
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  animation: number-glow 2s ease-in-out infinite;
  transition: transform 0.3s ease;
  display: inline-block;
  min-width: 1.2em;
  text-align: center;
}

.countdown-number:hover {
  transform: scale(1.1);
}

@keyframes number-glow {
  0%, 100% { 
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    transform: scale(1);
  }
  50% { 
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.4);
    transform: scale(1.05);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .back-button-container {
    top: 1rem;
    left: 1rem;
  }
  
  .left-panel {
    order: 2;
  }
  
  .right-panel {
    order: 1;
  }
}

@media (max-width: 768px) {
  .left-panel, .right-panel {
    padding: 1.5rem;
  }
  
  .display-area {
    min-height: 300px;
  }
  
  .upload-area {
    padding: 1.5rem;
  }
  
  .back-button-container {
    top: 0.75rem;
    left: 0.75rem;
  }
  
  .back-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .back-icon {
    font-size: 1rem;
  }
}
</style>