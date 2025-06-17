<template>
  <header
      class="flex bg-white justify-between border-b border-b-slate-200 sticky left-0 top-0 z-10 items-center w-full py-2 px-4 md:shadow-xs lg:shadow-xs lg:px-[100px]"
  >
    <div class="flex w-fit flex-col items-center h-fit">
      <div class="bg-violet-400 w-fit text-md px-1 py-0.5 rounded-sm font-bold text-white">
        DB
      </div>
      <p class="text-xs font-medium">Dummy blog</p>
    </div>

    <div class="flex justify-between items-center gap-16">
      <SearchInput />
      <div class="flex md:justify-between md:gap-6 gap-4 items-center w-fit">
        <button
            class="w-fit h-fit border-none bg-transparent relative"
            v-if="useAuth.user && !isPublicPage"
            aria-label="Notifications"
        >
          <span
              class="w-1.5 h-1.5 rounded-full bg-red-600 block absolute right-1 top-0"
          ></span>
          <Bell width="20" class="stroke-slate-400" />
        </button>
        <div
            class="flex gap-2 items-center"
            v-if="useAuth.user && !isPublicPage"
        >
          <button
            class="w-8 h-8 flex items-center justify-center text-white font-medium text-sm rounded-full"
            :style="{ backgroundColor: getRandomColor(user.username) }"
            popovertarget="dd-menu"
          >
            {{ getUserInitials(user) }}
          </button>

          <div popover id="dd-menu">
            <div class="flex flex-col gap-1">
              <div class="py-1 flex items-center gap-x-1">
                <UserIcon width="20" class="stroke-slate-400" />
                <h3
                    class="text-base text-slate-500 capitalize line-clamp-1"
                >
                  {{ user.username }}
                </h3>
              </div>
              <button
                  @click.prevent="useAuthStore().logout()"
                  type="button"
                  class="py-0.5 rounded-sm cursor-pointer text-white active:ring-2 ring-red-200 bg-red-500 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div
            class="flex gap-2 items-center"
            v-else
        >
          <RouterLink
              to="/login"
              class="px-4 flex items-center hover:bg-slate-100 transition-all duration-200 font-semibold py-1.5 text-sm rounded-sm"
          >
            <span>Login</span>
          </RouterLink>
          <RouterLink
              to="/register"
              class="px-4 text-sm hover:bg-violet-600 transition-all duration-200 text-white font-semibold py-1.5 bg-violet-500 rounded-sm"
          >
            Sign up
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import SearchInput from '../../common/SearchInput.vue';
import { Bell, UserIcon } from 'lucide-vue-next';
import { useAuthStore } from '../../../stores/useAuthStore.ts';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import type { User } from '../../../type/types.ts';
import {getRandomColor, getUserInitials} from "../../../utils/UserInitials.ts";

const route = useRoute();
const isPublicPage = computed(() => ['/login', '/register', '/validation'].includes(route.path));
const user = ref<User | any>({});
const useAuth = useAuthStore();
onMounted(() => {
  useAuth.loadAuthUser()
})
user.value = useAuth.user;


</script>

<style scoped>
[popovertarget] {
  anchor-name: --ddown;
}

[popover] {
  position-anchor: --ddown;
  position: fixed;
  inline-size: 180px;
  top: anchor(bottom);
  right: anchor(left);
  justify-self: anchor-center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.06);
  margin-top: 4px;
  padding: 4px;
}

[popover]:popover-open {
  padding-inline: 16px;
  padding-block: 8px;
  transition: block-size 0.5s ease-in-out;
  @starting-style {
    block-size: 0;
  }
}
</style>