<template>
   <div class="projects">
      <div class="flex justify-between items-center overflow-hidden">
         <div class="page-navigation-wrapper-left">
            <a href="#" @click.prevent="backToAbout" class="page-navigation left"
               >↽ back to about section</a
            >
         </div>
         <div class="page-navigation-wrapper-right">
            <a href="#" @click.prevent="toConnect" class="page-navigation right"
               >to the next destination ⇁</a
            >
         </div>
      </div>
      <div class="projects-content row-span-2">
         <div class="projects-text">
            <h1 class="main-title mb-5">Safely landed on<br />Projects section.</h1>
            <p class="text-gray-200">
               how the journey so far?. feeling tired yet?. we almost arrived to the end of this
               journey. but first i would like to tell you about my previous exploration that i've
               done by myself or with some friends. if you intersted please select the story you
               want to know.
            </p>
         </div>
         <div class="flex-1 px-8 relative projects-wrapper">
            <a href="" @click.prevent="selectStory" class="select-story">Select stroy.</a>
            <div class="projects-card-wrapper">
               <!-- naviagion -->
               <a
                  href="#"
                  @click.prevent="navigateLeft"
                  class="project-navigation left"
                  :class="{ hide: currentProject <= 1 }"
               >
                  <svg
                     aria-hidden="true"
                     focusable="false"
                     data-prefix="fas"
                     data-icon="chevron-right"
                     class="
                        svg-inline--fa
                        fa-chevron-right fa-w-10
                        h-5
                        w-5
                        fill-current
                        text-gray-900
                        transform
                        rotate-180
                     "
                     role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 320 512"
                  >
                     <path
                        fill="currentColor"
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                     ></path>
                  </svg>
               </a>
               <a
                  href="#"
                  @click.prevent="navigateRight"
                  class="project-navigation right"
                  :class="{ hide: currentProject >= totalProject }"
               >
                  <svg
                     aria-hidden="true"
                     focusable="false"
                     data-prefix="fas"
                     data-icon="chevron-right"
                     class="
                        svg-inline--fa
                        fa-chevron-right fa-w-10
                        h-5
                        w-5
                        fill-current
                        text-gray-900
                     "
                     role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 320 512"
                  >
                     <path
                        fill="currentColor"
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                     ></path>
                  </svg>
               </a>
               <div class="w-full h-full overflow-hidden">
                  <div ref="projectsSlide" class="projects-slide w-full h-full flex">
                     <!-- card -->
                     <div ref="projectCard" class="project-card">
                        <div class="w-full h-full rounded-md overflow-hidden img-wrapper">
                           <img
                              src="/assets/annie-spratt-QckxruozjRg-unsplash-min.jpg"
                              alt=""
                              class="w-full h-full object-cover"
                           />
                        </div>
                        <div class="card-body">
                           <div class="title-wrapper flex items-center justify-center gap-4">
                              <div class="card-body__text">
                                 <h1 class="font-bold text-gray-200">
                                    <a href="#" @click.prevent="" class="project-details"
                                       >Journey with google.com</a
                                    >
                                 </h1>
                                 <h2 class="text-gray-300 text-sm font-light">
                                    Destination:
                                    <a
                                       href="#"
                                       @click.prevent=""
                                       class="project-link font-semibold underline text-indigo-500"
                                       >apalah-coba.com</a
                                    >
                                 </h2>
                              </div>
                              <div class="card-body__number">
                                 <h1 class="text-4xl font-black text-yellow-300">#01</h1>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div ref="projectCard" class="project-card">
                        <div class="w-full h-full rounded-md overflow-hidden img-wrapper">
                           <img
                              src="/assets/annie-spratt-QckxruozjRg-unsplash-min.jpg"
                              alt=""
                              class="w-full h-full object-cover"
                           />
                        </div>
                        <div class="card-body">
                           <div class="title-wrapper flex items-center justify-center gap-4">
                              <div class="card-body__text">
                                 <h1 class="font-bold text-gray-200">
                                    <a href="#" @click.prevent="" class="project-details"
                                       >Journey with google.com</a
                                    >
                                 </h1>
                                 <h2 class="text-gray-300 text-sm font-light">
                                    Destination:
                                    <a
                                       href="#"
                                       @click.prevent=""
                                       class="project-link font-semibold underline text-indigo-500"
                                       >apalah-coba.com</a
                                    >
                                 </h2>
                              </div>
                              <div class="card-body__number">
                                 <h1 class="text-4xl font-black text-yellow-300">#01</h1>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import gsap from "gsap";

