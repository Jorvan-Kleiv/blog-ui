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
  <section id="latest" class="px-20 font-general h-fit w-full items-center flex flex-col gap-10 py-4">
    <div class="flex flex-col items-center gap-1.5">
      <h2 class="text-5xl font-bold text-gray-700">Recents <span class="text-violet-600">articles</span></h2>
      <p class="text-base text-gray-500">
        Interest by a little overview of recents articles on our platform? check it out...
      </p>
    </div>
    <div class="grid grid-cols-3 gap-4 w-full h-fit">
      <div class="h-96 bg-white shadow shadow-gray-300/50 rounded-sm flex flex-col" v-for="(i, index) in 6" :key="index">
        <div class="h-3/5 relative aspect-square image rounded-t-sm">
          <img src="../../assets/placeholder.svg" :alt="'img '+ i" class="w-full rounded-t-sm h-full">
        </div>
        <div class="relative justify-between h-full px-5 py-4 flex flex-col">
          <div class="flex flex-col w-full h-fit">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-600">New css 3 features</h4>
              <small class="text-gray-400 text-xs flex items-center gap-x-1">
                <CalendarDays class="w-4 h-4"/>
                22 May 2025
              </small>
            </div>
            <p class="text-sm text-gray-500 my-1 line-clamp-3 leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorem ex labore non, repellat temporibus tenetur velit! Debitis delectus ipsum itaque velit!
            </p>
          </div>
          <div class="flex items-center w-full justify-between">
            <div class="flex items-center gap-x-1 self-start">
              <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
              <p class="text-sm text-gray-400">Gregor samsa</p>
            </div>
            <div class="flex items-center gap-x-1">
              <Heart class="w-4 h-4 text-gray-400"/>
              11
            </div>
          </div>
        </div>
      </div>
    </div>
    <RouterLink to="/sign-in" class="py-2 px-4 self-end flex items-center bg-slate-100 shadow gap-x-2 text-gray-700 rounded-sm"><span>See more content</span> <ArrowRight class="text-gray-700 w-4 h-4" /></RouterLink>
  </section>
  <section id="about" class="px-20 my-8 font-general h-fit bg-slate-50 w-full items-center flex flex-col gap-8 py-4">
    <div class="flex flex-col items-center gap-1.5">
      <h2 class="text-5xl font-bold text-gray-700">About <span class="text-violet-600">us</span></h2>
      <p class="text-base text-gray-500">
        You have some questions in your mind? learn more about Jorvan Blog
      </p>
    </div>
    <div class="flex items-center gap-6 w-full h-fit">
      <div class="w-2/5 aspect-square rounded-2xl bg-gray-200">
        <img src="../../assets/placeholder.svg" alt="opps" class="w-full rounded-2xl h-full">
      </div>
      <div class="w-3/5 aspect-video flex flex-col gap-3 py-2 px-1">
        <h3 class="text-2xl text-gray-700 font-semibold font-general">
          Who are we ?
        </h3>
        <p class="text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aspernatur deserunt dolore facere porro ullam veniam vitae! Ab fugit id ipsam magnam nisi, obcaecati quibusdam quisquam rerum. Adipisci facilis quasi quo sunt temporibus voluptatem! Architecto aut beatae eaque, est expedita facere in laboriosam libero, maxime minima minus nobis, obcaecati pariatur repellendus rerum! Amet assumenda distinctio, dolorum ea eligendi esse eum id illo illum iste laboriosam magni.
        </p>
        <h3 class="text-2xl text-gray-700 font-semibold font-general">
          Another services
        </h3>
        <p class="text-lg text-gray-600">
          We also have another services  to help people to automatize their tasks. if you are interested? click the link below...
        </p>
        <button class="px-5 py-2 outline self-end font-semibold text-gray-600 mt-2 outline-gray-200 bg-white rounded-sm">
          Learn more...
        </button>
      </div>
    </div>
    </section>
</template>
<script setup>
import { ArrowRight } from "lucide-vue-next";
import {CalendarDays, Heart} from "lucide-vue-next";

</script>
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
