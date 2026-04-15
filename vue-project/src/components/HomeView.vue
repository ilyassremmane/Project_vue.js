<template>
  <div>
    <h2>Galerie des Instruments</h2>
    
    <InstrumentOptions 
      v-model:search="search" 
      v-model:sortBy="sortBy" 
      v-model:sortOrder="sortOrder"
    />
    
    <div v-if="loading">Chargement des instruments depuis The Met...</div>
    
    <InstrumentContent 
      v-else
      :instrumentsData="instrumentsData" 
      :search="search" 
      :sortBy="sortBy" 
      :sortOrder="sortOrder"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getInstrumentsData } from '@/services/api'
import InstrumentOptions from './InstrumentOptions.vue'
import InstrumentContent from './InstrumentContent.vue'

const instrumentsData = ref([])
const loading = ref(true)

const getData = async () => {
  instrumentsData.value = await getInstrumentsData(30)
  loading.value = false
}

onMounted(() => {
  getData()
})

const search = ref(localStorage.getItem('searchInst') || '')
const sortBy = ref(localStorage.getItem('sortInst') || 'year')
const sortOrder = ref(localStorage.getItem('sortOrderInst') || 'asc')

watch(search, () => localStorage.setItem('searchInst', search.value))
watch(sortBy, () => localStorage.setItem('sortInst', sortBy.value))
watch(sortOrder, () => localStorage.setItem('sortOrderInst', sortOrder.value))
</script>