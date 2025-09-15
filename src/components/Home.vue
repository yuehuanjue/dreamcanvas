<template>
  <div class="home-container">
    <!-- Performance Toggle -->
    <PerformanceToggle />

    <!-- Fluid Cursor Effect -->
    <FluidCursor v-if="shouldShowFluidCursor" />

    <!-- Stars Background -->
    <StarsBackground
      v-if="shouldShowParticleEffects"
      :factor="0.08"
      :speed="60"
      starColor="#00d4ff"
      class="absolute inset-0"
    >

    <!-- Main content -->
    <div class="content-wrapper">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-title artistic-title" v-motion-slide-visible-once-bottom>
            <span
              class="title-word ai-word"
              :class="{ 'simple-animation': !shouldUseComplexAnimations }"
            >AI</span>
            <span
              class="title-word generate-word"
              :class="{ 'simple-animation': !shouldUseComplexAnimations }"
            >图像</span>
            <span
              class="title-word image-word"
              :class="{ 'simple-animation': !shouldUseComplexAnimations }"
            >创作</span>
            <span
              class="title-word tool-word"
              :class="{ 'simple-animation': !shouldUseComplexAnimations }"
            >神器</span>
          </div>
          <p class="hero-description artistic-description" v-motion-fade-visible-once>
            <span class="desc-highlight">体验前沿</span>的人工智能图像生成技术，<span class="desc-accent">将您的创意</span>转化为<span class="desc-glow">惊艳的视觉作品</span>
          </p>
          
          <!-- CTA Button -->
          <div class="cta-container">
            <ShimmerButton
              @click="navigateToGenerate"
              shimmer-color="#00d4ff"
              background="linear-gradient(45deg, #00d4ff, #9333ea, #ec4899)"
              border-radius="12px"
              shimmer-duration="2s"
              class="cta-button"
              v-motion-slide-visible-once-bottom
            >
              <span class="button-text">开始创作</span>
            </ShimmerButton>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="features-grid" v-motion-fade-visible-once>
          <div 
            class="feature-card" 
            v-for="(feature, index) in features" 
            :key="index"
            v-motion-slide-visible-once-bottom
            :delay="100 + index * 100"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </div>
    </StarsBackground>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { StarsBackground } from '@/components/ui/bg-stars'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { TextReveal } from '@/components/ui/text-reveal'
import { FluidCursor } from '@/components/ui/fluid-cursor'
import { performanceManager } from '@/lib/performance'
import PerformanceToggle from '@/components/PerformanceToggle.vue'
import { computed } from 'vue'

const router = useRouter()

const features = ref([
  {
    icon: '🎨',
    title: 'AI 智能生成',
    description: '先进的人工智能算法，理解您的创意需求'
  },
  {
    icon: '⚡',
    title: '快速处理',
    description: '高效的处理速度，快速生成高质量图像'
  },
  {
    icon: '🌟',
    title: '无限创意',
    description: '突破传统束缚，释放无限的创意可能'
  }
])

const navigateToGenerate = () => {
  router.push('/generate')
}

// Performance optimizations
const shouldShowFluidCursor = computed(() => {
  return performanceManager.config.value.enableComplexAnimations
})

const shouldShowParticleEffects = computed(() => {
  return performanceManager.config.value.enableParticleEffects
})

const shouldUseComplexAnimations = computed(() => {
  return performanceManager.config.value.enableComplexAnimations
})
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  cursor: none; /* 隐藏默认光标，让FluidCursor接管 */
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.6;
  padding: 1rem 0 2rem;
  position: relative;
}

.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  z-index: 10;
  position: relative;
}

.hero-title {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #ec4899 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 0.85;
  letter-spacing: -0.03em;
  filter: drop-shadow(0 10px 30px rgba(0, 212, 255, 0.3));
}

