<template>
  <div :class="['overflow-hidden', props.containerClass]">
    <div
      ref="textContainer"
      :class="[props.class]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import type { HTMLAttributes } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
  containerClass?: HTMLAttributes["class"];
  duration?: number;
  delay?: number;
  stagger?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.6,
  delay: 0.2,
  stagger: 0.1,
});

const textContainer = ref<HTMLElement | null>(null);
let animation: gsap.core.Tween;

onMounted(() => {
  if (!textContainer.value) return;

  const text = textContainer.value.textContent || "";
  const words = text.split(" ");
  
  // 清空容器并创建span包装每个单词
  textContainer.value.innerHTML = "";
  const wordSpans = words.map(word => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    textContainer.value?.appendChild(span);
    return span;
  });

  // 初始设置
  gsap.set(textContainer.value, { opacity: 1 });
  gsap.set(wordSpans, { y: "100%", opacity: 0 });

  // 动画
  animation = gsap.to(wordSpans, {
    duration: props.duration,
    delay: props.delay,
    y: "0%",
    opacity: 1,
    stagger: props.stagger,
    ease: "power2.out",
  });
});

onUnmounted(() => {
  animation?.kill();
});
</script>

<style scoped>
.line {
  overflow: hidden;
}
</style>
