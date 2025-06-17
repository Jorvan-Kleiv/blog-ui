<template >
  <Header />
  <main class="font-display md:mx-[100px] lg:mx-[100px] max-md:mx-4 max-w-full  min-h-screen grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-5" v-if="$route.path != '/login' && $route.path != '/register' && $route.path != '/validation'">
    <SideBar />
      <slot />
  </main>
  <main class="font-display md:mx-[100px] lg:mx-[100px] max-md:mx-4" v-if="$route.path == '/login' || $route.path == '/register' || $route.path == '/validation'">
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