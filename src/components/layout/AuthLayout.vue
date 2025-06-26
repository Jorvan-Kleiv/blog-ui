<template >
  <Header />
    <main class="font-display md:mx-[100px] lg:mx-[100px] max-md:mx-4 max-w-full  min-h-screen grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-5" v-if="$route.path != '/login' && $route.path != '/register' && $route.path != '/validation'">
      <SideBar />
      <slot />
    </main>
  <Footer />
</template>
<script setup lang="ts">
import Header from "../common/Header.vue";
import SideBar from "../common/SideBar.vue";
import Footer from "../common/Footer.vue"

</script>

<style scoped>

</style>