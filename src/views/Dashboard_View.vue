<script setup lang="ts">
import SideBar from '@/components/main_components/SideBar.vue'
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const show_side_bar = ref<boolean>(false)

function toggle_side_bar() {
  show_side_bar.value = !show_side_bar.value
}

provide('toggle_side_bar', {
  show_side_bar,
  toggle_side_bar,
})
</script>

<template>
  <main class="flex bg-background">
    <Transition>
      <SideBar v-if="show_side_bar"> </SideBar>
    </Transition>
    <RouterView></RouterView>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  /* transition: all 0.5s ease; */
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-120px);
}
</style>
