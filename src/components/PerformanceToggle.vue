<template>
  <div class="performance-toggle">
    <button
      @click="togglePerformance"
      class="toggle-btn"
      :class="{ 'performance-mode': isPerformanceMode }"
      :title="isPerformanceMode ? '切换到高质量模式' : '切换到性能模式'"
    >
      <span class="icon">{{ isPerformanceMode ? '⚡' : '✨' }}</span>
    </button>

    <div v-if="showSettings" class="settings-panel">
      <div class="setting-item">
        <label>性能模式</label>
        <select v-model="currentPreference" @change="handlePreferenceChange">
          <option value="auto">自动</option>
          <option value="performance">性能优先</option>
          <option value="quality">质量优先</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { performanceManager } from '@/lib/performance'

const currentPreference = ref(performanceManager.userPreference.value)
const showSettings = ref(false)

const isPerformanceMode = computed(() => {
  return currentPreference.value === 'performance'
})

const togglePerformance = () => {
  const newMode = isPerformanceMode.value ? 'quality' : 'performance'
  currentPreference.value = newMode
  performanceManager.setUserPreference(newMode)
}

const handlePreferenceChange = () => {
  performanceManager.setUserPreference(currentPreference.value)
}
</script>

<style scoped>
.performance-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toggle-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}

.toggle-btn.performance-mode {
  border-color: rgba(255, 193, 7, 0.6);
  background: rgba(255, 193, 7, 0.1);
}

.icon {
  font-size: 20px;
}

.settings-panel {
  position: absolute;
  top: 60px;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  min-width: 200px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.setting-item label {
  color: white;
  font-size: 0.9rem;
}

.setting-item select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  padding: 0.25rem;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .performance-toggle {
    top: 10px;
    right: 10px;
  }

  .toggle-btn {
    width: 40px;
    height: 40px;
  }

  .icon {
    font-size: 16px;
  }
}
</style>