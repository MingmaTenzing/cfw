<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  dropdownOptions: {
    type: Array<string>,
    required: true,
  },
  default_Option: {
    type: String,
    default: 'ULP',
  },
})
const toggle = ref(false)
const selectedOption = ref(props.default_Option)

function option_selected(item: string) {
  toggle.value = !toggle.value
  selectedOption.value = item
}
</script>

<template>
  <div class="rounded-lg border text-sm p-2 relative w-full">
    <div v-on:click="toggle = !toggle" class="flex items-center justify-between">
      <p>{{ selectedOption }}</p>
      <i class="pi pi-chevron-down"></i>
    </div>
    <Transition name="dropdown">
      <div v-if="toggle" class="absolute z-10 left-0 border-b border-l border-r rounded-lg w-full">
        <div v-for="(item, index) in dropdownOptions" :key="index">
          <div
            v-on:click="option_selected(item)"
            class="p-2 hover:bg-accent bg-background cursor-pointer"
          >
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
