import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import Home from './components/Home.vue'
import Generate from './components/Generate.vue'
import './style.css'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/generate', name: 'Generate', component: Generate }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')