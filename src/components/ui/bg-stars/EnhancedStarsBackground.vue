<template>
  <div
    :class="
      cn(
        'relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]',
        props.class,
      )
    "
    @mousemove="handleMouseMove"
  >
    <!-- 星座连线 Canvas -->
    <canvas
      ref="constellationCanvas"
      class="absolute inset-0 z-[1] pointer-events-none"
    />

    <motion.div :style="{ x: springX, y: springY }">
      <!-- 原有的星星层 -->
      <motion.div
        class="absolute top-0 left-0 w-full h-[2000px]"
        :animate="{ y: [0, -2000] }"
        :transition="starLayer1Transition"
      >
        <div
          class="absolute bg-transparent rounded-full"
          :style="{
            width: '1px',
            height: '1px',
            boxShadow: boxShadow1,
          }"
        />
        <div
          class="absolute bg-transparent rounded-full top-[2000px]"
          :style="{
            width: '1px',
            height: '1px',
            boxShadow: boxShadow1,
          }"
        />
      </motion.div>

      <motion.div
        class="absolute top-0 left-0 w-full h-[2000px]"
        :animate="{ y: [0, -2000] }"
        :transition="starLayer2Transition"
      >
        <div
          class="absolute bg-transparent rounded-full"
          :style="{
            width: '2px',
            height: '2px',
            boxShadow: boxShadow2,
          }"
        />
        <div
          class="absolute bg-transparent rounded-full top-[2000px]"
          :style="{
            width: '2px',
            height: '2px',
            boxShadow: boxShadow2,
          }"
        />
      </motion.div>

      <motion.div
        class="absolute top-0 left-0 w-full h-[2000px]"
        :animate="{ y: [0, -2000] }"
        :transition="starLayer3Transition"
      >
        <div
          class="absolute bg-transparent rounded-full"
          :style="{
            width: '3px',
            height: '3px',
            boxShadow: boxShadow3,
          }"
        />
        <div
          class="absolute bg-transparent rounded-full top-[2000px]"
          :style="{
            width: '3px',
            height: '3px',
            boxShadow: boxShadow3,
          }"
        />
      </motion.div>
    </motion.div>

    <!-- 流星容器 -->
    <div class="absolute inset-0 z-[2] pointer-events-none">
      <div 
        v-for="meteor in meteors" 
        :key="meteor.id"
        class="meteor"
        :style="meteor.style"
      >
        <div class="meteor-tail"></div>
        <div class="meteor-head"></div>
      </div>
    </div>

    <!-- Slot for child content -->
    <div class="relative z-[3]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SpringOptions } from "motion-v";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion-v";
import { computed, onMounted, ref, watch, onUnmounted } from "vue";

interface StarsBackgroundProps {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  meteorFrequency?: number;
  constellationLines?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<StarsBackgroundProps>(), {
  factor: 0.05,
  speed: 50,
  transition: () => ({ stiffness: 50, damping: 20 }),
  starColor: "#fff",
  meteorFrequency: 3000,
  constellationLines: true,
});

defineSlots();

// 原有星星相关代码
function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

const offsetX = useMotionValue(1);
const offsetY = useMotionValue(1);
const springX = useSpring(offsetX, props.transition);
const springY = useSpring(offsetY, props.transition);

function handleMouseMove(e: MouseEvent) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const newOffsetX = -(e.clientX - centerX) * props.factor;
  const newOffsetY = -(e.clientY - centerY) * props.factor;
  offsetX.set(newOffsetX);
  offsetY.set(newOffsetY);
}

const boxShadow1 = ref("");
const boxShadow2 = ref("");
const boxShadow3 = ref("");

// 流星相关
const meteors = ref<Array<{
  id: number;
  style: any;
}>>([]);

let meteorId = 0;
let meteorInterval: NodeJS.Timeout;
const constellationCanvas = ref<HTMLCanvasElement>();
let animationFrame: number;

