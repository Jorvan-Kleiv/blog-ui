<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "./components/layout/AuthLayout.vue";
import GuestLayout from "./components/layout/GuestLayout.vue";

const route = useRoute();

const layoutComponent = computed(() => {
  return route.meta.layout === "auth" ? AuthLayout : GuestLayout;
});
</script>
