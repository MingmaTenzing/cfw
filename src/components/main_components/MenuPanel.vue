<script lang="ts" setup>
import { inject } from 'vue'
import { type themeContext } from '../../../utils/theme_type'
import { RouterView } from 'vue-router'

// asserted that theme will always be provided from the root app level
const { theme, changeTheme } = inject<themeContext>('theme')!
</script>

<template>
  <main class="text-primary bg-background w-full h-full md:w-[412px] rounded-lg">
    <div class="p-2 flex justify-center">
      <img
        src="../../assets/cfw_white_logo.png"
        width="160"
        height="60"
        class="invert dark:invert-0"
      />
      {{ theme }}

      <button @click="changeTheme">
        <i class="pi pi-moon text-foreground"></i>
      </button>
    </div>

    <!-- price list component and individual station detail -->
    <RouterView></RouterView>
  </main>
</template>
