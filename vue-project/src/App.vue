<template>
  <header>
    <h1>🎵 Met Instruments Explorer</h1>
    <nav>
      <RouterLink to="/">Galerie (Accueil)</RouterLink> | 
      <RouterLink to="/chrono-game">Jeu : Chronologie</RouterLink> | 
      <RouterLink to="/guess-game">Jeu : Devine l'origine</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView /> 
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
nav { margin-bottom: 20px; font-size: 1.2rem; }
nav a { text-decoration: none; color: #2c3e50; font-weight: bold; }
nav a.router-link-exact-active { color: #42b983; }
</style>