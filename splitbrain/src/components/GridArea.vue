<template>
  <div class="grid-area">
    <div
      v-for="(row, y) in currentGrid"
      :key="y"
      class="grid-row"
    >
      <div
        v-for="(cell, x) in row"
        :key="`${x}-${y}`"
        :class="getCellClasses(cell, x, y)"
      >
        <!-- Player indicator -->
        <span v-if="isPlayerPosition(x, y)" class="player-indicator">
          {{ playerNumber }}
        </span>
        <!-- Exit indicator -->
        <span v-else-if="isExitPosition(x, y)" class="exit-indicator">
          {{ playerNumber }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

const props = defineProps({
  playerNumber: {
    type: String,
    required: true,
    validator: (value) => ['1', '2'].includes(value)
  }
})

const gameStore = useGameStore()
const { grid1, grid2, player1, player2, exit1, exit2 } = storeToRefs(gameStore)

const currentGrid = computed(() => {
  return props.playerNumber === '1' ? grid1.value : grid2.value
})

const currentPlayer = computed(() => {
  return props.playerNumber === '1' ? player1.value : player2.value
})

const currentExit = computed(() => {
  return props.playerNumber === '1' ? exit1.value : exit2.value
})

const isPlayerPosition = (x, y) => {
  return currentPlayer.value.x === x && currentPlayer.value.y === y
}

const isExitPosition = (x, y) => {
  return currentExit.value.x === x && currentExit.value.y === y
}

const getCellClasses = (cell, x, y) => {
  const classes = ['cell']
  
  if (cell.type === 'wall') {
    classes.push('wall')
  } else {
    classes.push('empty')
  }
  
  if (isPlayerPosition(x, y)) {
    classes.push('player')
  }
  
  if (isExitPosition(x, y)) {
    classes.push('goal')
  }
  
  return classes.join(' ')
}
</script>

<style scoped>
.grid-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.grid-row {
  display: flex;
  flex: 1;
  width: 100%;
}

.cell {
  flex: 1;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.cell.empty {
  background-color: rgba(255, 255, 255, 0.05);
}

.cell.wall {
  background-color: rgba(255, 255, 255, 0.2);
}

.cell.player {
  background-color: rgba(100, 200, 255, 0.3);
}

.cell.goal {
  background-color: rgba(255, 200, 100, 0.2);
}

.player-indicator {
  font-size: 1.5em;
  font-weight: bold;
  color: #64c8ff;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.8);
}

.exit-indicator {
  font-size: 1.2em;
  font-weight: bold;
  color: #ffc864;
  opacity: 0.7;
}
</style>
