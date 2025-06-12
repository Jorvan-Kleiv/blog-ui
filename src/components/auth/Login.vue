
<template>
  <div class="flex justify-center bg-slate-50 py-8 min-h-screen">
    <div class="w-md h-fit px-8 py-6 shadow-xs rounded-md bg-white">
      <form @submit.prevent="handle()">
        <h3 class="text-2xl mb-1.5 mt-1.5 font-bold text-slate-700 text-center">Welcome Back 🖐️</h3>
        <p class="text-xs mb-5 text-slate-400">We're pleased to have you with us again. Let's continue where you left off and move forward together.</p>
        <div class="flex flex-col w-full gap-2">
          <Input label="Email address" v-model="loginPayload.email" type="email" placeholder="Gregor.samsa@gmail.com" id="email" />
          <Input label="Password" type="password" v-model="loginPayload.password" placeholder="password" id="password" />
          <div class="flex flex-col w-full gap-1 h-fit py-3">
            <Button type="submit" label="Login"/>
            <div class="flex items-center gap-1 py-1.5 w-full">
              <small class="text-sm text-slate-500">No account yet?</small> <RouterLink class="text-blue-600 text-sm" to="/register">register</RouterLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">

import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import {reactive} from "vue";
import {useAuthStore} from "../../stores/useAuthStore.ts";
import type {User} from "../../type/types.ts";
const loginPayload = reactive<User | any>({
  email: '',
  password: '',
})
const authStore = useAuthStore()
async function handle() {
  console.log(loginPayload);
  authStore.login(loginPayload);
}
</script>

<style scoped>

</style>