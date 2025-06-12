
<template>
  <div class="flex justify-center bg-slate-50 py-8 min-h-screen">
    <div class="min-w-md shadow-xs bg-white h-fit px-8 py-6 rounded-md ">
      <form @submit.prevent="handle()">
        <h3 class="text-2xl my-3 font-bold text-slate-700 text-center">Welcome</h3>
        <div class="flex flex-col w-full gap-2">
          <Input label="First name"  v-model="registerPayload.first_name" type="text" placeholder="Gregor" id="first_name" />
          <Input label="Last name" v-model="registerPayload.last_name" type="text" placeholder="Samsa" id="last_name" />
          <Input label="Email address" v-model="registerPayload.email" type="email" placeholder="Gregor.samsa@gmail.com" id="email" />
          <Input label="Password" v-model="registerPayload.password" type="password" placeholder="password" id="password" />
          <div class="flex flex-col w-full gap-0.5 h-fit py-3">
            <Button type="submit" label="Register"/>
            <div class="flex items-center gap-1 py-1.5 w-full">
              <small class="text-sm text-slate-500">Already signed up?</small> <RouterLink class="text-blue-600 text-sm" to="/login">login</RouterLink>
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
const registerPayload = reactive<User | any>({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})
const authStore = useAuthStore()
async function handle() {
  console.log(registerPayload);
  authStore.register(registerPayload);
}

</script>

<style scoped>

</style>