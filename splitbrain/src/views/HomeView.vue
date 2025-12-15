<script setup>
import GridArea from '@/components/GridArea.vue';
import StartButton from '@/components/StartButton.vue';
import ResetButton from '@/components/ResetButton.vue';
import { useGameStore } from '@/stores/game';
import { useCounterStore } from '@/stores/counter';
</script>

<template>
  <main>
    <h1>🧠 Split Brain</h1>
    <div id="info-bar">
      <span id="timer">⏱️ {{ useCounterStore().count }}s</span> | <span id="level">Level 1 / 2</span> |
      <span id="countdown">⏳ {{ useCounterStore().leftTimer }} s remaining</span> |
      <span id="totalTime">Total time : 0s</span>
    </div>
    <div id="instructions" class="instructions">
      <h2>🎮 Controls</h2>
      <p>
        <strong>Player 1 (left)</strong> : Z (up), Q (left), S (down), D (right)
      </p>
      <p><strong>Player 2 (right)</strong> : Arrow keys ← ↑ ↓ →</p>
    </div>
    <StartButton v-if="!useGameStore().isPlaying"/>
    <ResetButton v-else/>
    <div class="grid-container">
      <div id="left" class="grid">
        <GridArea />
      </div>
      <div id="right" class="grid">
        <GridArea />
      </div>
    </div>
    <audio id="win-sound" src="win.mp3" preload="auto"></audio>
  </main>
</template>
