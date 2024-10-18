import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserinfo } from '@/api/request.js'

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

  async function getUserinfo() {
    if (userinfo.value && userinfo.value.username) {
      console.log(userinfo.value, '存在userinfo')
      return userinfo
    }
    const res = await fetchUserinfo()
    if (res.username) { setUserinfo(res) }
    return userinfo
  }

  function resetUserinfo() {
    userinfo.value = null
  }
  return { userinfo, token, setUserinfo, resetUserinfo, getUserinfo, resetToken, setToken, getToken }
}, { persist: { storage: sessionStorage }})
