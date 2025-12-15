<script setup>
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import GridArea from '@/components/GridArea.vue'
import StartButton from '@/components/StartButton.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const { levelDisplay, elapsedTime, remainingTime, isGameStarted } = storeToRefs(gameStore)

// Keyboard input handling
const handleKeyDown = (event) => {
  if (!isGameStarted.value) return

  // Prevent default scrolling for arrow keys
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
  }

  // Player 1 controls (ZQSD)
  switch (event.key.toLowerCase()) {
    case 'z':
      gameStore.movePlayer1('up')
      break
    case 'q':
      gameStore.movePlayer1('left')
      break
    case 's':
      gameStore.movePlayer1('down')
      break
    case 'd':
      gameStore.movePlayer1('right')
      break
  }

  // Player 2 controls (Arrow keys)
  switch (event.key) {
    case 'ArrowUp':
      gameStore.movePlayer2('up')
      break
    case 'ArrowLeft':
      gameStore.movePlayer2('left')
      break
    case 'ArrowDown':
      gameStore.movePlayer2('down')
      break
    case 'ArrowRight':
      gameStore.movePlayer2('right')
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // Load initial level (but don't start game yet)
  if (!gameStore.isGameStarted) {
    gameStore.loadLevel(0)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  gameStore.stopTimer()
})
</script>

<template>
  <main>
    <h1>🧠 Split Brain</h1>
    <div id="info-bar">
      <span id="timer">⏱️ {{ elapsedTime }}s</span> | <span id="level">Level {{ levelDisplay }}</span> |
      <span id="countdown">⏳ {{ remainingTime }}s remaining</span> |
      <span id="totalTime">Total time : {{ elapsedTime }}s</span>
    </div>
    <div id="instructions" class="instructions">
      <h2>🎮 Controls</h2>
      <p>
        <strong>Player 1 (left)</strong> : Z (up), Q (left), S (down), D (right)
      </p>
      <p><strong>Player 2 (right)</strong> : Arrow keys ← ↑ ↓ →</p>
    </div>
    <StartButton />
    <div class="grid-container">
      <div id="left" class="grid">
        <GridArea player-number="1" />
      </div>
      <div id="right" class="grid">
        <GridArea player-number="2" />
      </div>
    </div>
    <audio id="win-sound" src="/assets/victory.mp3" preload="auto"></audio>
  </main>
</template>
