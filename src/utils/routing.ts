import {createRouter, createWebHistory} from 'vue-router'

import Articles from '../components/Articles.vue';
import Article from "../components/Article.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Validation from "../components/auth/Validation.vue";

const routes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/validation', component: Validation},
    { path: '/', name: "articles", component: Articles},
    { path: '/article/:id',name: "article", component: Article, props: true },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
router.beforeEach(async (to) => {
    const publicPages = ['/', '/article/*', '/login', '/register', '/validation'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired) {
        return router.push('/login');
    }
})
export default router;
