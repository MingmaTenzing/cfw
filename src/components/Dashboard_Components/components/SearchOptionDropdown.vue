<script lang="ts" setup>
import { ref } from 'vue'
import type { search_props } from '../../../../types'

const props = defineProps<{
  dropdownOptions: search_props[]
  default_option: search_props
}>()
const toggle = ref(false)
const selectedOption = ref(props.dropdownOptions[0])

const emit = defineEmits<{
  (event: 'selected_value', value: search_props): void
}>()

function option_selected(item: search_props) {
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
      <p>{{ selectedOption.name || 'select option' }}</p>
      <i class="pi pi-chevron-down"></i>
    </div>
    <Transition name="dropdown">
      <div v-if="toggle" class="absolute z-10 left-0 border-b border-l border-r rounded-lg w-full">
        <div v-for="(item, index) in dropdownOptions" :key="index">
          <div
            v-on:click="option_selected(item)"
            class="p-2 hover:bg-accent bg-background cursor-pointer"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <div v-else class="rounded-lg border text-sm p-2 relative w-full">
    <div v-on:click="toggle = !toggle" class="flex items-center justify-between">
      <p>{{ selectedOption.name || 'select option' }}</p>
      <i class="pi pi-chevron-down"></i>
    </div>
    <Transition name="dropdown">
      <div v-if="toggle" class="absolute z-10 left-0 border-b border-l border-r rounded-lg w-full">
        <div v-for="(item, index) in dropdownOptions" :key="index">
          <div
            v-on:click="option_selected(item)"
            class="p-2 hover:bg-accent bg-background cursor-pointer"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
