import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    score: 0,
    level: 1,
    isGameOver: false,
    isWon: false
  }),
  getters: {
    highScore: (state) => state.score * state.level,
    gameStatus: (state) => state.isGameOver ? 'Game Over' : 'In Progress'
  },
  actions: {
    increaseScore(points) {
      this.score += points
    },
    increaseLevel() {
      this.level++
    }
  }
})
