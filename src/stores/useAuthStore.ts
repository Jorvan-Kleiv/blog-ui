import {defineStore} from "pinia";
import type {User} from "../type/types.ts";
import {apiFetch} from "../axiosInstance.ts";
import router from "../utils/routing.ts";

export const useAuthStore = defineStore("useAuthStore", {
    state: () => ({
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
        trendingAuthors: [] as User[] | undefined,

    }),
    getters: {},
    actions: {
        loadAuthUser() {
            apiFetch<User>("/user", { method: 'GET' }).then((res) => {
                this.user = res;
                localStorage.setItem("user", JSON.stringify(res));
            })
        },
        register(payload: User) {
            try {
                apiFetch<User>("/register", { payload: {...payload} }).then(res => {
                    console.log(res.username, res.email,);
                    localStorage.setItem("user", JSON.stringify(res));
                    this.user = res;
                    document.startViewTransition(() => {
                        router.push("/")
                    })
                });
                console.log("Registered:");
            } catch (error) {
                console.error("Registration error:", error);
                throw error;
            }
        },
        login(payload: User) {
            try {
                apiFetch<User>("/login", { payload: {...payload} }).then((res: User) => {
                    console.log(res);
                    localStorage.setItem("user", JSON.stringify(res));
                    this.user = res;
                    router.push("/")
                });
                console.log("Logged in:");
            } catch (error) {
                console.error("Logged in error:", error);
                throw error;
            }
        },

        logout(){
            localStorage.removeItem("user");
            this.user = null;
            router.push("/login");
        },
        loadTrendingAuthors()
        {
            apiFetch<User[]>("/v1/articles/trending", { method: 'GET' }).then((res) => {
                console.log(res)
                this.trendingAuthors = res;
            })
        }
    },

})