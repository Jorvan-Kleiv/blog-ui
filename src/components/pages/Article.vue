<template>
  <div class="col-span-7 py-[24px]">
    <div class="flex gap-4 flex-col h-full w-full">
      <Transition
          enter-from-class="opacity-0 transition-all duration-300 ease-in"
          enter-to-class="opacity-100 transition-all duration-300 ease-in"
          leave-from-class="opacity-100 transition-all duration-300 ease-in"
          leave-to-class="opacity-0 transition-all duration-300 ease-in"
      >
        <Drawer
            :is-open="modal.isOpen"
            :header="`Update article «${article?.title || 'Untitled'}»`"
            position="right"
            @close="modal.toggleDrawer"
        >
          <form @submit.prevent="handleEdit()" enctype="multipart/form-data">
            <div class="flex flex-col w-full gap-2.5 py-6">
              <Input label="Title" type="text" v-model="updateRequest.title" placeholder="Article title"/>
              <Input type="area" v-model="updateRequest.content" label="Content"
                     placeholder="Article content"/>
              <Input
                  label="Tags (Beauty, makeup, Dance)"
                  v-model="updateRequest.tags"
                  type="taggeable"
                  placeholder="Beauty, makeup, Dance, pictures"/>
              <Input type="file" v-model="updateRequest.image" />
              <div class="flex justify-end w-full">
                <Button label="Update" type="submit" />
              </div>
            </div>
          </form>
        </Drawer>
      </Transition>
      <div class="py-4 flex rounded-sm flex-col w-full h-fit">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-4xl font-semibold text-slate-700">
            {{article?.title}}
          </h3>
          <button @click="modal.toggleDrawer()" class="bg-violet-500 hover:bg-violet-600 transition-all duration-200 cursor-pointer items-center text-white flex gap-1 rounded-sm font-semibold px-3 py-2 text-sm h-fit">
            <Pencil width="16" height="16" />
            Edit
          </button>
        </div>
        <p class="text-base mb-2 font-medium text-slate-700">
          {{article?.content}}
        </p>
        <div class="w-full bg-green-100 h-fit rounded-sm" v-if="article?.image">
          <img :src="article.image.path" :alt="article.image.name || 'Article image'" class="w-full h-full rounded-sm aspect-auto">
        </div>
        <div class="flex  items-center gap-2.5 py-2 w-fit text-slate-600">
          <div class="flex items-center gap-0.5">
            <Heart width="20" />
            12k
          </div>
          <div class="flex items-center gap-0.5">
          <MessageCircle width="20"  />
            55
          </div>
        </div>
        <CommentSection />
      </div>
    </div>
  </div>
  <div class="col-span-3 py-6">
    <div class="grid grid-cols-4">
      <div class="col-span-4 gap-1 rounded-sm bg-slate-900/70 flex flex-col h-fit p-2">
        <h5 class="text-sm text-white leading-5 font-semibold">
          Follow us on social media to stay updated and learn more!
        </h5>
        <p class="text-xs text-white font-regular">Stay connected with us on social media to discover exclusive tips, behind-the-scenes content, and the latest updates from our blog. </p>
      </div>
    </div>
    <div class="flex flex-col my-6 gap-3">
      <h3 class="text-base font-semibold mb-2 leading-4 text-slate-600">Author: </h3>
      <div class="flex flex-col gap-4">
        <div class="flex justify-start items-center">
          <UserAvatar :user="article.owner" v-if="article?.owner"/>
        </div>
      </div>
    </div>
    <div class="flex flex-col my-6 gap-3" v-if="article?.tags && article.tags.length > 0">
      <h3 class="text-base font-semibold mb-2 leading-4 text-slate-600">Featured Tags</h3>
      <div class="flex flex-wrap gap-1.5">
        <button
          class="flex py-1.5 bg-slate-50 hover:bg-slate-100 transition-all duration-200 px-3 text-xs text-slate-600 rounded-2xl h-fit border border-slate-200 items-center"
          v-for="tag in article.tags"
          :key="tag.id || tag.name"
        >
          <Hash width="12" height="12" color="#45556c" />
          {{tag.name}}
        </button>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">

import UserAvatar from "../common/UserAvatar.vue";
import {Hash, Heart, MessageCircle, Pencil} from "lucide-vue-next";
import Drawer from "../common/Drawer.vue";
import {modalStore} from "../../stores/useModalStore.ts";
import {onMounted, computed, reactive, watch} from "vue";
import {useArticleStore} from "../../stores/useArticleStore.ts";
import {useRoute} from "vue-router";
import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import CommentSection from "../CommentSection.vue";

let modal = modalStore();
const route = useRoute();
let articleStore = useArticleStore();
let article = computed(() => articleStore.article);
export interface UpdatedForm extends FormData{
  title: string;
  content: string;
  tags: string;
  image: null,
}
const updateRequest = reactive<UpdatedForm | any>({
  title: '',
  content: '',
  tags: '',
  image: null,
});

watch(article, (newArticle) => {
  if (newArticle && typeof newArticle === 'object') {
    updateRequest.title = newArticle.title || '';
    updateRequest.content = newArticle.content || '';
    if (Array.isArray(newArticle.tags)) {
      updateRequest.tags = newArticle.tags.map(tag => tag.name).join(', ');
    } else {
      updateRequest.tags = '';
    }
    updateRequest.image = null;
  }
}, { immediate: true });


onMounted(async () => {
  try {
    if (route.params.id) {
      await articleStore.loadArticleById(route.params.id.toString());
    } else {
      console.error('No article ID provided in route parameters');
    }
  } catch (error) {
    console.error('Failed to load article:', error);
    // You could add user notification here
  }
})
async function handleEdit() {
  const form = new FormData();
  form.append("title", updateRequest.title);
  form.append("content", updateRequest.content); // ✅ fix
  form.append("tags", updateRequest.tags);

  if (updateRequest.image instanceof File) {
    form.append("image", updateRequest.image);
  }

  form.append("_method", "PUT"); // pour simuler une requête PUT via POST

  await articleStore.updateArticle(route.params.id.toString(), form);
}

</script>
<style scoped>

</style>
