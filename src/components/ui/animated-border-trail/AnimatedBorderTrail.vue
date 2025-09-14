<template>
  <div :class="cn('relative', containerClass)">
    <!-- Animated border trail -->
    <div
      class="absolute inset-0 rounded-[inherit] overflow-hidden"
      :style="{ borderRadius: 'inherit' }"
    >
      <!-- Moving gradient border -->
      <div
        class="absolute inset-0 animate-spin-slow opacity-75"
        :style="{
          background: `conic-gradient(from 0deg, transparent 0deg, ${trailColor} 50deg, transparent 120deg, transparent 240deg, ${trailColor} 290deg, transparent 360deg)`,
          borderRadius: 'inherit',
          animationDuration: duration + 'ms',
        }"
      />
      
      <!-- Inner mask to create border effect -->
      <div
        class="absolute rounded-[inherit]"
        :class="[
          'bg-current',
          maskClass
        ]"
        :style="{
          inset: trailWidth + 'px',
          borderRadius: `calc(inherit - ${trailWidth}px)`,
        }"
      />
    </div>

    <!-- Pulse effect -->
    <div
      v-if="showPulse"
      class="absolute inset-0 rounded-[inherit] animate-pulse-ring opacity-40"
      :style="{
        boxShadow: `0 0 20px ${trailColor}, inset 0 0 20px ${trailColor}`,
        borderRadius: 'inherit',
      }"
    />

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

interface Props {
  containerClass?: HTMLAttributes["class"];
  maskClass?: HTMLAttributes["class"];
  trailColor?: string;
  trailWidth?: number;
  duration?: number;
  showPulse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  trailColor: "#00d4ff",
  trailWidth: 2,
  duration: 3000,
  showPulse: false,
  maskClass: "bg-slate-900",
});
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.8;
  }
}

.animate-spin-slow {
  animation: spin-slow linear infinite;
}

.animate-pulse-ring {
  animation: pulse-ring 2s ease-in-out infinite;
}
</style>