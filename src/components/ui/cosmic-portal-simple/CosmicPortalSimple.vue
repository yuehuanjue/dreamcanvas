<template>
  <div :class="cn('absolute inset-0 overflow-hidden', props.class)">
    <!-- Animated cosmic background -->
    <div class="cosmic-background">
      <!-- Stars field -->
      <div class="stars-layer">
        <div
          v-for="(star, index) in stars"
          :key="index"
          class="star"
          :style="{
            left: star.x + '%',
            top: star.y + '%',
            animationDelay: star.delay + 's',
            animationDuration: star.duration + 's',
          }"
        />
      </div>
      
      <!-- Portal rings -->
      <div class="portal-center">
        <div class="portal-ring ring-1"></div>
        <div class="portal-ring ring-2"></div>
        <div class="portal-ring ring-3"></div>
        <div class="portal-core"></div>
      </div>
      
      <!-- Floating crystals -->
      <div class="crystals-layer">
        <div
          v-for="(crystal, index) in crystals"
          :key="index"
          class="crystal"
          :style="{
            left: crystal.x + '%',
            top: crystal.y + '%',
            animationDelay: crystal.delay + 's',
            animationDuration: crystal.duration + 's',
          }"
        />
      </div>
      
      <!-- Energy streams -->
      <div class="energy-streams">
        <div
          v-for="n in 6"
          :key="`stream-${n}`"
          class="energy-stream"
          :style="{
            transform: `rotate(${n * 60}deg)`,
            animationDelay: `${n * 0.5}s`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { ref, onMounted } from "vue";

interface Props {
  particleCount?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 100,
});

interface Star {
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface Crystal {
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const stars = ref<Star[]>([]);
const crystals = ref<Crystal[]>([]);

onMounted(() => {
  // Generate stars
  stars.value = Array.from({ length: props.particleCount }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
  }));
  
  // Generate crystals
  crystals.value = Array.from({ length: 8 }, () => ({
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    delay: Math.random() * 2,
    duration: 6 + Math.random() * 4,
  }));
});
</script>

<style scoped>
.cosmic-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(52, 152, 219, 0.1) 30%,
    rgba(0, 212, 255, 0.05) 60%,
    transparent 100%
  );
}

.stars-layer {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: twinkle linear infinite;
  box-shadow: 0 0 6px rgba(0, 212, 255, 0.6);
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.5);
  }
}

.portal-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.portal-ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: rotate-portal linear infinite;
}

.ring-1 {
  width: 200px;
  height: 200px;
  border-color: rgba(147, 51, 234, 0.4);
  animation-duration: 20s;
  top: -100px;
  left: -100px;
}

.ring-2 {
  width: 150px;
  height: 150px;
  border-color: rgba(52, 152, 219, 0.5);
  animation-duration: 15s;
  animation-direction: reverse;
  top: -75px;
  left: -75px;
}

.ring-3 {
  width: 100px;
  height: 100px;
  border-color: rgba(0, 212, 255, 0.6);
  animation-duration: 10s;
  top: -50px;
  left: -50px;
}

.portal-core {
  width: 40px;
  height: 40px;
  background: radial-gradient(
    circle,
    rgba(0, 212, 255, 0.8) 0%,
    rgba(147, 51, 234, 0.6) 50%,
    transparent 100%
  );
  border-radius: 50%;
  top: -20px;
  left: -20px;
  position: absolute;
  animation: pulse-core 3s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
}

@keyframes rotate-portal {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-core {
  0%, 100% { 
    opacity: 0.6;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
}

.crystals-layer {
  position: absolute;
  inset: 0;
}

.crystal {
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, rgba(147, 51, 234, 0.8), rgba(0, 212, 255, 0.8));
  transform: rotate(45deg);
  animation: float-crystal linear infinite;
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.6);
}

@keyframes float-crystal {
  0%, 100% { 
    transform: rotate(45deg) translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% { 
    transform: rotate(45deg) translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

.energy-streams {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.energy-stream {
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(
    to top,
    transparent,
    rgba(0, 212, 255, 0.6),
    transparent
  );
  animation: flow-energy 4s ease-in-out infinite;
  transform-origin: bottom center;
}

@keyframes flow-energy {
  0%, 100% { 
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% { 
    opacity: 1;
    transform: scaleY(1.5);
  }
}
</style>