/* Artistic Title Styles */
.artistic-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.title-word {
  display: inline-block;
  position: relative;
  animation: fadeInUp 1.5s ease-out forwards;
  text-shadow:
    0 0 20px rgba(0, 212, 255, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
}

.ai-word {
  font-size: 1.4em;
  background: linear-gradient(45deg, #00d4ff, #87ceeb);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-delay: 0.2s;
  font-weight: 1000;
}

.generate-word {
  background: linear-gradient(135deg, #9333ea, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-delay: 0.5s;
  font-weight: 950;
}

.image-word {
  background: linear-gradient(90deg, #ec4899, #10b981);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-delay: 0.8s;
  font-weight: 950;
}

.tool-word {
  background: linear-gradient(180deg, #10b981, #00d4ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation-delay: 1.1s;
  font-weight: 1000;
  position: relative;
}

.tool-word::after {
  content: '⚡';
  position: absolute;
  top: -15px;
  right: -35px;
  font-size: 0.7em;
  opacity: 0.8;
}

/* Artistic Description Styles */
.artistic-description {
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

.desc-highlight {
  background: linear-gradient(45deg, #00d4ff, #9333ea);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  position: relative;
  animation: pulse 3s ease-in-out infinite;
}

.desc-accent {
  color: #ec4899;
  font-weight: 500;
  text-shadow:
    0 0 10px rgba(236, 72, 153, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.3);
  animation: glow 4s ease-in-out infinite;
}

.desc-glow {
  background: linear-gradient(90deg, #10b981, #00d4ff, #9333ea);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  animation: gradientShift 5s ease-in-out infinite;
  position: relative;
}

.desc-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent);
  transform: translate(-50%, -50%);
  animation: underlineGlow 3s ease-in-out infinite;
}

/* Enhanced Keyframe Animations - GPU Optimized */
@keyframes titleFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1) rotateZ(0deg);
  }
  25% {
    transform: translate3d(0, -3px, 0) scale(1.01) rotateZ(0.5deg);
  }
  50% {
    transform: translate3d(0, -8px, 0) scale(1.03) rotateZ(0deg);
  }
  75% {
    transform: translate3d(0, -3px, 0) scale(1.01) rotateZ(-0.5deg);
  }
}

@keyframes shimmerText {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0.4;
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
  25% {
    opacity: 0.8;
    transform: translate3d(0, -2px, 0) rotate(90deg) scale(1.1);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -4px, 0) rotate(180deg) scale(1.3);
  }
  75% {
    opacity: 0.8;
    transform: translate3d(0, -2px, 0) rotate(270deg) scale(1.1);
  }
}

@keyframes pulse {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

@keyframes glow {
  0%, 100% {
    text-shadow:
      0 0 10px rgba(236, 72, 153, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow:
      0 0 20px rgba(236, 72, 153, 0.8),
      0 0 30px rgba(236, 72, 153, 0.4),
      0 2px 4px rgba(0, 0, 0, 0.3);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes underlineGlow {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 30px, 0) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

/* Simple Animation Fallback for Low Performance */
.simple-animation {
  animation: simpleFadeIn 1s ease-out forwards !important;
}

@keyframes simpleFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.simple-animation.ai-word {
  background: #00d4ff !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: none !important;
  filter: none !important;
  transform: none !important;
}

.simple-animation.generate-word {
  background: #9333ea !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: none !important;
  filter: none !important;
  transform: none !important;
}

.simple-animation.image-word {
  background: #ec4899 !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: none !important;
  filter: none !important;
  transform: none !important;
}

.simple-animation.tool-word {
  background: #10b981 !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: none !important;
  filter: none !important;
  transform: none !important;
}

.simple-animation.tool-word::after,
.simple-animation.tool-word::before {
  display: none !important;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(226, 232, 240, 0.9);
  margin-bottom: 2rem;
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* CTA Button */
.cta-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.cta-button {
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 28px;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.button-text {
  position: relative;
  z-index: 10;
}

/* Features Section */
.features-section {
  padding: 1rem 0 3rem;
  width: 100%;
  margin-top: -2rem;
  position: relative;
  z-index: 5;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(0, 212, 255, 0.05) 0%, 
    rgba(147, 51, 234, 0.05) 50%, 
    rgba(236, 72, 153, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 24px;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 212, 255, 0.1),
    0 0 0 1px rgba(0, 212, 255, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #00d4ff;
}

.feature-description {
  color: rgba(226, 232, 240, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Performance Optimizations */
@media (prefers-reduced-motion: reduce) {
  .title-word {
    animation: simpleFadeIn 1s ease-out forwards !important;
  }

  .title-word::after,
  .title-word::before {
    animation: none !important;
  }

  .desc-highlight,
  .desc-accent,
  .desc-glow {
    animation: none !important;
  }
}

/* GPU Layer Promotion for Smooth Animation */
.artistic-title {
  transform: translateZ(0);
  backface-visibility: hidden;
}

.feature-card {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-wrapper {
    padding: 0 1.5rem;
  }

  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  .artistic-title {
    gap: 0.3rem;
  }

  .title-word {
    font-size: 0.9em;
  }

  .tool-word::after {
    right: -20px;
    font-size: 0.5em;
  }

  /* Reduce animation complexity on tablets */
  .title-word {
    text-shadow:
      0 0 15px rgba(0, 212, 255, 0.4),
      0 0 30px rgba(147, 51, 234, 0.2),
      0 5px 10px rgba(0, 0, 0, 0.3);
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem;
  }

  .hero-section {
    min-height: 60vh;
    padding: 1.5rem 0 2rem;
  }

  .artistic-title {
    flex-direction: column;
    gap: 0.2rem;
  }

  .title-word {
    font-size: 0.8em;
  }

  .ai-word {
    font-size: 1em;
  }

  .tool-word::after {
    right: -15px;
    font-size: 0.4em;
  }

  .hero-description {
    margin-bottom: 2rem;
  }

  .cta-button {
    padding: 16px 32px;
    font-size: 1rem;
  }

  .features-section {
    padding: 2rem 0 4rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 0.75rem;
  }
  
  .hero-content {
    max-width: 100%;
  }
  
  .cta-button {
    padding: 14px 28px;
    font-size: 0.95rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
}

/* Smooth scrolling */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style>