// 创建流星
function createMeteor() {
  const colors = ['#00d4ff', '#9333ea', '#ec4899', '#10b981', '#f59e0b'];
  const meteorColor = colors[Math.floor(Math.random() * colors.length)];
  
  const meteor = {
    id: meteorId++,
    style: {
      '--start-x': Math.random() * 100 + '%',
      '--start-y': Math.random() * 30 + '%',
      '--end-x': Math.random() * 100 + '%',
      '--end-y': (Math.random() * 40 + 60) + '%',
      '--duration': (Math.random() * 2 + 1.5) + 's',
      '--delay': Math.random() * 1 + 's',
      '--meteor-color': meteorColor,
      left: 'var(--start-x)',
      top: 'var(--start-y)',
      animation: `meteor-fall var(--duration) var(--delay) ease-out forwards`,
    }
  };
  
  meteors.value.push(meteor);
  
  // 清理已完成的流星
  setTimeout(() => {
    meteors.value = meteors.value.filter(m => m.id !== meteor.id);
  }, 6000);
}

// 星座连线
const starPositions = ref<Array<{x: number, y: number}>>([]);

function generateConstellationStars() {
  const stars = [];
  for (let i = 0; i < 20; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
  }
  return stars;
}

function drawConstellations() {
  const canvas = constellationCanvas.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 绘制连线
  ctx.strokeStyle = `${props.starColor}30`; // 30% 透明度
  ctx.lineWidth = 1;
  
  starPositions.value.forEach((star, index) => {
    // 连接到附近的星星
    starPositions.value.forEach((otherStar, otherIndex) => {
      if (index !== otherIndex) {
        const distance = Math.sqrt(
          Math.pow(star.x - otherStar.x, 2) + Math.pow(star.y - otherStar.y, 2)
        );
        
        // 只连接距离较近的星星
        if (distance < 200) {
          ctx.globalAlpha = Math.max(0.1, 1 - distance / 200);
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(otherStar.x, otherStar.y);
          ctx.stroke();
        }
      }
    });
  });
  
  // 绘制星星节点
  ctx.fillStyle = props.starColor;
  ctx.globalAlpha = 0.8;
  starPositions.value.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animateConstellations() {
  // 缓慢移动星座位置
  starPositions.value.forEach(star => {
    star.x += (Math.random() - 0.5) * 0.5;
    star.y += (Math.random() - 0.5) * 0.5;
    
    // 保持在画面内
    if (star.x < 0) star.x = window.innerWidth;
    if (star.x > window.innerWidth) star.x = 0;
    if (star.y < 0) star.y = window.innerHeight;
    if (star.y > window.innerHeight) star.y = 0;
  });
  
  if (props.constellationLines) {
    drawConstellations();
  }
  
  animationFrame = requestAnimationFrame(animateConstellations);
}

onMounted(() => {
  boxShadow1.value = generateStars(1000, props.starColor);
  boxShadow2.value = generateStars(400, props.starColor);
  boxShadow3.value = generateStars(200, props.starColor);
  
  // 初始化星座
  starPositions.value = generateConstellationStars();
  
  // 开始流星效果
  meteorInterval = setInterval(createMeteor, props.meteorFrequency);
  
  // 开始星座动画
  animateConstellations();
});

onUnmounted(() => {
  clearInterval(meteorInterval);
  cancelAnimationFrame(animationFrame);
});

watch(
  () => props.starColor,
  (newColor) => {
    boxShadow1.value = generateStars(1000, newColor);
    boxShadow2.value = generateStars(400, newColor);
    boxShadow3.value = generateStars(200, newColor);
  },
);

const starLayer1Transition = computed(() => ({
  repeat: Infinity,
  duration: props.speed,
  ease: "linear",
}));

const starLayer2Transition = computed(() => ({
  repeat: Infinity,
  duration: props.speed * 2,
  ease: "linear",
}));

const starLayer3Transition = computed(() => ({
  repeat: Infinity,
  duration: props.speed * 3,
  ease: "linear",
}));
</script>

<style scoped>
@keyframes meteor-fall {
  0% {
    transform: translate(0, 0) rotate(-45deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(
      calc(var(--end-x) - var(--start-x)), 
      calc(var(--end-y) - var(--start-y))
    ) rotate(-45deg);
    opacity: 0;
  }
}

.meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  pointer-events: none;
}

.meteor-head {
  width: 2px;
  height: 2px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 
    0 0 6px #00d4ff,
    0 0 12px #00d4ff,
    0 0 18px #00d4ff;
}

.meteor-tail {
  position: absolute;
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, 
    rgba(0, 212, 255, 0.8) 0%,
    rgba(0, 212, 255, 0.4) 50%,
    transparent 100%);
  transform: translateX(-60px);
  border-radius: 1px;
}
</style>