import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: ref(0)
  }),
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
    },
    start() {
      this.count = 0
      setInterval(() => {
        this.increment()
      }, 1000)
    },
    reset() {
      this.count = 0
    }
  }
})
