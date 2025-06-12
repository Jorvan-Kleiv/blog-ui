
<template>
  <button :type="type" class="py-1 rounded-sm cursor-pointer text-white active:ring-2 ring-violet-300 bg-violet-500 font-medium">{{ label }}</button>
</template>
<script setup lang="ts">
defineProps<{
  type?: string | any,
  label?: string,
}>();
</script>

<style scoped>

</style>