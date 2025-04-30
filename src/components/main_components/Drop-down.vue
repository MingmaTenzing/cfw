<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  dropdownOptions: {
    type: Array<string>,
    required: true,
  },
  default_option: {
    type: String,
    default: 'Today',
  },
})
const toggle = ref(false)
const selectedOption = ref(props.default_option || 'Today')

const emit = defineEmits<{
  (event: 'selected_value', value: string): void
}>()

function option_selected(item: string) {
  toggle.value = !toggle.value
  selectedOption.value = item

  emit('selected_value', selectedOption.value)
}
</script>

<template>
  <div
    v-if="toggle"
    class="h-[140px] overflow-y-scroll scrollbar-hide rounded-lg border text-sm p-2 relative w-full"
  >
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
  <div v-else class="rounded-lg border text-sm p-2 relative w-full">
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
