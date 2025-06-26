<script setup lang="ts">

</script>

<template>
  <section id="home" class="hero-section mb-4">
    <div class="z-10 relative flex flex-col items-center justify-center text-center px-4">
      <div class="py-0.5 text-sm px-2.5 min-w-24 text-start rounded-full font-medium z-[1000] gap-x-1 text-violet-700 bg-violet-300 starting:animate-bounce flex items-center drop-shadow-violet-300">
        <div class="h-1.5 w-1.5 bg-violet-700  rounded-full"></div>
        just breath
      </div>
      <h1 class="text-5xl starting:translate-y-20 starting:opacity-0 transition-all duration-200 ease-in-out font-general md:text-6xl lg:text-7xl text-white font-extrabold relative w-fit h-fit text-wrap" hero-text>
        Think. Write. Inspire.
      </h1>
      <p class="text-lg w-xl starting:translate-y-20 starting:opacity-0 transition-all duration-500 ease-in-out font-normal leading-6 my-4 text-white font-general">
        This is a curated space for reflective thought and refined expression — where each piece is written with intent, aiming to illuminate ideas, elevate dialogue, and inspire with quiet purpose.
      </p>
      <RouterLink to="/sign-in" class="py-2 px-4 starting:translate-y-20 starting:opacity-0 transition-all duration-1000 ease-in-out flex items-center bg-white gap-x-2 text-gray-700 rounded-sm"><span>Get started</span> <ArrowRight class="text-gray-700 w-4 h-4" /></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  background-color: #fff; /* white */
  min-height: 80vh;
  padding-inline: 80px;
  z-index: 1000;
  display: flex;
  isolation: isolate;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0, 0, 0, 0.1), rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.40));
}
.hero-section::after {
  content: "";
  position: absolute;
  background: #7f22fe;
  inset: 0;
  clip-path: polygon(100% 0, 0 0, 0 95%, 100% 60%);
}
[hero-text]{
  z-index: 10;
  mix-blend-mode: color-burn;
}

</style>