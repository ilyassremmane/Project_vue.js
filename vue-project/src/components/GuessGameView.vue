<template>
  <div>
    <h2>Jeu : Devine l'origine !</h2>
    <button @click="nextInstrument">Instrument Suivant</button>
    
    <div v-if="currentInstrument">
      <img :src="currentInstrument.pictureUrl" style="max-height: 300px;" />
      <h3>{{ currentInstrument.name }}</h3>
      
      <div>
        <label>Continent d'origine ?</label>
        <select v-model="guess">
          <option>Europe</option>
          <option>Asie</option>
          <option>Afrique</option>
          <option>Amérique</option>
        </select>
        <button @click="checkAnswer">Valider</button>

        <div v-if="revealedAnswer" class="answer-popup" style="margin-top:10px; padding:8px; border:1px solid #444; border-radius:6px; background:#f0f0f0;">
          Vraie réponse : {{ revealedAnswer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getInstrumentsData } from '@/services/api'

const currentInstrument = ref(null)
const guess = ref('')
const revealedAnswer = ref('')

const nextInstrument = async () => {
  const data = await getInstrumentsData(1)
  currentInstrument.value = data[0]
  revealedAnswer.value = ''
}

const checkAnswer = () => {
  if (!currentInstrument.value) {
    revealedAnswer.value = 'Aucun instrument chargé pour le moment.'
    return
  }

  revealedAnswer.value = currentInstrument.value.country || 'Inconnu'
}
</script>