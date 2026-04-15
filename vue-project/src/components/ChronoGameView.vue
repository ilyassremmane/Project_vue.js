<template>
  <div>
    <h2>Jeu : Remet les instruments dans l'ordre chronologique !</h2>
    <button @click="startGame">Piocher 5 instruments</button>
    
    <div v-if="gameInstruments.length > 0">
      <h3>Instruments mélangés :</h3>
      <div class="instruments-grid">
        <div v-for="instrument in shuffledInstruments" :key="instrument.id" class="instrument-card">
          <img :src="instrument.pictureUrl" :alt="instrument.name" style="max-width: 150px; max-height: 150px;" />
          <p>{{ instrument.name }}</p>
        </div>
      </div>
      
      <h3>Remets-les dans l'ordre chronologique :</h3>
      <div class="order-selection">
        <div v-for="i in 5" :key="i" class="order-item">
          <label>{{ i }}. </label>
          <select v-model="userOrder[i-1]">
            <option value="">-- Choisir --</option>
            <option v-for="instrument in gameInstruments" :key="instrument.id" :value="instrument.id">
              {{ instrument.name }}
            </option>
          </select>
        </div>
      </div>
      
      <button @click="checkOrder">Vérifier l'ordre</button>
      
      <div v-if="resultMessage" :class="['result', resultType]" style="margin-top: 20px; padding: 10px; border-radius: 5px;">
        {{ resultMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getInstrumentsData } from '@/services/api'

const gameInstruments = ref([])
const userOrder = ref(['', '', '', '', ''])
const resultMessage = ref('')
const resultType = ref('')

const shuffledInstruments = computed(() => {
  return [...gameInstruments.value].sort(() => Math.random() - 0.5)
})

const startGame = async () => {
  // On demande juste 5 instruments à notre API
  gameInstruments.value = await getInstrumentsData(5)
  userOrder.value = ['', '', '', '', '']
  resultMessage.value = ''
  resultType.value = ''
}

const checkOrder = () => {
  // Vérifier que tous les selects sont remplis
  if (userOrder.value.some(id => !id)) {
    resultMessage.value = 'Veuillez sélectionner tous les instruments.'
    resultType.value = 'error'
    return
  }
  
  // Vérifier que tous les IDs sont uniques
  const uniqueIds = new Set(userOrder.value)
  if (uniqueIds.size !== 5) {
    resultMessage.value = 'Chaque instrument ne peut être sélectionné qu\'une fois.'
    resultType.value = 'error'
    return
  }
  
  // Créer l'ordre correct
  const correctOrder = [...gameInstruments.value]
    .sort((a, b) => (a.year || 0) - (b.year || 0))
    .map(inst => inst.id)
  
  // Vérifier si l'ordre de l'utilisateur correspond
  const isCorrect = userOrder.value.every((id, index) => id === correctOrder[index])
  
  if (isCorrect) {
    resultMessage.value = 'Bravo ! Ordre chronologique correct.'
    resultType.value = 'success'
  } else {
    const correctNames = correctOrder.map(id => gameInstruments.value.find(inst => inst.id === id).name)
    resultMessage.value = `Ordre incorrect. L'ordre correct était : ${correctNames.join(', ')}`
    resultType.value = 'error'
  }
}
</script>

<style scoped>
.instruments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.instrument-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background: #f9f9f9;
}

.instrument-card img {
  border-radius: 4px;
}

.order-selection {
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.order-item label {
  min-width: 30px;
  font-weight: bold;
}

.order-item select {
  flex: 1;
  padding: 5px;
  margin-left: 10px;
}

.result.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.result.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>