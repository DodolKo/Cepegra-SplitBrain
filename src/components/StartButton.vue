<script setup>
import { useGameStore } from '../stores/game'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()

const startGame = () => {
  gameStore.startGame()
}
</script>
<template>
  <button id="start-button" @click="startGame()">Start Game</button>
</template>

<style scoped></style>