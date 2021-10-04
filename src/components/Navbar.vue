<template>
   <nav class="navbar">
      <div class="navbar-logo">
         <a href="#" class="text-lg font-bold tracking-wide"
            >.m<span class="text-yellow-300">aa</span>hendra</a
         >
      </div>
      <div class="navbar-menus"></div>
      <div class="navbar-contact">
         <a href="#" class="text-md text-indigo-400 font-bold tracking-wide">connected.</a>
      </div>
   </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
   setup() {
      onMounted(() => {
         document.querySelectorAll(".navbar a").forEach((item) => {
            item.addEventListener("mouseover", () => {
               document.querySelector(".custom-cursor1")?.classList.add("hover");
               document.querySelector(".custom-cursor2")?.classList.add("hover");
            });
            item.addEventListener("mouseleave", () => {
               document.querySelector(".custom-cursor1")?.classList.remove("hover");
               document.querySelector(".custom-cursor2")?.classList.remove("hover");
            });
         });
      });
   },
});
</script>

<style scoped>
.navbar {
   @apply h-16 px-10 w-full bg-transparent fixed top-0 left-0 z-50 flex items-center justify-between;
}

.navbar-menus {
   @apply flex items-center justify-center;
}
</style>
