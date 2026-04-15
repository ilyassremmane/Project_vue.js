<template>
  <div class="card">
    <img v-if="pictureUrl" :src="pictureUrl" alt="Instrument" />
    <div v-else class="no-image">Pas d'image</div>
    
    <h3>{{ name }}</h3>
    <p><strong>Année :</strong> {{ year || 'Inconnue' }}</p>
    <p><strong>Famille :</strong> {{ family }}</p>
    <p><strong>Origine :</strong> {{ country }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  year: Number,
  family: String,
  country: String,
  pictureUrl: String
})
</script>

<style scoped>
.card { border: 1px solid #ccc; padding: 10px; border-radius: 8px; }
.card img { width: 100%; height: 200px; object-fit: contain; }
.no-image { height: 200px; background: #eee; display: flex; align-items: center; justify-content: center; }
</style>