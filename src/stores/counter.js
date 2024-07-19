import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const userinfo = ref({})
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  function setCount(value) {
    count.value = value
  }
  function setUserinfo(value) {
    userinfo.value = value
  }
  return { count, doubleCount, increment, setCount, userinfo, setUserinfo }
},{ persist: true })
