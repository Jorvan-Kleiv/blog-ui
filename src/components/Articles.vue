<template>
 <div class="col-span-6 py-[24px]">
   <div class="flex gap-4 flex-col h-full w-full">
     <Transition
         enter-from-class="opacity-0 transition-all duration-300 ease-in"
         enter-to-class="opacity-100 transition-all duration-300 ease-in"
         leave-from-class="opacity-100 transition-all duration-300 ease-in"
         leave-to-class="opacity-0 transition-all duration-300 ease-in"
     >
       <Drawer v-if="modal.showDrawer" :is-open="modal.showDrawer" />
     </Transition>
    <RouterLink to="/article/1" class="flex flex-col cursor-pointer not-last:border-b border-b-slate-200 pb-1.5 h-fit w-fit" v-for="i of 5">
      <div class="grid grid-cols-6 h-fit gap-[20px]">
        <div class="col-span-4 gap-0.5 flex flex-col">
          <h4 class="font-semibold text-slate-600 leading-5 text-base">
            One morning Gregor Samsa woke up from troubled dreams
          </h4>
          <p class="line-clamp-3 text-slate-600 text-sm font-regular">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <div class="col-span-2 flex justify-end">
          <div class="w-[120px] h-[120px] rounded-sm bg-slate-300"></div>
        </div>
      </div>
      <div class="flex items-end w-full py-0.5 justify-between gap-2">
        <UserAvatar />
        <span class="text-xs text-slate-500">26 Aug 2020 06:56 PM</span>
      </div>
    </RouterLink>
   </div>
 </div>
  <div class="col-span-4 py-[24px]">
    <div class="grid grid-cols-4">
      <div class="col-span-3 gap-1 rounded-sm bg-slate-900/70 flex flex-col h-fit p-2">
        <h5 class="text-sm text-white leading-5 font-semibold">
          Follow us on social media to stay updated and learn more!
        </h5>
        <p class="text-xs text-white font-regular">Stay connected with us on social media to discover exclusive tips, behind-the-scenes content, and the latest updates from our blog. </p>
      </div>
    </div>
    <div class="flex flex-col my-6 gap-3">
      <h3 class="text-base font-semibold mb-2 leading-4 text-slate-600">Trending Authors</h3>
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center" v-for="i in 6">
          <UserAvatar />
          <button class="bg-violet-500 hover:bg-violet-600 transition-all duration-200 cursor-pointer items-center text-white flex gap-1 rounded-sm font-semibold px-3 py-2 text-xs h-fit">
            <Plus width="16" height="16" />
            follow
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col my-6 gap-3">
      <h3 class="text-base font-semibold mb-2 leading-4 text-slate-600">Featured Tags</h3>
      <div class="flex flex-wrap gap-1.5">
        <button class="flex py-1.5 bg-slate-50 hover:bg-slate-100 transition-all duration-200 px-3 text-xs text-slate-600 rounded-2xl h-fit border border-slate-200 items-center" v-for="i in 14">
          <Hash width="12" height="12" color="#45556c" />
          Beauty
        </button>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">

import UserAvatar from "./common/UserAvatar.vue";
import {Plus} from "lucide-vue-next";
import {Hash} from "lucide-vue-next";
import Drawer from "./common/Drawer.vue";
import {modalStore} from "../store/useModalStore.ts";
let modal = modalStore();
</script>
<style scoped>

</style>