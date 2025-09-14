<template>
  <span class="typing-container">
    <span class="typed-text">{{ displayedText }}</span>
    <span 
      v-if="showCursor"
      class="typing-cursor" 
      :class="{ 'cursor-blink': !isTyping }"
    >|</span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

interface Props {
  text: string | string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorColor?: string;
  startDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  typeSpeed: 100,
  deleteSpeed: 50,
  pauseTime: 2000,
  loop: true,
  showCursor: true,
  cursorColor: '#00d4ff',
  startDelay: 0,
});

const displayedText = ref('');
const isTyping = ref(false);
const currentIndex = ref(0);
const currentTextIndex = ref(0);

let timeoutId: NodeJS.Timeout | null = null;

const texts = computed(() => {
  return Array.isArray(props.text) ? props.text : [props.text];
});

watch(() => props.text, () => {
  restart();
});

function typeText() {
  if (!texts.value.length) return;
  
  isTyping.value = true;
  const currentText = texts.value[currentTextIndex.value];
  
  if (currentIndex.value < currentText.length) {
    displayedText.value += currentText[currentIndex.value];
    currentIndex.value++;
    timeoutId = setTimeout(typeText, props.typeSpeed);
  } else {
    isTyping.value = false;
    if (texts.value.length > 1 && props.loop) {
      timeoutId = setTimeout(deleteText, props.pauseTime);
    }
  }
}

function deleteText() {
  isTyping.value = true;
  
  if (displayedText.value.length > 0) {
    displayedText.value = displayedText.value.slice(0, -1);
    timeoutId = setTimeout(deleteText, props.deleteSpeed);
  } else {
    currentTextIndex.value = (currentTextIndex.value + 1) % texts.value.length;
    currentIndex.value = 0;
    isTyping.value = false;
    timeoutId = setTimeout(typeText, props.typeSpeed);
  }
}

function start() {
  if (props.startDelay > 0) {
    timeoutId = setTimeout(() => {
      typeText();
    }, props.startDelay);
  } else {
    typeText();
  }
}

function stop() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  isTyping.value = false;
}

function restart() {
  stop();
  displayedText.value = '';
  currentIndex.value = 0;
  currentTextIndex.value = 0;
  start();
}

onMounted(() => {
  start();
});

onUnmounted(() => {
  stop();
});

// Expose methods for parent component
defineExpose({
  start,
  stop,
  restart,
});
</script>

<style scoped>
.typing-container {
  display: inline-flex;
  align-items: center;
}

.typed-text {
  display: inline;
}

.typing-cursor {
  display: inline-block;
  color: v-bind(cursorColor);
  font-weight: bold;
  margin-left: 1px;
  animation: cursor-fade 1s ease-in-out infinite;
}

.cursor-blink {
  animation: cursor-blink 1s ease-in-out infinite;
}

@keyframes cursor-fade {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}
</style>