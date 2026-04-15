import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import ChronoGameView from '../components/ChronoGameView.vue'
import GuessGameView from '../components/GuessGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/chrono-game', name: 'chrono', component: ChronoGameView },
    { path: '/guess-game', name: 'guess', component: GuessGameView }
  ]
})

export default router