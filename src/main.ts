import {createApp, markRaw} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./utils/routing.ts";


const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
})
app.use(pinia);
app.use(router);
app.mount('#app');
