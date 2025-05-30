<script lang="ts" setup>
import { inject, ref } from 'vue'
import { type themeContext } from '../../../utils/theme_type'
import { RouterView } from 'vue-router'
import { type SideBarContext, type queryFilterModalContext } from '../../../types'
import SideBar from './SideBar.vue'

const { filter_modal_open_close } = inject<queryFilterModalContext>('search_filter_modal')!
const { show_side_bar, toggle_side_bar } = inject('toggle_side_bar', {
  show_side_bar: false,
  toggle_side_bar: () => undefined,
})
</script>

<template>
  <main
    :class="[
      filter_modal_open_close
        ? 'text-primary blur-xs brightness-90    bg-background w-full h-full md:w-[320px] lg:w-[400px] rounded-lg '
        : ' text-primary   bg-background w-full h-full md:w-[320px] lg:w-[400px] rounded-lg ',
    ]"
  >
    <div class="p-4 flex justify-between">
      <button v-on:click="toggle_side_bar"><i class="pi pi-bars"></i></button>
      <img
        src="../../assets/cfw_white_logo.png"
        width="160"
        height="60"
        class="invert dark:invert-0"
      />
      <div></div>
    </div>

    <!-- price list component and individual station detail -->
    <RouterView></RouterView>
    <Transition>
      <SideBar v-if="show_side_bar" class="fixed left-0 top-0 z-20 shadow-2xl"> </SideBar>
    </Transition>
  </main>
</template>
