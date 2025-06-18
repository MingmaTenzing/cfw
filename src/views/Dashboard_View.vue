<script setup lang="ts">
import Header_Component from '@/components/Dashboard/components/Header_Component.vue'
import SideBar from '@/components/main_components/SideBar.vue'
import { inject, provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const { show_side_bar, toggle_side_bar } = inject('toggle_side_bar', {
  show_side_bar: false,
  toggle_side_bar: () => undefined,
})
</script>

<template>
  <main class="bg-background relative p-4">
    <Header_Component></Header_Component>

    <RouterView></RouterView>
    <Transition>
      <SideBar v-if="show_side_bar" class="fixed left-0 top-0 z-10 shadow-2xl"> </SideBar>
    </Transition>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 400ms ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-240px);
}
</style>
