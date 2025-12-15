import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: ref(0),
    leftTimer: ref(60),
    timer: null
  }),
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
      this.leftTimer--
      if (this.leftTimer === 0) {
        this.g
      }
      console.log(`Count is now: ${this.count}`)
    },
    start() {
      this.count = 0
      console.log('Counter started')
      this.timer = setInterval(() => {
        this.increment()
      }, 1000)
    },
    reset() {
      this.count = 0
      console.log('Counter reset')
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
})
