<template>
  <main class="editor-view">
    <div class="editor-header">
      <h1>🎨 Level Editor</h1>
      <button class="back-button" @click="$router.push('/')">← Back to Game</button>
    </div>

    <div class="editor-controls">
      <div class="control-group">
        <label for="level-name">Level Name:</label>
        <input id="level-name" v-model="level.name" type="text" placeholder="My Level" />
      </div>

      <div class="control-group">
        <label for="difficulty">Difficulty:</label>
        <input id="difficulty" v-model.number="level.difficulty" type="number" min="1" max="5" />
      </div>

      <div class="control-group">
        <label for="time-limit">Time Limit (seconds):</label>
        <input id="time-limit" v-model.number="level.timeLimit" type="number" min="10" max="300" />
      </div>
    </div>

    <div class="tile-palette">
      <h3>Select Tile:</h3>
      <div class="palette-buttons">
        <button
          v-for="tile in tiles"
          :key="tile.value"
          :class="['tile-button', { active: selectedTile === tile.value }]"
          @click="selectedTile = tile.value"
          :title="tile.label"
        >
          {{ tile.icon }}
        </button>
      </div>
    </div>

    <div class="grids-container">
      <GridEditor
        v-model="level.grid1"
        :selected-tile="selectedTile"
        title="Grid 1 (Player A)"
        allowed-start-char="A"
        allowed-exit-char="1"
      />
      <GridEditor
        v-model="level.grid2"
        :selected-tile="selectedTile"
        title="Grid 2 (Player B)"
        allowed-start-char="B"
        allowed-exit-char="2"
      />
    </div>

    <div class="export-section">
      <h3>Export Level</h3>
      <div class="export-buttons">
        <button class="export-btn" @click="exportJSON">Export JSON</button>
        <button class="export-btn" @click="copyToClipboard">Copy to Clipboard</button>
        <button class="export-btn" @click="importJSON">Import JSON</button>
        <button class="export-btn" @click="clearLevel">Clear Level</button>
      </div>
      <div v-if="exportedJSON" class="json-output">
        <label>JSON Output:</label>
        <textarea
          v-model="exportedJSON"
          readonly
          rows="15"
          class="json-textarea"
        ></textarea>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import GridEditor from '@/components/GridEditor.vue'

// Initialize empty 12x12 grid
const createEmptyGrid = () => {
  return Array(12).fill('............')
}

const level = reactive({
  name: 'New Level',
  difficulty: 1,
  timeLimit: 30,
  grid1: createEmptyGrid(),
  grid2: createEmptyGrid()
})

const selectedTile = ref('.')
const exportedJSON = ref('')

const tiles = [
  { value: '.', label: 'Floor', icon: '⬜' },
  { value: '#', label: 'Wall', icon: '⬛' },
  { value: 'A', label: 'Player A Start', icon: 'A' },
  { value: 'B', label: 'Player B Start', icon: 'B' },
  { value: '1', label: 'Exit 1', icon: '1' },
  { value: '2', label: 'Exit 2', icon: '2' },
  { value: 'eraser', label: 'Eraser', icon: '🗑️' }
]

const exportJSON = () => {
  const exportObj = {
    name: level.name,
    difficulty: level.difficulty,
    timeLimit: level.timeLimit,
    grid1: level.grid1,
    grid2: level.grid2
  }
  exportedJSON.value = JSON.stringify(exportObj, null, 2)
}

const copyToClipboard = async () => {
  if (!exportedJSON.value) {
    exportJSON()
  }
  
  try {
    await navigator.clipboard.writeText(exportedJSON.value)
    alert('JSON copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
    alert('Failed to copy to clipboard. Please copy manually from the textarea.')
  }
}

const importJSON = () => {
  const jsonStr = prompt('Paste the JSON level data here:')
  if (!jsonStr) return
  
  try {
    const imported = JSON.parse(jsonStr)
    level.name = imported.name || 'Imported Level'
    level.difficulty = imported.difficulty || 1
    level.timeLimit = imported.timeLimit || 30
    level.grid1 = imported.grid1 || createEmptyGrid()
    level.grid2 = imported.grid2 || createEmptyGrid()
    exportedJSON.value = ''
    alert('Level imported successfully!')
  } catch (err) {
    alert('Invalid JSON format. Please check your input.')
    console.error('Import error:', err)
  }
}

const clearLevel = () => {
  if (confirm('Are you sure you want to clear the current level?')) {
    level.name = 'New Level'
    level.difficulty = 1
    level.timeLimit = 30
    level.grid1 = createEmptyGrid()
    level.grid2 = createEmptyGrid()
    exportedJSON.value = ''
    selectedTile.value = '.'
  }
}
</script>

<style scoped>
.editor-view {
  min-height: 100vh;
  background: #111;
  color: white;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.editor-header h1 {
  margin: 0;
  font-size: 2rem;
}

.back-button {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.editor-controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: bold;
  font-size: 0.9rem;
}

.control-group input {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

.control-group input:focus {
  outline: none;
  border-color: rgba(100, 200, 255, 0.8);
}

.tile-palette {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.tile-palette h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.palette-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tile-button {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  min-width: 60px;
}

.tile-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.tile-button.active {
  background: rgba(100, 200, 255, 0.3);
  border-color: rgba(100, 200, 255, 0.8);
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
}

.grids-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.export-section {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.export-section h3 {
  margin-top: 0;
}

.export-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.export-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(100, 200, 255, 0.2);
  border: 1px solid rgba(100, 200, 255, 0.5);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
}

.export-btn:hover {
  background: rgba(100, 200, 255, 0.4);
  transform: translateY(-2px);
}

.json-output {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.json-output label {
  font-weight: bold;
}

.json-textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  resize: vertical;
}

@media (max-width: 768px) {
  .editor-view {
    padding: 1rem;
  }

  .editor-controls {
    flex-direction: column;
    gap: 1rem;
  }

  .grids-container {
    flex-direction: column;
  }

  .export-buttons {
    flex-direction: column;
  }
}
</style>
