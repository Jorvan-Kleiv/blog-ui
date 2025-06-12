<template>
  <div class="flex flex-col w-full gap-0.5 h-fit">
    <label :for="id" class="text-sm text-slate-600 font-medium">{{ label }}:</label>
    <input
        :type="type"
        :value="modelValue"
        :id="id"
        :placeholder="placeholder"
        @input="$event => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="outline placeholder:text-sm bg-slate-50 focus:ring-2 focus:ring-violet-500 focus:caret-violet-500 px-2 py-1 outline-slate-200 rounded-sm"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string
  modelValue?: string
  type?: string
  id?: string
  label?: string
}>()
const emit = defineEmits(['update:modelValue'], )

</script>
