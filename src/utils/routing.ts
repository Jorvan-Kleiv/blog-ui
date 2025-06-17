import {createRouter, createWebHistory} from 'vue-router'

import Articles from '../components/Articles.vue';
import Article from "../components/Article.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Settings from "../components/Settings.vue";
import {ref} from "vue";
import Profile from "../components/Profile.vue";
import {useAuthStore} from "../stores/useAuthStore.ts";

const routes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    {path: '/profile', component: Profile},
    {path: '/settings', component: Settings},
    { path: '/', name: "articles", component: Articles},
    { path: '/article/:id',name: "article", component: Article, props: true },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    const user = ref({})
    const authStore = useAuthStore()
    authStore.loadAuthUser();
    user.value = authStore.user;
    const publicPages = ['/', '/article/*', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && user.value == null) {
        return router.push('/login');
    }
})
export default router;
