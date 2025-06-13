import {createRouter, createWebHistory} from 'vue-router'

import Articles from '../components/Articles.vue';
import Article from "../components/Article.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import {useAuthStore} from "../stores/useAuthStore.ts";
import {instance} from "../axiosInstance.ts";
import {ref} from "vue";

const routes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/', name: "articles", component: Articles},
    { path: '/article/:id',name: "article", component: Article, props: true },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
const user = ref({})
const res = instance.get("/user").then((response) => {
    user.value = response.data.data;
});
router.beforeEach(async (to) => {
    const publicPages = ['/', '/article/*', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && user == null) {
        return router.push('/login');
    }
})
export default router;
