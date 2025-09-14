<template>
  <button
    v-bind="$attrs"
    :class="cn(
      'relative overflow-hidden transition-all duration-300 ease-out',
      'transform active:scale-95',
      props.class
    )"
    @click="handleClick"
  >
    <!-- Ripple effects container -->
    <div class="absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        v-for="ripple in ripples"
        :key="ripple.id"
        class="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
        :style="{
          left: ripple.x + 'px',
          top: ripple.y + 'px',
          width: ripple.size + 'px',
          height: ripple.size + 'px',
          transform: 'translate(-50%, -50%)',
          animationDuration: ripple.duration + 'ms',
        }"
      />
    </div>

    <!-- Button content -->
    <div class="relative z-10">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { ref } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
  rippleDuration?: number;
  rippleColor?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const props = withDefaults(defineProps<Props>(), {
  rippleDuration: 600,
  rippleColor: "rgba(255, 255, 255, 0.3)",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const ripples = ref<Ripple[]>([]);
let rippleId = 0;

const handleClick = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement;
  const rect = button.getBoundingClientRect();
  
  // Calculate ripple position relative to button
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Calculate size to cover entire button
  const size = Math.max(rect.width, rect.height) * 2;
  
  // Create new ripple
  const newRipple: Ripple = {
    id: rippleId++,
    x,
    y,
    size,
    duration: props.rippleDuration,
  };
  
  ripples.value.push(newRipple);
  
  // Remove ripple after animation completes
  setTimeout(() => {
    const index = ripples.value.findIndex(r => r.id === newRipple.id);
    if (index > -1) {
      ripples.value.splice(index, 1);
    }
  }, props.rippleDuration);
  
  // Emit click event
  emit('click', event);
};
</script>

<style scoped>
@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple linear forwards;
}
</style>