import {defineStore} from "pinia";
import {apiFetch} from "../axiosInstance.ts";
import type {Article} from "../type/types.ts";

export const useArticleStore = defineStore("useArticleStore", {
    state: () => ({
        articles: [] as Article[] | any,
        article: {} as Article | any
    }),
    getters: {

    },
    actions: {
        async loadArticles() {
            try {
                const res = await apiFetch<Article[] | any>("/v1/articles", {method: 'GET'});
                this.articles = res.data;
                return res;
            } catch (error) {
                console.error("Failed to load articles:", error);
                throw error;
            }
        },

        async loadArticleById(id: string) {
            try {
                const res = await apiFetch<Article | any>(`/v1/articles/article/${id}`, {method: 'GET'});
                this.article = res.data;
                return res;
            } catch (error) {
                console.error(`Failed to load article with ID ${id}:`, error);
                throw error;
            }
        },

        async storeArticle(payload: Article | FormData | any) {
            try {
                const res = await apiFetch<Article | any>("/v1/articles/article", {
                    method: 'POST',
                    payload
                });

                if (this.articles) {
                    this.articles.push(res.data);
                    await this.loadArticles();
                } else {
                    this.articles = [res];
                }

                return res.data;
            } catch (error) {
                console.error("Failed to store article:", error);
                throw error;
            }
        },

        async updateArticle(id: string | any, payload: FormData) {

            try {
                const res = await apiFetch<Article | any>(`/v1/articles/article/${id}`,
                    {
                        payload: payload,
                        method: 'POST'
                    }
                );
                console.log(payload instanceof FormData);
                if (this.articles) {
                    this.article = res.data;
                    await this.loadArticles();
                }
            } catch (error) {
                console.log("error updating article", error);
                throw error;
            }
        },
        async like(id: string) {
            const index = this.articles.findIndex((a: Article) => a.id === id);
            if (index === -1) return;

            const current = this.articles[index];
            const originalLikes = current.likes_count || 0;
            const originalLiked = current.is_liked || false;

            // Toggle like local
            const updated = {
                ...current,
                likes_count: originalLiked ? originalLikes - 1 : originalLikes + 1,
                is_liked: !originalLiked,
            };

            this.articles[index] = updated;
            if (this.article?.id === id) {
                this.article = updated;
            }

            try {
                await apiFetch(`/v1/articles/article/${id}/likes`, { method: 'POST' });
            } catch (error) {
                // Rollback
                this.articles[index] = current;

                if (this.article?.id === id) {
                    this.article = current;
                }
                console.error('Erreur like:', error);
            }
        }


    },

})
