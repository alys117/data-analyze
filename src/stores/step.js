import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStepStore = defineStore('step', () => {
  const aiConversation = ref({})
  function setAiConversation(val) {
    aiConversation.value = val
  }
  const step1 = ref(null)
  function setStep1(val) {
    step1.value = val
  }
  const treeCache = ref(null)
  function setTreeCache(val) {
    treeCache.value = val
  }
  const outline = ref(null)
  function setOutline(val) {
    outline.value = val
  }
  return { step1, setStep1, aiConversation, setAiConversation, treeCache, setTreeCache, outline, setOutline }
}, { persist: true })
