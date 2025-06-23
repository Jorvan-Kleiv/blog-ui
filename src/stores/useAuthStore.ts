import {defineStore} from "pinia";
import type {User} from "../type/types.ts";
import {apiFetch} from "../axiosInstance.ts";
import router from "../utils/routing.ts";

export const useAuthStore = defineStore("useAuthStore", {
    state: () => ({
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "null") : null,
        trendingAuthors: [] as User[] | undefined,

    }),
    getters: {},
    actions: {
       async loadAuthUser() {
            await apiFetch<User>("/user", { method: 'GET' }).then((res: User | any) => {
                this.user = res.data;
                console.log(res.data)
            })
        },
        async register(payload: User | any) {
            try {
                await apiFetch<User>("/register", { payload }).then((res: User | any) => {
                    console.log(res.username, res.email,);
                    this.user = res.data;
                    localStorage.setItem("user", JSON.stringify(res.data));
                    document.startViewTransition(() => {
                        router.push("/articles")
                    })
                });
                await this.loadAuthUser();
                console.log("Registered:");
            } catch (error) {
                console.error("Registration error:", error);
                throw error;
            }
        },
        async login(payload: User | any) {
            try {
                const res = await apiFetch<User | any>("/login", { payload: {...payload} });
                console.log(res);
                this.user = res.data;
                localStorage.setItem("user", JSON.stringify(res.data));
                await router.push("/articles");
                console.log("Logged in:");
            } catch (error) {
                console.error("Login error:", error);
                throw error;
            }
        },

        async logout(){
            this.user = null;
            localStorage.removeItem("user");
            await router.push("/sign-in");
        },
        async loadTrendingAuthors()
        {
            try {
                const res = await apiFetch<User[] | any>("/v1/articles/trending", { method: 'GET' });
                console.log(res);
                this.trendingAuthors = res.data;
            } catch (error) {
                console.error("Error loading trending authors:", error);
                throw error;
            }
        }
    },

})
