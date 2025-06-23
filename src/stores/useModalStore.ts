import {defineStore} from "pinia";

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
