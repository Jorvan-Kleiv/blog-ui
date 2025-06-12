import {defineStore} from "pinia";
import {ref} from "vue";

export const modalStore = defineStore('modalStore', {
    state: () => ({
        showDrawer: ref(false),
    }),
    getters: {},
    actions: {
        toggleDrawer() {
            this.showDrawer = !this.showDrawer
        }
    },
})