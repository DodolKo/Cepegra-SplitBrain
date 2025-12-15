<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { levels } from '@/stores/levels'

const gameStore = useGameStore()
const { score, elapsedTime, totalLevels } = storeToRefs(gameStore)

const handleRestart = () => {
  gameStore.resetGame()
  gameStore.startGame()
}
</script>

<template>
  <div class="win-overlay">
    <div class="win-screen">
      <h1 class="win-title">🎉 Victoire!</h1>
      <div class="win-content">
        <p class="congratulations">Félicitations!</p>
        <p class="completion-message">Vous avez complété tous les niveaux!</p>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">Niveaux complétés:</span>
            <span class="stat-value">{{ totalLevels }} / {{ totalLevels }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Score final:</span>
            <span class="stat-value">{{ score }} points</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Temps total:</span>
            <span class="stat-value">{{ elapsedTime }}s</span>
          </div>
        </div>
      </div>
      <button class="restart-button" @click="handleRestart">
        Rejouer
      </button>
      <p class="hint">Appuyez sur ESPACE pour rejouer</p>
    </div>
  </div>
</template>

<style scoped>
.win-overlay {
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

.win-screen {
  background: #222;
  color: white;
  padding: 3rem 4rem;
  border: 4px solid #ffd93d;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 40px rgba(255, 217, 61, 0.6);
  max-width: 500px;
  width: 90%;
  animation: slideIn 0.4s ease-out, glow 2s ease-in-out infinite;
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

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 40px rgba(255, 217, 61, 0.6);
  }
  50% {
    box-shadow: 0 0 60px rgba(255, 217, 61, 0.9);
  }
}

.win-title {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 1.8rem;
  color: #ffd93d;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(255, 217, 61, 0.8);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.win-content {
  margin-bottom: 2rem;
}

.congratulations {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 1rem;
  color: #4ecdc4;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
}

.completion-message {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 2rem;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: rgba(255, 217, 61, 0.1);
  border-radius: 8px;
  border: 2px solid rgba(255, 217, 61, 0.3);
}

.stat-label {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.7rem;
  color: #ccc;
}

.stat-value {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 0.8rem;
  color: #ffd93d;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255, 217, 61, 0.6);
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
  .win-screen {
    padding: 2rem 2rem;
  }

  .win-title {
    font-size: 1.4rem;
  }

  .congratulations {
    font-size: 0.8rem;
  }

  .stat-label {
    font-size: 0.6rem;
  }

  .stat-value {
    font-size: 0.7rem;
  }
}
</style>
