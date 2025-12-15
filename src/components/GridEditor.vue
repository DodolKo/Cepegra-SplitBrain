<template>
  <div class="grid-editor">
    <h3 class="grid-title">{{ title }}</h3>
    <div class="grid-area">
      <div
        v-for="(row, y) in gridRows"
        :key="y"
        class="grid-row"
      >
        <div
          v-for="(char, x) in row"
          :key="`${x}-${y}`"
          :class="getCellClasses(char, x, y)"
          @click="handleCellClick(x, y)"
          @mouseenter="handleMouseEnter(x, y)"
        >
          <span v-if="char === 'A' || char === 'B'" class="start-indicator">{{ char }}</span>
          <span v-else-if="char === '1' || char === '2'" class="exit-indicator">{{ char }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    validator: (value) => Array.isArray(value) && value.length === 12 && value.every(row => typeof row === 'string' && row.length === 12)
  },
  selectedTile: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: 'Grid'
  },
  allowedStartChar: {
    type: String,
    default: null // 'A' for grid1, 'B' for grid2
  },
  allowedExitChar: {
    type: String,
    default: null // '1' for grid1, '2' for grid2
  }
})

const emit = defineEmits(['update:modelValue'])

// Convert string array to 2D array of characters for easier manipulation
const gridRows = computed(() => {
  return props.modelValue.map(row => row.split(''))
})

const getCellClasses = (char, x, y) => {
  const classes = ['cell']
  
  if (char === '#') {
    classes.push('wall')
  } else {
    classes.push('empty')
  }
  
  if (char === 'A' || char === 'B') {
    classes.push('start')
  }
  
  if (char === '1' || char === '2') {
    classes.push('goal')
  }
  
  return classes.join(' ')
}

const handleCellClick = (x, y) => {
  if (!props.selectedTile) return
  
  const newGrid = [...props.modelValue]
  const row = newGrid[y].split('')
  
  // If placing a start/exit character, remove all existing ones first
  if (props.selectedTile === props.allowedStartChar) {
    // Remove all instances of the start char from this grid
    for (let i = 0; i < newGrid.length; i++) {
      newGrid[i] = newGrid[i].replace(props.allowedStartChar, '.')
    }
  } else if (props.selectedTile === props.allowedExitChar) {
    // Remove all instances of the exit char from this grid
    for (let i = 0; i < newGrid.length; i++) {
      newGrid[i] = newGrid[i].replace(props.allowedExitChar, '.')
    }
  }
  
  // Update the clicked cell
  const updatedRow = newGrid[y].split('')
  updatedRow[x] = props.selectedTile === 'eraser' ? '.' : props.selectedTile
  newGrid[y] = updatedRow.join('')
  
  emit('update:modelValue', newGrid)
}

const handleMouseEnter = (x, y) => {
  // Optional: implement drag-to-paint if mouse is held down
  // For now, just click to paint
}
</script>

<style scoped>
.grid-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.grid-title {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

.grid-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.3);
}

.grid-row {
  display: flex;
  flex: 1;
  width: 100%;
  gap: 2px;
}

.cell {
  flex: 1;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
}

.cell:hover {
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
  z-index: 1;
}

.cell.empty {
  background-color: rgba(255, 255, 255, 0.05);
}

.cell.wall {
  background-color: rgba(255, 255, 255, 0.2);
}

.cell.start {
  background-color: rgba(100, 200, 255, 0.3);
}

.cell.goal {
  background-color: rgba(255, 200, 100, 0.2);
}

.start-indicator {
  font-size: 1.2em;
  font-weight: bold;
  color: #64c8ff;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.8);
}

.exit-indicator {
  font-size: 1.2em;
  font-weight: bold;
  color: #ffc864;
  text-shadow: 0 0 10px rgba(255, 200, 100, 0.8);
}
</style>
