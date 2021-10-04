<template>
   <div class="about">
      <h1 class="main-title title">We have arrived in the section about.</h1>
      <p class="continue-text">
         If you don't want to know me. You can
         <span class="font-medium text-yellow-300">scroll down</span> to continue the journey.
      </p>
      <div class="about-content w-full text-gray-200">
         <div class="about-me py-5 px-6 w-full flex">
            <div class="title-wrapper">
               <h2 class="title">About</h2>
            </div>
            <div class="content-wrapper flex-1">
               <p class="font-light">
                  My name is <span class="font-semibold">Arya Mahendra</span> a 23 years old average
                  computer science student in <span class="font-semibold">Indonesia</span>. Since I
                  was a child I've always been attracted to computer to play games of course :) .
               </p>
            </div>
         </div>
         <div class="spacer relative h-20 w-full"></div>
         <div class="work-experience py-5 px-6 w-full flex">
            <div class="title-wrapper">
               <h2 class="title">Work experience</h2>
            </div>
            <div class="content-wrapper flex-1">
               <p class="font-light">
                  DON'T HAVE ANY!. I have not graduated yet so if you looking for slave to do
                  programing i'm your guy.
               </p>
            </div>
         </div>
         <div class="spacer relative h-16 w-full"></div>
         <div class="part-time py-5 px-6 w-full flex">
            <div class="title-wrapper">
               <h2 class="title">Part time</h2>
            </div>
            <div class="content-wrapper flex-1">
               <p class="font-light">
                  In my spare time. I like to do things like normal people do to waste their time.
                  Like play games, wathing youtube, netflix etc. But i'm still
                  <span class="font-semibold">exploring programing world</span> if i've got nothing
                  to play or watch.
               </p>
            </div>
         </div>
         <div class="button-wrapper pt-10 pb-4 flex gap-3">
            <a href="#" @click.prevent="backToHome" class="btn-prev btn w-full text-center">Back</a>
            <a href="#" @click.prevent="goToProject" class="btn-next btn w-full text-center"
               >Next destination</a
            >
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
         gsap.from(".about", { duration: 1.5, backgroundColor: 0, x: -100 });
         gsap.from(".about > .title", { duration: 2, x: -200 });
         gsap.from(".about .continue-text", { duration: 1.8, x: -180 });
         gsap.from(".about .about-me", { duration: 1.5, x: -160 });
         gsap.from(".about .work-experience", { duration: 1.3, x: -130 });
         gsap.from(".about .part-time", { duration: 1, x: -100 });
         gsap.from(".about .button-wrapper", { duration: 0.75, x: -80 });

         const btnPrev = document.querySelector(".about .btn-prev");
         btnPrev?.addEventListener("mouseover", () => {
            document.querySelector(".custom-cursor1")?.classList.add("hover");
            document.querySelector(".custom-cursor2")?.classList.add("hover");
         });
         btnPrev?.addEventListener("mouseleave", () => {
            document.querySelector(".custom-cursor1")?.classList.remove("hover");
            document.querySelector(".custom-cursor2")?.classList.remove("hover");
         });
         const btnNext = document.querySelector(".about .btn-next");
         btnNext?.addEventListener("mouseover", () => {
            document.querySelector(".custom-cursor1")?.classList.add("hover1");
            document.querySelector(".custom-cursor2")?.classList.add("hover1");
         });
         btnNext?.addEventListener("mouseleave", () => {
            document.querySelector(".custom-cursor1")?.classList.remove("hover1");
            document.querySelector(".custom-cursor2")?.classList.remove("hover1");
         });
      });

      const animateExitAboout = () => {
         gsap.to(".about", { duration: 1.8, opacity: 0, x: -100 });
         gsap.to(".about > .title", { duration: 2, x: -200 });
         gsap.to(".about .continue-text", { duration: 1.8, x: -180 });
         gsap.to(".about .about-me", { duration: 1.5, x: -160 });
         gsap.to(".about .work-experience", { duration: 1.3, x: -130 });
         gsap.to(".about .part-time", { duration: 1, x: -100 });
         gsap.to(".about .button-wrapper", { duration: 0.75, x: -80 });
      };

      const backToHome = () => {
         emit("onRouteChnage", { from: "About", to: "Home" });
         animateExitAboout();
      };
      const goToProject = () => {
         emit("onRouteChnage", { from: "About", to: "Projects" });
         animateExitAboout();
      };
      return {
         backToHome,
         goToProject,
      };
   },
});
</script>

<style scoped>
/* width */
.about::-webkit-scrollbar {
   width: 4px;
}

/* Track */
.about::-webkit-scrollbar-track {
   background-color: transparent;
}
/* Handle */
.about::-webkit-scrollbar-thumb {
   border-radius: 99999px;
   background: rgba(136, 136, 136, 0.45);
}
.about {
   background-color: rgba(32, 32, 32, 0.45);
   @apply w-1/2 h-full py-6 px-10 rounded-md overflow-y-auto;
}

.about h1.title {
   max-width: 23ch;
   @apply mb-8;
}

.about .continue-text {
   @apply text-sm text-gray-300 font-light tracking-wide mb-6;
}

.about .about-content .title-wrapper {
   @apply w-40;
}
.about .about-content h2.title {
   @apply text-lg font-bold leading-5;
   max-width: 10ch;
}

.about .spacer::after {
   content: "";
   width: 100%;
   height: 0.1px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: #2b2b2b;
}

.about .button-wrapper .btn-prev {
   @apply border border-transparent bg-transparent text-gray-100 transition delay-300 ease-in-out;
}
.about .button-wrapper .btn-prev:hover,
.about .button-wrapper .btn-prev:active {
   @apply border-red-700 border text-red-700;
}
</style>
