import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCounterStore } from './counter'


export const useGameStore = defineStore('game', {
  state: () => ({
    counterStore: useCounterStore(),
    score: 0,
    level: 1,
    isGameOver: false,
    isWon: false,
    isPlaying: false
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
    },
    endGame(won) {
      if (won) {
        this.isGameOver = true
        this.isWon = won
      }
      else {
        this.isGameOver = true
        this.isWon = false
      }
    },
    resetGame() {
      this.score = 0
      this.level = 1
      this.isGameOver = false
      this.isWon = false
      this.isPlaying = false
      this.counterStore.reset()
    },
    startGame() {
      this.isGameOver = false
      this.isWon = false
      this.isPlaying = true
      this.counterStore.start()
    }
  }
})
