<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { levels } from '@/stores/levels'

const gameStore = useGameStore()
const { reachedLevelIndex, elapsedTime } = storeToRefs(gameStore)

const reachedLevel = computed(() => {
  if (reachedLevelIndex.value >= 0 && reachedLevelIndex.value < levels.length) {
    return levels[reachedLevelIndex.value]
  }
  return null
})

const levelDisplay = computed(() => {
  if (reachedLevel.value) {
    return `${reachedLevelIndex.value + 1} / ${levels.length}`
  }
  return '0 / 0'
})

const handleRestart = () => {
  gameStore.resetGame()
  gameStore.startGame()
}
</script>

<template>
  <div class="game-over-overlay">
    <div class="game-over-screen">
      <h1 class="game-over-title">⏰ Temps écoulé!</h1>
      <div class="game-over-content">
        <p class="level-reached">Niveau atteint:</p>
        <p class="level-name">{{ reachedLevel?.name || 'Aucun' }}</p>
        <p class="level-info">Niveau {{ levelDisplay }}</p>
        <p class="time-info">Temps total: {{ elapsedTime }}s</p>
      </div>
      <button class="restart-button" @click="handleRestart">
        Recommencer
      </button>
      <p class="hint">Appuyez sur ESPACE pour recommencer</p>
    </div>
  </div>
</template>

<style scoped>
.game-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.game-over-screen {
  background: #222;
  color: white;
  padding: 3rem 4rem;
  border: 4px solid #ff6b6b;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
  max-width: 500px;
  width: 90%;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.game-over-title {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 1.5rem;
  color: #ff6b6b;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.8);
}

.game-over-content {
  margin-bottom: 2rem;
}

.level-reached {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.8rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.level-name {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 1.2rem;
  color: #ffd93d;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(255, 217, 61, 0.5);
}

.level-info {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 1rem;
}

.time-info {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 1rem;
}

.restart-button {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: #4ecdc4;
  color: white;
  border: 3px solid #45b8b0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.restart-button:hover {
  background: #45b8b0;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
}

.restart-button:active {
  transform: translateY(0);
}

.hint {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.6rem;
  color: #888;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .game-over-screen {
    padding: 2rem 2rem;
  }

  .game-over-title {
    font-size: 1.2rem;
  }

  .level-name {
    font-size: 1rem;
  }
}
</style>
