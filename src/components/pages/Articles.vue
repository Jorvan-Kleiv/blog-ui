<template>
  <div class="col-span-6 py-6">
    <div class="flex gap-4 flex-col h-full w-full">
          <Drawer
              header="Add new article"
              :is-open="modal.isOpen"
              position="right"
              @close="modal.toggleDrawer()"
          > <div class="min-h-full w-full px-2 overflow-y-auto">
              <form @submit.prevent="handle" enctype="multipart/form-data">
                <div class="flex flex-col w-full gap-1 py-2">
                  <Input label="Title" type="text" v-model="articleForm.title" placeholder="Dummy title" />
                  <Input type="area" v-model="articleForm.content" label="content"
                         placeholder="One morning Gregor Samsa woke up from troubled dreams" />
                  <Input type="taggeable" label="Tags (Beauty, makeup, Dance)" v-model="articleForm.tags"
                         placeholder="Beauty, makeup, Dance, pictures" />
                  <Input predicate="file" v-model="articleForm.image" type="file" />

                  <div class="flex justify-end w-full">
                    <Button label="Store" type="submit" />
                  </div>
                </div>
              </form>
          </div>
          </Drawer>
      <BlogCard :articles="articles" />
    </div>
  </div>

  <div class="col-span-4 py-6">
    <div class="grid grid-cols-4">
      <div class="col-span-3 gap-1 rounded-sm bg-slate-900/70 flex flex-col h-fit p-2">
        <h5 class="text-sm text-white leading-5 font-semibold">
          Follow us on social media to stay updated and learn more!
        </h5>
        <p class="text-xs text-white font-regular">
          Stay connected with us on social media to discover exclusive tips, behind-the-scenes content, and the latest updates from our blog.
        </p>
      </div>
    </div>

    <div class="flex flex-col my-6 gap-3">
      <h3 class="text-base font-semibold mb-2 leading-4 text-slate-600">Trending Authors</h3>
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center" v-for="author in trends" :key="author?.id">
          <UserAvatar :user="author" />
          <button
              class="bg-violet-500 hover:bg-violet-600 transition-all duration-200 cursor-pointer items-center text-white flex gap-1 rounded-sm font-semibold px-3 py-2 text-xs h-fit">
            <Plus width="16" height="16" />
            follow
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col my-6 gap-3">
      <h3 class="text-base font-semibold mb-2 leading-4 text-slate-600">Featured Tags</h3>
      <div class="flex flex-wrap gap-1.5">
        <button
            class="flex py-1.5 bg-slate-50 hover:bg-slate-100 transition-all duration-200 px-3 text-xs text-slate-600 rounded-2xl h-fit border border-slate-200 items-center"
            v-for="tag in uniqueTags" :key="tag">
          <Hash width="12" height="12" color="#45556c" />
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from "../common/UserAvatar.vue";
import { Plus } from "lucide-vue-next";
import { Hash } from "lucide-vue-next";
import Drawer from "../common/Drawer.vue";
import { onMounted, reactive, computed } from "vue";
import { modalStore } from "../../stores/useModalStore.ts";
import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import BlogCard from "../common/BlogCard.vue";
import { useArticleStore } from "../../stores/useArticleStore.ts";
import {useAuthStore} from "../../stores/useAuthStore.ts";
import type {Article} from "../../type/types.ts";

const modal = modalStore();
const articleStore = useArticleStore();
const userStore = useAuthStore()
const trends = computed(() => userStore.trendingAuthors);
const articles = computed(() => articleStore.articles);

const uniqueTags = computed(() => {
  if (!articles.value) return [];
  const allTags: string[] = [];
  articles.value.forEach((article: Article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach(tag => {
        allTags.push(tag.name);
      })
    }
  });
  return [...new Set(allTags)];
});

onMounted(() => {
  articleStore.loadArticles();
  userStore.loadTrendingAuthors();
});
export interface CreateForm extends FormData{
  title: string;
  content: string;
  tags: string;
  image: null,
}
const articleForm = reactive<CreateForm | any >({
  title: '',
  content: '',
  tags: '',
  image: null,
});

const handle = () => {
  const form = new FormData()
  form.append("title", articleForm.title)
  form.append("content", articleForm.content)
  form.append("tags", articleForm.tags)
  form.append("image", articleForm.image)
  articleStore.storeArticle(form);
  console.log(articleForm)
  modal.toggleDrawer();
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
