<template>
  <div class="gallery-grid">
    <InstrumentCard
      v-for="instrument in filteredData"
      :key="instrument.id"
      :name="instrument.name"
      :year="instrument.year"
      :family="instrument.family"
      :country="instrument.country"
      :pictureUrl="instrument.pictureUrl"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InstrumentCard from './InstrumentCard.vue'

const props = defineProps({
  instrumentsData: Array,
  search: String,
  sortBy: String,
  sortOrder: String,
})

const filteredData = computed(() => {
  let result = props.instrumentsData.filter((inst) =>
    inst.name.toLowerCase().includes(props.search.toLowerCase())
  )
  
  result = result.sort((a, b) => {
    let comparison = 0
    if (props.sortBy === 'year') {
      comparison = (a.year || 0) - (b.year || 0)
    } else {
      comparison = a.name.localeCompare(b.name)
    }
    return props.sortOrder === 'desc' ? -comparison : comparison
  })
  return result
})
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>