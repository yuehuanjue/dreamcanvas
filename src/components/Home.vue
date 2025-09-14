<template>
  <div class="home-container">
    <!-- Fluid Cursor Effect -->
    <FluidCursor/>
    
    <!-- Stars Background -->
    <StarsBackground
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
          <TextReveal
            class="hero-title"
            :duration="0.8"
            :delay="0.3"
            :stagger="0.15"
          >
            AI 生成图片工具
          </TextReveal>
          <p class="hero-description" v-motion-fade-visible-once>
            体验前沿的人工智能图像生成技术，将您的创意转化为惊艳的视觉作品
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
  flex: 1;
  padding: 4rem 0;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #ec4899 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(226, 232, 240, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* CTA Button */
.cta-container {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.cta-button {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 18px 36px;
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
  padding: 4rem 0 6rem;
  width: 100%;
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
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem;
  }
  
  .hero-section {
    min-height: 60vh;
    padding: 2rem 0;
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