<template>
  <div class="options-container">
    <input 
      type="text" 
      :value="search" 
      @input="$emit('update:search', $event.target.value)" 
      placeholder="Rechercher un instrument (ex: Guitar)..." 
      class="search-bar"
    />
    
    <select 
      :value="sortBy" 
      @change="$emit('update:sortBy', $event.target.value)"
      class="sort-select"
    >
      <option value="year">Trier par année chronologique</option>
      <option value="name">Trier par ordre alphabétique (A-Z)</option>
    </select>
    
    <select 
      :value="sortOrder" 
      @change="$emit('update:sortOrder', $event.target.value)"
      class="sort-select"
    >
      <option value="asc">Croissant</option>
      <option value="desc">Décroissant</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  sortBy: String,
  sortOrder: String
})

defineEmits(['update:search', 'update:sortBy', 'update:sortOrder'])
</script>

<style scoped>
.options-container {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.search-bar, .sort-select {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>