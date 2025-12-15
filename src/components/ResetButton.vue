<script setup>
import { useGameStore } from '../stores/game'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()

const resetGame = () => {
  gameStore.resetGame()
}
</script>
<template>
  <button id="start-button" @click="resetGame()">Reset Game</button>
</template>

<style scoped></style>