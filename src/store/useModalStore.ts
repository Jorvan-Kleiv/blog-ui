import {defineStore} from "pinia";
import {ref} from "vue";

export const modalStore = defineStore('modalStore', {
    state: () => ({
        isOpen: false,
    }),
    getters: {},
    actions: {
        toggleDrawer() {
            this.isOpen = !this.isOpen
        }
    },
})
