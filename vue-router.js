import index from '@/views/index.vue';
import exhibition from '@/views/exhibition.vue';
import about from '@/views/about.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: index },
    { path: '/exhibition', component: exhibition },
    { path: '/about', component: about },
]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes,
})

export default router;