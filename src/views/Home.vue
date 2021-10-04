<template>
   <div class="home h-full w-full">
      <div class="w-full h-full grid grid-cols-3 grid-rows-3 overflow-hidden">
         <div class="welcome col-span-3 flex flex-col items-center justify-center">
            <h1 class="mb-4 text-4xl font-bold">WELCOME.</h1>
            <h2 class="text-center leading-5">
               My name is <span class="font-bold text-yellow-300">arya mahendra</span>,<br />i'm
               here to guide you on this awful journey. btw i'am a full stack developer and this is
               my portofolio.
            </h2>
         </div>
         <div class="frontend row-span-2 flex justify-center">
            <div class="frontend-wrapper">
               <h1 class="mb-4 main-title">Fronend<br />Developer.</h1>
               <p class="text-gray-200">
                  an amature fronend developer who always interested to explore great ui/ux.
               </p>
            </div>
         </div>
         <div></div>
         <div class="backend row-span-2 flex justify-center">
            <div class="backend-wrapper">
               <h1 class="mb-4 main-title">Backend<br />Developer.</h1>
               <p class="text-gray-200">
                  always exploring new technology and best practices to build a secure and relaiable
                  system.
               </p>
            </div>
         </div>
         <div class="start-btn flex justify-center items-center">
            <a href="#" @click.prevent="startJourney" class="btn">let's start our journey</a>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import gsap from "gsap";

export default defineComponent({
   setup(props, { emit }) {
      onMounted(() => {
         gsap.from(".welcome", { duration: 1.75, y: -100, opacity: 0, ease: "power2.out" });
         gsap.from(".frontend", { duration: 1.75, x: -100, opacity: 0, ease: "power2.out" });
         gsap.from(".backend", { duration: 1.75, x: 100, opacity: 0, ease: "power2.out" });
         gsap.from(".start-btn", { duration: 1.75, y: 100, opacity: 0, ease: "power2.out" });

         document.querySelectorAll(".home a").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover1");
               document.querySelector(".custom-cursor2")?.classList.add("hover1");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover1");
               document.querySelector(".custom-cursor2")?.classList.remove("hover1");
            });
         });
      });

      const startJourney = () => {
         emit("onRouteChnage", { from: "Home", to: "About" });
         gsap.to(".welcome", { duration: 1.75, y: -100, opacity: 0, ease: "power2.out" });
         gsap.to(".frontend", { duration: 1.75, x: -100, opacity: 0, ease: "power2.out" });
         gsap.to(".backend", { duration: 1.75, x: 100, opacity: 0, ease: "power2.out" });
         gsap.to(".start-btn", {
            duration: 1.75,
            y: 100,
            opacity: 0,
            ease: "power2.out",
         });
      };

      return {
         startJourney,
      };
   },
});
</script>

<style scoped>
.home .frontend-wrapper p,
.home .backend-wrapper p {
   max-width: 25ch;
}

.home .welcome h2 {
   max-width: 45ch;
}
</style>
