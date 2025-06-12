<template>
  <div search class="outline flex outline-slate-200 focus-within:outline-violet-500 py-1 rounded-full bg-slate-50 gap-1 px-2 items-center w-fit h-fit">
    <Search width="20" height="20" class="text-purple-500" search-icon color="#cbd5e1"/>
    <input type="search" placeholder="Search here..." class="outline-none focus:caret-purple-500 placeholder:text-slate-400 border-none flex-grow" />
  </div>
</template>
<script setup lang="ts">

import {Search} from "lucide-vue-next";
</script>
<style scoped>
[search] {
  &:focus-within {
    & [search-icon] {
      stroke: oklch(62.7% 0.265 303.9);
    }
  }
}

</style>