<script setup lang="ts">
import { ref } from 'vue'

const random_loading_Array = ref<number[]>([...Array(10)].map(() => Math.random() * 40))
</script>

<template>
  <section
    v-for="(item, index) in random_loading_Array"
    :key="index"
    id="price-list-item"
    class="border-b border-t border-border dark:border-border p-4 hover:bg-secondary"
  >
    <div class="flex justify-between items-center h-[94px]">
      <div class="space-y-2">
        <!-- price -->

        <div
          class="font-semibold text-center bg-accent animate-pulse rounded-lg w-[36px] h-[24px]"
        ></div>
        <div
          class="text-secondary-foreground text-center dark:text-secondary-foreground text-xs w-[36px] h-[16px] bg-accent animate-pulse rounded-lg"
        ></div>
      </div>
      <div class="space-y-2">
        <!-- details -->
        <div
          class="w-[178.2px] h-[24px] bg-accent animate-pulse rounded-lg font-bold text-center text-primary dark:text-primary"
        >
          {{}}
        </div>
        <div
          class="w-[178.2px] h-[16px] bg-accent animate-pulse rounded-lg text-zinc-500 text-center text-xs"
        ></div>
      </div>
      <div>
        <!-- logo -->
        <div class="w-[40px] h-[40px] bg-accent animate-pulse rounded-lg"></div>
      </div>
    </div>
  </section>
</template>
