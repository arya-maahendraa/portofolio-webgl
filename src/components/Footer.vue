<template>
   <footer class="footer">
      <div class="model-creator">
         <p class="text-xs block">
            Model <a href="https://skfb.ly/6ZFnM">Stylized WW1 Plane </a> by
            <a href="https://sketchfab.com/AntijnvanderGun">AntijnvanderGun</a> and is licensed
            under
            <a href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution</a>
         </p>
      </div>
      <div class="creator">
         <p class="text-xs block">made with headache and tears - arya maahendra</p>
      </div>
   </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
   setup() {
      onMounted(() => {
         document.querySelectorAll(".footer a").forEach((item) => {
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
footer.footer {
   @apply h-12 w-screen px-10 fixed bottom-0 left-0 z-50 flex items-center justify-between;
}

.model-creator p {
   width: 50ch;
}
.model-creator p a {
   @apply text-blue-500 underline;
}
</style>
