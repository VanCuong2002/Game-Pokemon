import MiniGame from '@/views/MiniGame.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/mini-game',
            name: 'mini-game',
            component: MiniGame
        }
    ]
})

export default router
