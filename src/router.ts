import { createRouter, createWebHistory } from 'vue-router'

// strony (na razie proste)
import HomeView from './views/HomeView.vue'
import StudentView from './views/StudentView.vue'
import RankingView from './views/RankingView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/student/:id?', component: StudentView },
    { path: '/ranking', component: RankingView },
  ],
})
