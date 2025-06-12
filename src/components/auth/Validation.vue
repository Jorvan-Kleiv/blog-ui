<template>
  <div class="flex justify-center py-8 min-h-screen bg-slate-50">
    <div class="w-80 h-fit px-8 py-6 rounded-md bg-white shadow-xs">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-2xl mb-4 font-bold text-slate-700 text-center">Validation</h3>
        <div class="grid grid-cols-6 gap-3">
          <input v-for="(n, i) in 6"
                 :key="i"
                 type="text"
                 maxlength="1"
                 class="outline outline-slate-200 py-1.5 text-center text-lg rounded"
                 @input="focusNext($event, i)"
                 autocomplete="off"
                 v-model="code[i]"
          />
        </div>
        <div class="flex flex-col w-full gap-1 py-3">
          <Button type="submit" label="Validate"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../common/Button.vue";
import {reactive} from "vue";
import {useAuthStore} from "../../stores/useAuthStore.ts";
const validatePayload = reactive<any>({
  code: '',
})
const authStore = useAuthStore();
function handleSubmit() {
  console.log('Form submitted :', code.join(''));
  validatePayload.code = code.join('');
  authStore.validate(validatePayload);
}
const code = reactive<string[]>(Array(6).fill(''))

function focusNext(event: Event, index: number) {
  const input = event.target as HTMLInputElement
  if (input.value.length === input.maxLength) {
    const nextInput = input.parentElement?.children[index + 1] as HTMLInputElement | undefined
    if (nextInput) nextInput.focus()
  }
}
</script>

<style scoped>
input:focus {
  outline-color: #7c3aed; /* Tailwind's purple-500 */
  outline-width: 2px;
}
</style>
