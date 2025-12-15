import { defineStore } from 'pinia'
import { levels } from './levels'
import { useCounterStore } from './counter'

const counterStore = useCounterStore()

export const useGameStore = defineStore('game', {
  state: () => ({
    // Game state
    score: 0,
    currentLevelIndex: 0,
    isGameOver: false,
    isWon: false,
    isLevelComplete: false,
    isGameStarted: false,
    
    // Grid state
    grid: [],
    gridWidth: 0,
    gridHeight: 0,
    
    // Player positions { x, y }
    player1: { x: 0, y: 0 },
    player2: { x: 0, y: 0 },
    
    // Exit positions { x, y }
    exit1: { x: 0, y: 0 },
    exit2: { x: 0, y: 0 },
    
    // Timer state
    elapsedTime: 0,
    remainingTime: 60,
    timerInterval: null
  }),
  
  getters: {
    highScore: (state) => state.score * (state.currentLevelIndex + 1),
    gameStatus: (state) => state.isGameOver ? 'Game Over' : 'In Progress',
    currentLevel: (state) => levels[state.currentLevelIndex] || null,
    totalLevels: () => levels.length,
    levelDisplay: (state) => `${state.currentLevelIndex + 1} / ${levels.length}`
  },
  
  actions: {
    /**
     * Parse ASCII grid into internal structure
     */
    parseLevel(levelData) {
      const { grid: gridStrings } = levelData
      const height = gridStrings.length
      const width = gridStrings[0]?.length || 0
      
      const parsedGrid = []
      let player1Start = null
      let player2Start = null
      let exit1Pos = null
      let exit2Pos = null
      
      for (let y = 0; y < height; y++) {
        const row = []
        for (let x = 0; x < width; x++) {
          const char = gridStrings[y][x]
          
          if (char === '#') {
            row.push({ type: 'wall', x, y })
          } else if (char === '.') {
            row.push({ type: 'floor', x, y })
          } else if (char === 'A') {
            row.push({ type: 'floor', x, y })
            player1Start = { x, y }
          } else if (char === 'B') {
            row.push({ type: 'floor', x, y })
            player2Start = { x, y }
          } else if (char === '1') {
            row.push({ type: 'floor', x, y })
            exit1Pos = { x, y }
          } else if (char === '2') {
            row.push({ type: 'floor', x, y })
            exit2Pos = { x, y }
          } else {
            // Default to floor for unknown chars
            row.push({ type: 'floor', x, y })
          }
        }
        parsedGrid.push(row)
      }
      
      return {
        grid: parsedGrid,
        width,
        height,
        player1Start: player1Start || { x: 0, y: 0 },
        player2Start: player2Start || { x: 0, y: 0 },
        exit1: exit1Pos || { x: 0, y: 0 },
        exit2: exit2Pos || { x: 0, y: 0 }
      }
    },
    
    /**
     * Load a level by index
     */
    loadLevel(index) {
      if (index < 0 || index >= levels.length) {
        console.error(`Level ${index} does not exist`)
        return false
      }
      
      const levelData = levels[index]
      const parsed = this.parseLevel(levelData)
      
      this.currentLevelIndex = index
      this.grid = parsed.grid
      this.gridWidth = parsed.width
      this.gridHeight = parsed.height
      this.player1 = { ...parsed.player1Start }
      this.player2 = { ...parsed.player2Start }
      this.exit1 = { ...parsed.exit1 }
      this.exit2 = { ...parsed.exit2 }
      this.isLevelComplete = false
      
      return true
    },
    
    /**
     * Check if a position is valid (within bounds and not a wall)
     */
    canMoveTo(x, y) {
      if (x < 0 || x >= this.gridWidth || y < 0 || y >= this.gridHeight) {
        return false
      }
      const cell = this.grid[y]?.[x]
      return cell && cell.type !== 'wall'
    },
    
    /**
     * Move player 1 (ZQSD controls)
     */
    movePlayer1(direction) {
      if (this.isLevelComplete || !this.isGameStarted) return false
      
      let dx = 0
      let dy = 0
      
      switch (direction) {
        case 'up':
          dy = -1
          break
        case 'down':
          dy = 1
          break
        case 'left':
          dx = -1
          break
        case 'right':
          dx = 1
          break
        default:
          return false
      }
      
      const newX = this.player1.x + dx
      const newY = this.player1.y + dy
      
      if (this.canMoveTo(newX, newY)) {
        this.player1.x = newX
        this.player1.y = newY
        this.checkWin()
        return true
      }
      
      return false
    },
    
    /**
     * Move player 2 (arrow keys)
     */
    movePlayer2(direction) {
      if (this.isLevelComplete || !this.isGameStarted) return false
      
      let dx = 0
      let dy = 0
      
      switch (direction) {
        case 'up':
          dy = -1
          break
        case 'down':
          dy = 1
          break
        case 'left':
          dx = -1
          break
        case 'right':
          dx = 1
          break
        default:
          return false
      }
      
      const newX = this.player2.x + dx
      const newY = this.player2.y + dy
      
      if (this.canMoveTo(newX, newY)) {
        this.player2.x = newX
        this.player2.y = newY
        this.checkWin()
        return true
      }
      
      return false
    },
    
    /**
     * Check if both players are on their exits
     */
    checkWin() {
      const player1OnExit = this.player1.x === this.exit1.x && this.player1.y === this.exit1.y
      const player2OnExit = this.player2.x === this.exit2.x && this.player2.y === this.exit2.y
      
      if (player1OnExit && player2OnExit) {
        this.isLevelComplete = true
        this.score += 100
        
        // Play win sound
        const winSound = document.getElementById('win-sound')
        if (winSound) {
          winSound.play().catch(e => console.log('Could not play sound:', e))
        }
        
        // Auto-advance to next level after a short delay
        setTimeout(() => {
          this.nextLevel()
        }, 1000)
      }
    },
    
    /**
     * Advance to next level
     */
    nextLevel() {
      if (this.currentLevelIndex < levels.length - 1) {
        this.loadLevel(this.currentLevelIndex + 1)
      } else {
        // All levels completed
        this.isWon = true
        this.isGameOver = true
        this.stopTimer()
      }
    },
    
    /**
     * Reset current level
     */
    resetLevel() {
      this.loadLevel(this.currentLevelIndex)
    },
    
    /**
     * Start the game
     */
    startGame() {
      this.isGameOver = false
      this.isWon = false
      this.isGameStarted = true
      this.currentLevelIndex = 0
      this.score = 0
      this.elapsedTime = 0
      this.remainingTime = 60
      this.loadLevel(0)
      this.startTimer()
      counterStore.reset()
    },
    
    /**
     * Start timer
     */
    startTimer() {
      this.stopTimer() // Clear any existing timer
      this.timerInterval = setInterval(() => {
        this.elapsedTime++
        if (this.remainingTime > 0) {
          this.remainingTime--
        } else {
          // Time's up
          this.isGameOver = true
          this.stopTimer()
        }
      }, 1000)
    },
    
    /**
     * Stop timer
     */
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    
    /**
     * Legacy methods for compatibility
     */
    increaseScore(points) {
      this.score += points
    },
    increaseLevel() {
      this.nextLevel()
    },
    endGame(won) {
      this.isGameOver = true
      this.isWon = won
      this.stopTimer()
    },
    resetGame() {
      this.score = 0
      this.currentLevelIndex = 0
      this.isGameOver = false
      this.isWon = false
      this.isGameStarted = false
      this.isLevelComplete = false
      this.elapsedTime = 0
      this.remainingTime = 60
      this.stopTimer()
      this.loadLevel(0)
    }
  }
})
