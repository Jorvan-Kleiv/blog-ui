import {defineStore} from "pinia";
import type {Article} from "../type/types.ts";
import {apiFetch} from "../axiosInstance.ts";

export const useArticleStore = defineStore("useArticleStore", {
    state: () => ({
        articles: [] as Article[] | undefined,
        article: {} as Article | Record<string, unknown>,
    }),
    getters: {

    },
    actions: {
        async loadArticles() {
            try {
                const res = await apiFetch<Article[]>("/v1/articles", {method: 'GET'});
                this.articles = res;
                return res;
            } catch (error) {
                console.error("Failed to load articles:", error);
                throw error;
            }
        },

        async loadArticleById(id: string) {
            try {
                const res = await apiFetch<Article>(`/v1/articles/article/${id}`, {method: 'GET'});
                this.article = res;
                return res;
            } catch (error) {
                console.error(`Failed to load article with ID ${id}:`, error);
                throw error;
            }
        },

        async storeArticle(payload: Article | Record<string, unknown>) {
            try {
                const res = await apiFetch<Article>("/v1/articles/article", { 
                    method: 'POST',
                    payload 
                });

                if (this.articles) {
                    this.articles.push(res);
                } else {
                    this.articles = [res];
                }

                return res;
            } catch (error) {
                console.error("Failed to store article:", error);
                throw error;
            }
        },

        async updateArticle(id: string, payload: Article | FormData | Record<string, unknown>) {
            try {
                const res = await apiFetch<Article>(`/v1/articles/article/${id}`, { 
                    method: 'PUT',
                    payload 
                });

                this.article = res;

                if (this.articles) {
                    const index = this.articles.findIndex(a => a.id === id);
                    if (index !== -1) {
                        this.articles[index] = res;
                    }
                }

                return res;
            } catch (error) {
                console.error(`Failed to update article with ID ${id}:`, error);
                throw error;
            }
        }
    },
})
