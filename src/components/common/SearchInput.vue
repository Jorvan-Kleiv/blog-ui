<template>
  <div search class="md:outline  lg:outline flex outline-slate-200 focus-within:outline-violet-500 py-1 rounded-full bg-slate-50 gap-1 px-1 items-center lg:w-fit md:w-fit h-fit">
    <Search width="20" height="20" class="text-slate-500" search-icon />
    <input type="search" placeholder="Search here..." class="outline-none max-md:w-0 focus:caret-purple-500 placeholder:text-slate-400 border-none flex-grow" />
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
