<template>
  <div class="flex items-center gap-1">
    <div class="w-8 aspect-square text-sm font-bold justify-center flex items-center rounded-full text-white"
         :style="{backgroundColor: getRandomColor(user?.username)}"
    >
      {{ getUserInitials(user) }}
    </div>
    <div class="flex flex-col">
      <span class="text-sm text-slate-600">
        {{ user?.username }}
      </span>
      <span class="text-xs text-slate-500">
        {{ user?.email }}
      </span>
    </div>
  </div>

</template>
<script setup lang="ts">
import type { User } from '../../type/types.ts'
import {getRandomColor, getUserInitials} from "../../utils/UserInitials.ts";
defineProps<{
  user: User | undefined | any;
}>()
</script>

<style scoped>

</style>