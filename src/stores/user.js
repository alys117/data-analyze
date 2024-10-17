import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userinfo = ref({})
  const token = ref('')
  function setUserinfo(value) {
    userinfo.value = value
  }
  function getToken() {
    return token
  }
  function resetToken() {
    token.value = ''
  }
  function setToken(value) {
    token.value = value
  }

  function getUserinfo() {
    if (userinfo.value && userinfo.value.username) { return userinfo }
    return userinfo
  }

  function resetUserinfo() {
    userinfo.value = null
  }
  return { userinfo, token, setUserinfo, resetUserinfo, getUserinfo, resetToken, setToken, getToken }
}, { persist: true })