export default defineComponent({
   setup(props, { emit }) {
      const projectCard = ref<HTMLDivElement>();
      const projectsSlide = ref<HTMLDivElement>();
      const totalProject = ref(2);
      let currentProject = ref(1);
      let currentX = 0;
      onMounted(() => {
         gsap.from(".projects-text > h1.main-title", {
            duration: 2,
            x: -200,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.from(".projects-text > p", {
            duration: 1.25,
            x: -200,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.from(".select-story", {
            duration: 1.25,
            x: 200,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.from(".page-navigation-wrapper-right", {
            duration: 1.25,
            x: -100,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.from(".page-navigation-wrapper-left", {
            duration: 1.25,
            x: 100,
            opacity: 0,
            ease: "power3.out",
         });
         attachHoverState();
      });
      const navigateLeft = () => {
         if (projectCard.value && projectsSlide.value && currentProject.value > 1) {
            currentProject.value -= 1;
            const width = projectCard.value.getBoundingClientRect().width;
            currentX += width;
            gsap.to(".projects-slide", {
               duration: 0.75,
               x: currentX,
               ease: "circ.inOut",
            });
         }
      };
      const navigateRight = () => {
         if (
            projectCard.value &&
            projectsSlide.value &&
            currentProject.value < totalProject.value
         ) {
            currentProject.value += 1;
            const width = projectCard.value.getBoundingClientRect().width;
            currentX -= width;
            gsap.to(".projects-slide", {
               duration: 0.75,
               x: currentX,
               ease: "circ.inOut",
            });
         }
      };

      const attachHoverState = () => {
         document.querySelectorAll(".project-navigation").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover1");
               document.querySelector(".custom-cursor2")?.classList.add("hover1");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover1");
               document.querySelector(".custom-cursor2")?.classList.remove("hover1");
            });
         });
         document.querySelectorAll(".page-navigation").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover");
               document.querySelector(".custom-cursor2")?.classList.add("hover");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover");
               document.querySelector(".custom-cursor2")?.classList.remove("hover");
            });
         });
         document.querySelectorAll(".project-card a.project-link").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover");
               document.querySelector(".custom-cursor2")?.classList.add("hover");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover");
               document.querySelector(".custom-cursor2")?.classList.remove("hover");
            });
         });
         document.querySelectorAll(".select-story").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover");
               document.querySelector(".custom-cursor2")?.classList.add("hover");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover");
               document.querySelector(".custom-cursor2")?.classList.remove("hover");
            });
         });
         document.querySelectorAll(".project-card a.project-details").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover2");
               document.querySelector(".custom-cursor2")?.classList.add("hover2");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover2");
               document.querySelector(".custom-cursor2")?.classList.remove("hover2");
            });
         });
      };

      const exitProjectsAnimation = () => {
         gsap.to(".projects-card-wrapper", {
            duration: 2,
            transform: "scale(0)",
            ease: "power1.out",
         });
         gsap.to(".projects-text > h1.main-title", {
            duration: 2,
            x: -200,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.to(".projects-text > p", {
            duration: 1.25,
            x: -200,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.to(".select-story", {
            duration: 1.25,
            x: 200,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.to(".page-navigation-wrapper-right", {
            duration: 1.25,
            x: -100,
            opacity: 0,
            ease: "power3.out",
         });
         gsap.to(".page-navigation-wrapper-left", {
            duration: 1.25,
            x: 100,
            opacity: 0,
            ease: "power3.out",
         });
      };

      const backToAbout = () => {
         emit("onRouteChnage", { from: "Projects", to: "About" });
         exitProjectsAnimation();
      };

      const toConnect = () => {
         emit("onRouteChnage", { from: "Projects", to: "Connect" });
         exitProjectsAnimation();
      };

      const selectStory = () => {
         gsap.to(".select-story", {
            duration: 1,
            transform: "scale(0)",
            ease: "power1.out",
         });
         gsap.to(".projects-card-wrapper", {
            duration: 2,
            transform: "scale(1)",
            ease: "power1.out",
         });
      };
      return {
         selectStory,
         projectCard,
         navigateLeft,
         navigateRight,
         projectsSlide,
         totalProject,
         currentProject,
         backToAbout,
         toConnect,
      };
   },
});
</script>

<style scoped>
.projects {
   @apply w-full h-full grid grid-rows-3;
}
.projects .page-navigation {
   @apply px-4 py-2 text-sm italic text-yellow-300;
}
.projects .projects-content {
   @apply flex gap-5;
}
.projects .projects-content .projects-text {
   @apply w-96 flex flex-col justify-center;
}
.projects .projects-wrapper .projects-card-wrapper {
   @apply w-full h-full transform scale-0;
}
.projects .projects-wrapper .projects-card-wrapper .project-navigation {
   @apply w-12 h-12 absolute bg-white rounded-full z-20 flex justify-center items-center opacity-0 transition delay-200 ease-in-out;
}
.projects .projects-wrapper .projects-card-wrapper:hover .project-navigation {
   @apply opacity-100;
}
.projects .projects-wrapper .projects-card-wrapper .project-navigation.left {
   top: 50%;
   left: 0;
   transform: translate(-50%, -50%);
}
.projects .projects-wrapper .projects-card-wrapper .project-navigation.right {
   top: 50%;
   right: 0;
   transform: translate(50%, -50%);
}
.projects .projects-wrapper .projects-card-wrapper .project-navigation.hide {
   display: none !important;
}
.projects .projects-wrapper .project-card {
   @apply w-full h-full flex-shrink-0 relative;
}
.projects .projects-wrapper .select-story {
   @apply py-6 px-16 border-2 border-dashed border-gray-100 text-xl font-bold absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}
.projects .projects-wrapper .project-card .card-body {
   @apply w-full absolute top-0 left-0 flex flex-col items-end;
}
.projects .projects-wrapper .project-card .card-body .title-wrapper {
   background: rgba(0, 0, 0, 0.75);
   @apply py-1 px-3 rounded-bl-xl;
}
</style>
