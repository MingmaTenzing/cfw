<script setup lang="ts"></script>

<template>
  <div class="p-4 border flex flex-col gap-4 md:gap-6 lg:flex-row hover:ring lg:space-x-20">
    <div class="flex space-x-4 items-center lg:w-[30%]">
      <div class="w-[40px] h-[40px] object-contain bg-accent animate-pulse"></div>
      <div class="space-y-2">
        <div class="text-xl w-[140px] h-[28px] bg-accent animate-pulse font-semibold">{{}}</div>
        <div
          class="flex w-[108px] h-[14px] bg-accent animate-pulse space-x-2 items-center text-primary/85 text-sm"
        ></div>
      </div>
    </div>

    <!-- price -->
    <div class="gap-2 flex flex-col md:flex-row md:w-full md:justify-between">
      <div>
        <p class="text-sm font-light">Price</p>
        <div class="w-[52px] h-[24px] bg-accent animate-pulse"></div>
      </div>

      <div>
        <p class="text-sm font-light">Brand</p>
        <div class="w-[54px] h-[24px] bg-accent animate-pulse"></div>
      </div>
      <div>
        <p class="text-sm font-light">Address</p>
        <div class="w-[124px] h-[24px] bg-accent animate-pulse"></div>
      </div>
      <div>
        <p class="text-sm font-light">Phone</p>
        <div class="w-[118px] h-[24px] bg-accent animate-pulse"></div>
      </div>
      <div>
        <p class="text-sm font-light">Date</p>
        <div class="w-[96px] h-[24px] bg-accent animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
