import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
      console.log(`Count is now: ${this.count}`)
    },
    start() {
      this.count = 0
      console.log('Counter started')
      setInterval(() => {
        this.increment()
      }, 1000)
    },
    reset() {
      this.count = 0
    }
  }
})
