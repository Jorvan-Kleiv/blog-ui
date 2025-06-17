<template>
  <RouterLink
      v-for="article in articles"
      :key="article?.id"
      :to="`/article/${article?.id}`"
      class="flex flex-col cursor-pointer not-last:border-b border-b-slate-200 pb-1.5 h-fit w-fit"
  >
    <div class="grid grid-cols-6 h-fit gap-[20px]">
      <div class="gap-0.5 flex flex-col" :class="article.image ? 'col-span-4':'col-span-6'">
        <h4 class="font-semibold text-slate-600 line-clamp-2 leading-5 text-base">
          {{ article?.title }}
        </h4>
        <p class="line-clamp-4 text-slate-600 text-sm font-regular">
          {{ article?.content }}
        </p>
      </div>
      <div class="col-span-2 flex justify-end" v-if="article.image != null">
        <div class="w-32 h-32 rounded-sm bg-slate-300">
          <img :src="article.image.path" alt="" class="w-32 h-32 rounded-sm">
        </div>
      </div>
    </div>
    <div class="flex items-end w-full py-0.5 mt-2 justify-between gap-2">
      <UserAvatar :user="article?.owner" />
      <span class="text-xs text-slate-500">{{ article?.created_at }}</span>
    </div>
  </RouterLink>
</template>
<script setup lang="ts">
import type {Article} from "../../type/types.ts";
import UserAvatar from "./UserAvatar.vue";
defineProps<{ articles?: Article[] }>();
</script>

<style scoped>

</style>
