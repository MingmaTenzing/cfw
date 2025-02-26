<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { fuel_data_parser } from '../../../utils/fuel_data_parser'
import type { fuel_detail_item } from '../../../types'

// const route = useRoute()

const fuelData = ref<fuel_detail_item[]>([])

onMounted(async () => {
  const response = await axios.get(import.meta.env.VITE_API_URL)
  const xmlText = await response.data
  console.log(response.data)

  fuelData.value = fuel_data_parser(xmlText)
})
</script>

<template>
  <div>{{ fuelData.length }}</div>
</template>
