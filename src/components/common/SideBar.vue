<template>
  <div class="md:col-span-2 bg-white max-md:shadow-xs pt-6 pb-2 lg:col-span-2 col-span-6 font-display top-10 self-start sticky text-sm">
    <div class="flex md:flex-col justify-evenly lg:flex-col gap-2 md:my-6">
      <button class="flex items-center gap-1 p-0.5 cursor-pointer transition-all rounded-sm" v-if="route.path =='/'" @click="modal.toggleDrawer">
        <PlusCircleIcon width="16" />
        new article
      </button>
      <RouterLink :class="isCurrentRoute('/articles') || isCurrentRoute('/articles/article')? 'md:bg-purple-200 max-md:border-b md:border-l-2 border-l-violet-500': ''" to="/articles" class="flex gap-1 items-center p-0.5 cursor-pointer transition-all duration-200 md:rounded-sm">
        <Home width="16" />
        Home
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Home, PlusCircleIcon} from "lucide-vue-next";
import {modalStore} from "../../stores/useModalStore.ts";
import {useRoute} from "vue-router";
let modal = modalStore();
const route = useRoute();
function isCurrentRoute(path: string) {
  return route.path == path || path.length > 1 ? route.path.startsWith(path): null;
}

</script>

<style scoped>

</style>