<script lang="ts" setup>
import { inject } from 'vue'
import { type themeContext } from '../../../utils/theme_type'
import { RouterView } from 'vue-router'
import type { queryFilterModalContext } from '../../../types'

// asserted that theme will always be provided from the root app level
const { changeTheme } = inject<themeContext>('theme')!

const { filter_modal_open_close } = inject<queryFilterModalContext>('search_filter_modal')!
</script>

<template>
  <main
    :class="[
      filter_modal_open_close
        ? 'text-primary blur-xs brightness-90    bg-background w-full h-full md:w-[320px] lg:w-[400px] rounded-lg'
        : ' text-primary   bg-background w-full h-full md:w-[320px] lg:w-[400px] rounded-lg',
    ]"
  >
    <div class="p-4 flex justify-between">
      <div></div>
      <img
        src="../../assets/cfw_white_logo.png"
        width="160"
        height="60"
        class="invert dark:invert-0"
      />

      <button @click="changeTheme">
        <i class="pi pi-moon text-foreground"></i>
      </button>
    </div>

    <!-- price list component and individual station detail -->
    <RouterView></RouterView>
  </main>
</template>
