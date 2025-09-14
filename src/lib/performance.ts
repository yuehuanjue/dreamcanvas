import { ref, readonly } from 'vue'

interface PerformanceConfig {
  enableWebGL: boolean
  enableComplexAnimations: boolean
  enableParticleEffects: boolean
  renderQuality: 'low' | 'medium' | 'high'
  maxFPS: number
}

class PerformanceManager {
  private _config = ref<PerformanceConfig>({
    enableWebGL: true,
    enableComplexAnimations: true,
    enableParticleEffects: true,
    renderQuality: 'high',
    maxFPS: 60
  })

  private _isVisible = ref(true)
  private _userPreference = ref<'auto' | 'performance' | 'quality'>('auto')

  constructor() {
    this.detectDevice()
    this.loadUserPreference()
    this.setupVisibilityHandler()
  }

  get config() {
    return readonly(this._config)
  }

  get isVisible() {
    return readonly(this._isVisible)
  }

  get userPreference() {
    return readonly(this._userPreference)
  }

  private detectDevice() {
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const deviceMemory = (navigator as any).deviceMemory || 4
    const userAgent = navigator.userAgent.toLowerCase()

    const isMobile = /mobile|android|iphone|ipad/.test(userAgent)
    const isLowEnd = hardwareConcurrency < 4 || deviceMemory < 4

    if (isMobile || isLowEnd) {
      this._config.value = {
        enableWebGL: !isLowEnd,
        enableComplexAnimations: false,
        enableParticleEffects: false,
        renderQuality: isMobile ? 'low' : 'medium',
        maxFPS: isMobile ? 30 : 45
      }
    }
  }

  private loadUserPreference() {
    const saved = localStorage.getItem('performance-preference')
    if (saved) {
      this._userPreference.value = saved as any
      this.applyUserPreference()
    }
  }

  private setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      this._isVisible.value = !document.hidden
    })
  }

  private applyUserPreference() {
    const pref = this._userPreference.value

    if (pref === 'performance') {
      this._config.value = {
        enableWebGL: false,
        enableComplexAnimations: false,
        enableParticleEffects: false,
        renderQuality: 'low',
        maxFPS: 30
      }
    } else if (pref === 'quality') {
      this._config.value = {
        enableWebGL: true,
        enableComplexAnimations: true,
        enableParticleEffects: true,
        renderQuality: 'high',
        maxFPS: 60
      }
    }
  }

  setUserPreference(preference: 'auto' | 'performance' | 'quality') {
    this._userPreference.value = preference
    localStorage.setItem('performance-preference', preference)

    if (preference === 'auto') {
      this.detectDevice()
    } else {
      this.applyUserPreference()
    }
  }

  shouldRenderFrame(lastFrameTime: number): boolean {
    if (!this._isVisible.value) return false

    const targetFrameTime = 1000 / this._config.value.maxFPS
    return Date.now() - lastFrameTime >= targetFrameTime
  }
}

export const performanceManager = new PerformanceManager()