import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStepStore = defineStore('step', () => {
  const aiConversation = ref({})
  function setAiConversation(val) {
    aiConversation.value = val
  }
  const step1 = ref({})
  function setStep1(val) {
    step1.value = val
  }
  const step2 = ref({})
  function setStep2(val) {
    step2.value = val
  }
  const step3 = ref({})
  function setStep3(val) {
    step1.value = val
  }

  return { step1, setStep1, step2, setStep2, step3, setStep3, aiConversation, setAiConversation }
}, { persist: true })
