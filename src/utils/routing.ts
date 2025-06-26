import {createRouter, createWebHistory} from 'vue-router'
import Landing from "../components/pages/home/Landing.vue";
import Articles from '../components/pages/Articles.vue';
import Article from "../components/pages/Article.vue";
import Login from "../components/pages/auth/Login.vue";
import Register from "../components/pages/auth/Register.vue";
import Settings from "../components/pages/Settings.vue";
import Profile from "../components/pages/Profile.vue";
import {useAuthStore} from "../stores/useAuthStore.ts";

const routes = [
    { path: "/", component: Landing, meta: { layout: "guest" } },
    { path: "/sign-in", component: Login, meta: { layout: "guest" } },
    { path: "/sign-up", component: Register, meta: { layout: "guest" } },
    { path: "/articles", name: "articles", component: Articles, meta: { layout: "auth" } },
    { path: "/articles/article/:id", name: "article", component: Article, props: true, meta: { layout: "auth" } },
    { path: "/profile", component: Profile, meta: { layout: "auth" } },
    { path: "/settings", component: Settings, meta: { layout: "auth" } },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore()
    try {
        await authStore.loadAuthUser();
    } catch (e) {
        console.error("Error loading user:", e);
    }

    const publicPages = ['/', '/articles', '/sign-in', '/sign-up'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !authStore.user) {
        return '/sign-in';
    }

    return true;
});
export default router;
