<template>
  <nav v-if="$route.path != '/sign-in' && $route.path != '/sign-up'" class="flex font-general z-10  justify-between px-20 py-3 w-full bg-violet-600 items-center">
    <RouterLink to="/" class="flex items-center gap-x-1 w-fit">
      <div class="w-8 h-8 flex justify-center font-extrabold text-white rounded-lg items-center bg-violet-500">
        B
      </div>
      <p class="font-medium text-base text-white">Jorvan blog</p>
    </RouterLink>
    <div class="flex gap-x-5 text-white font-medium items-center text-base">
      <a href="#home" class="cursor-pointer hover:underline transition-all duration-200">Home</a>
      <a href="#latest" class="cursor-pointer hover:underline transition-all duration-200">Latest articles</a>
      <a href="#about" class="cursor-pointer hover:underline transition-all duration-200">About us</a>
      <a href="#contacts" class="cursor-pointer hover:underline transition-all duration-200">Contacts</a>
    </div>
    <div class="flex items-center gap-x-1.5 h-fit w-fit">
      <RouterLink to="/sign-in" class="px-4 py-1.5 rounded-sm font-medium text-white text-base">Sign in</RouterLink>
      <RouterLink to="/sign-up" class="px-4 py-1.5 bg-white text-gray-700 rounded-sm font-medium text-base">Register</RouterLink>
    </div>
  </nav>
  <div class="min-h-[100vh] my-auto">
    <slot />
  </div>
  <footer v-if="$route.path != '/sign-in' && $route.path != '/sign-up'" class="w-full bg-slate-100 px-6 md:px-24 py-6 font-general text-sm text-gray-600">
    <div class="flex flex-col md:flex-row justify-between gap-8">
      <!-- Brand + Motto -->
      <div class="flex flex-col gap-2 max-w-sm">
        <h2 class="text-xl font-bold text-gray-800">Jorvan Blog</h2>
        <p class="italic">Think deeply. Write boldly. Influence meaningfully.</p>
        <p class="text-gray-500">Explore insights that challenge convention and drive real-world impact.</p>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold text-gray-800">Navigation</h3>
        <a href="#" class="hover:underline">Home</a>
        <a href="#" class="hover:underline">Latest Articles</a>
        <a href="#" class="hover:underline">About Us</a>
        <a href="#" class="hover:underline">Contact</a>
      </nav>

      <!-- Social Media -->
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold text-gray-800">Follow us</h3>
        <a href="#" class="flex items-center gap-2 hover:text-violet-500">
          Instagram
        </a>
        <a href="#" class="flex items-center gap-2 hover:text-violet-500">
          Facebook
        </a>
        <a href="#" class="flex items-center gap-2 hover:text-violet-500">
          X
        </a>
      </div>
    </div>

    <!-- Bottom line -->
    <div class="mt-6 pt-4 border-t border-slate-300 text-xs text-slate-400 text-center">
      © {{ new Date().getFullYear() }} Jorvan Blog. All rights reserved.
    </div>
  </footer>


</template>
<script setup lang="ts">

</script>
<style scoped>

</style>