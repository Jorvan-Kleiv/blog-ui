<template>
  <!-- Input standard -->
  <div class="space-y-1" v-if="['text', 'email', 'password', 'number'].includes(type)">
    <label :for="label" class="block text-sm font-medium text-gray-700">
      {{ label + " :" }}
    </label>
    <input
        :id="label"
        :type="type"
        class="w-full px-4 py-1.5 outline outline-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-transparent transition-all duration-200 placeholder-slate-400"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <!-- Textarea -->
  <div class="space-y-1" v-else-if="type === 'area'">
    <label :for="label" class="block text-sm font-medium text-slate-700">
      {{ label + " :" }}
    </label>
    <textarea
        class="w-full px-4 py-1.5 outline outline-slate-300 rounded-lg focus:ring-2 resize-y focus:ring-violet-500 focus:outline-transparent transition-all duration-200 placeholder-slate-400"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    ></textarea>
  </div>

  <!-- Taggeable -->
  <div class="space-y-1" v-else-if="type === 'taggeable'">
    <label class="block text-sm font-medium text-slate-700">
      {{ label + " :" }}
    </label>
    <div class="flex flex-wrap gap-2">
      <span
          v-for="(tag, index) in tags"
          :key="index"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-violet-800"
      >
        {{ tag }}
        <button
            type="button"
            @click="removeTag(index)"
            class="ml-2 text-violet-600 hover:text-violet-800 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </span>
    </div>
    <div class="flex gap-2">
      <input
          v-model="newTag"
          type="text"
          @keyup.enter="addTag"
          class="flex-1 px-4 py-1.5 outline outline-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
          :placeholder="placeholder"
      />
      <button
          type="button"
          @click="addTag"
          class="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 flex items-center"
      >
        <Plus class="w-5 h-5" />
      </button>
    </div>
  </div>

  <!-- File -->
  <div class="space-y-1 resize-y" v-else-if="type === 'file'">
    <label class="block text-sm font-medium text-slate-700">Image</label>
    <div
        class="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors duration-200"
    >
      <div v-if="!imagePreview" class="space-y-1">
        <Upload class="w-12 h-12 text-slate-400 mx-auto" />
        <div class="text-slate-600">
          <label for="image" class="cursor-pointer text-purple-600 hover:text-purple-500 font-medium">
            Click here to upload
          </label>
          or drop here...
        </div>
        <p class="text-xs text-slate-500">PNG, JPG, GIF jusqu'à 10MB</p>
      </div>
      <div v-else class="relative">
        <img :src="imagePreview" alt="Preview" class="max-h-48 mx-auto rounded-lg" />
        <button
            type="button"
            @click="removeImage"
            class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
      <input
          id="image"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="hidden"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { X, Plus, Upload } from 'lucide-vue-next';
import type {Tag} from "../../type/types.ts";

const props = defineProps<{
  type: string;
  modelValue?: any;
  label?: string;
  placeholder?: string;
}>();
const emit = defineEmits(['update:modelValue']);

// Image
const imagePreview = ref<string | null>(null);
const handleImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.item(0);
  if (file) {
    emit('update:modelValue', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};
const removeImage = () => {
  emit('update:modelValue', null);
  imagePreview.value = null;
  const input = document.getElementById('image') as HTMLInputElement;
  if (input) input.value = '';
};

const newTag = ref('');
const tags = ref<string[]>([]);

watch(
    () => props.modelValue,
    (val) => {
      if (props.type === 'taggeable') {
        if (typeof val === 'string') {
          tags.value = val.split(',').map(t => t.trim()).filter(Boolean);
        } else if (Array.isArray(val)) {
          tags.value = val.map((v: Tag) => v.name);
        }
      }
    },
    { immediate: true }
);
console.log(tags.value)

const addTag = () => {
  const tag = newTag.value.trim();
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag);
    emit('update:modelValue', tags.value.toString());
  }
  newTag.value = '';
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
  emit('update:modelValue', tags.value.toString());
};
</script>
