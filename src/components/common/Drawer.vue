<template>
  <div class="fixed top-0 right-0 flex z-[100] justify-end left-0 bottom-0 bg-violet-500/40"  @click.self="modal.toggleDrawer()">
      <div class="h-full max-md:w-4/5 lg:w-2/5 md:w-2/5 bg-white">
        <slot />
      </div>
  </div>
</template>
<script setup lang="ts">
import {modalStore} from "../../store/useModalStore.ts";
let modal = modalStore();

</script>


<style scoped>




</style>