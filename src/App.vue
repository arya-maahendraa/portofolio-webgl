<template>
   <NotForDevice v-if="disabled" />
   <navbar v-if="!disabled" />
   <div class="relative">
      <canvas class="fixed top-0 left-0 z-0" ref="canvas"></canvas>
      <div v-if="!disabled" class="h-screen px-10 pb-12 pt-16 w-full">
         <!-- <router-view @onRouteChnage="routeChange($event)"></router-view> -->
         <viewHome v-if="currentView === 'Home'" @onRouteChnage="routeChange($event)" />
         <viewAbout v-if="currentView === 'About'" @onRouteChnage="routeChange($event)" />
         <viewProjects v-if="currentView === 'Projects'" @onRouteChnage="routeChange($event)" />
         <viewContact v-if="currentView === 'Connect'" @onRouteChnage="routeChange($event)" />
      </div>
   </div>
   <Footer v-if="!disabled" />
   <div v-if="!disabled" ref="cursor1" class="custom-cursor1"></div>
   <div v-if="!disabled" ref="cursor2" class="custom-cursor2"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PlaneInSpace from "./three";
import { LoadingManager } from "three";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import viewHome from "./views/Home.vue";
import viewAbout from "./views/About.vue";
import viewProjects from "./views/Projects.vue";
import viewContact from "./views/Contact.vue";
import NotForDevice from "./views/NotForDevice.vue";

export default defineComponent({
   components: { Navbar, Footer, viewHome, viewAbout, viewProjects, viewContact, NotForDevice },
   setup() {
      const cursor1 = ref<HTMLDivElement>();
      const cursor2 = ref<HTMLDivElement>();
      const canvas = ref<HTMLCanvasElement>();
      let planeInSpace: PlaneInSpace | undefined;
      const mousePos = { x: 0, y: 0 };
      const manager = new LoadingManager();
      let currentView = ref("Home");
      let disabled = ref(false);
      manager.onStart = function (url, itemsLoaded, itemsTotal) {
         console.log(
            "Started loading file: " +
               url +
               ".\nLoaded " +
               itemsLoaded +
               " of " +
               itemsTotal +
               " files."
         );
      };
      manager.onLoad = function () {
         console.log("Loading complete!");
         tick();
      };
      manager.onError = function (url) {
         console.log("There was an error loading " + url);
      };
      const checkWindowSize = () => {
         if (window.innerHeight >= 600 && window.innerWidth >= 1200) {
            disabled.value = false;
         } else {
            disabled.value = true;
         }
      };
      onMounted(() => {
         checkWindowSize();
         if (canvas.value) {
            planeInSpace = new PlaneInSpace(canvas.value, manager);
            window.addEventListener(
               "resize",
               () => {
                  planeInSpace?.onWindowResize();
                  checkWindowSize();
                  console.log(window.innerWidth);
               },
               false
            );
            document.addEventListener(
               "mousemove",
               (e) => {
                  mousePos.x = e.pageX;
                  mousePos.y = e.pageY;
                  planeInSpace?.setMousePos(e.pageX, e.pageY);
               },
               false
            );
         }
      });
      const tick = () => {
         if (cursor1.value && cursor2.value) {
            cursor1.value.style.transform = `translate3d(calc(${mousePos.x}px - 50%), calc(${mousePos.y}px - 50%), 0)`;
            cursor2.value.style.left = `${mousePos.x}px`;
            cursor2.value.style.top = `${mousePos.y}px`;
         }
         if (planeInSpace) {
            planeInSpace.render();
         }
         window.requestAnimationFrame(tick);
      };
      const routeChange = async (e: { from: String; to: String }) => {
         planeInSpace?.setStarsSpeed("fast");
         const isAnimatedCompleted = await planeInSpace?.playAnimation(e.from, e.to);
         if (isAnimatedCompleted) {
            planeInSpace?.setStarsSpeed("slow");
            currentView.value = e.to.toString();
         }
      };
      return { canvas, cursor1, cursor2, routeChange, currentView, disabled };
   },
});
</script>

<style scoped>
.custom-cursor1 {
   width: 45px;
   height: 45px;
   border-radius: 100%;
   border: 1px solid white;
   transition: all 200ms ease-out;
   position: fixed;
   pointer-events: none;
   left: 0;
   top: 0;
   transform: translate(calc(-50% + 15px), -50%);
   z-index: 99999;
}
.custom-cursor2 {
   width: 15px;
   height: 15px;
   border-radius: 100%;
   background-color: white;
   opacity: 0.3;
   position: fixed;
   transform: translate(-50%, -50%);
   pointer-events: none;
   transition: width 0.3s, height 0.3s, opacity 0.3s;
   z-index: 99999;
}

.custom-cursor1.hover {
   animation: customCursor2OnHover 0.35s infinite alternate;
}
.custom-cursor1.hover1 {
   animation: customCursor2OnHover 0.35s infinite alternate;
   border-color: #756019;
}
.custom-cursor1.hover2 {
   animation: customCursor2OnHover 0.35s infinite alternate;
   @apply border-indigo-700;
}

.custom-cursor2.hover {
   width: 10px;
   height: 10px;
   /* @apply bg-blue-800; */
   opacity: 0.7;
}

.custom-cursor2.hover1 {
   width: 10px;
   height: 10px;
   background-color: #45380e;
   opacity: 0.7;
}
.custom-cursor2.hover2 {
   width: 10px;
   height: 10px;
   @apply bg-indigo-800;
   opacity: 0.85;
}

@keyframes customCursor2OnHover {
   from {
      width: 45px;
      height: 45px;
   }
   to {
      width: 25px;
      height: 25px;
   }
}
</style>
