<template>
  <Header />
  <main class="font-display mx-[100px]  min-h-screen grid grid-cols-12 gap-5" v-if="$route.path != '/login' && $route.path != '/register' && $route.path != '/validation'">
    <SideBar />
      <slot />
  </main>
  <main class="font-display mx-[100px]" v-if="$route.path == '/login' || $route.path == '/register' || $route.path == '/validation'">
    <slot />
  </main>
  <Footer />
</template>
<script setup lang="ts">
  import Header from "./layout-set/Header.vue";
  import SideBar from "./layout-set/SideBar.vue";
  import Footer from "./layout-set/Footer.vue";

</script>

<style scoped>

</style>