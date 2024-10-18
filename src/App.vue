<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useStepStore } from '@/stores/step.js'
import HandleButton from '@/components/handle-button.vue'
import Login from '@/views/login.vue'
import request from '@/utils/http.js'
import { logout, fetchUserinfo } from '@/api/request.js'
import Cookies from 'js-cookie'
const router = useRouter()
const drawer = ref(false)
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
const logout1 = async() => {
  const res = await logout()
  console.log(res, 'logout')
  const userStore = useUserStore()
  userStore.resetUserinfo()
  userStore.resetToken()
  const stepStore = useStepStore()
  stepStore.setStep1(null)
  stepStore.setOutline(null)
  stepStore.setAiConversation(null)
  stepStore.setTreeCache(null)
  await router.push('/403')
  drawer.value = false
}
const api = async() => {
  await fetch('/api/check_bussiness_tree', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(data => {
      console.log(data)
    })
}
const test3 = async() => {
  const res = await request('/api/test3')
  console.log(res)
}
const getUserinfo = async() => {
  const res = await fetchUserinfo()
  console.log(res)
}
const getCookie = () => {
  Cookies.remove('token')
  console.log(document.cookie)
}
</script>

<template>
  <main class="app-container">
    <router-view v-slot="{ Component }">
      <transition :name="'el-fade-in'" :mode="'out-in'">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
  <div style="display: block">
    <el-drawer
      v-model="drawer"
      :close-on-click-modal="false"
      direction="rtl"
      size="min(50%, 400px)"
      title="Basic Info">
      <div>
        <el-button type="danger" @click="logout1">登出</el-button>
        <el-button type="success" @click="getCookie">cookie</el-button>
        <el-button type="primary" @click="api">api</el-button>
        <el-divider/>
        <el-button type="primary" @click="test3">test3</el-button>
        <el-button type="primary" @click="getUserinfo">getUserinfo</el-button>
        <Login v-if="!useUserStore().token"/>
      </div>
    </el-drawer>
  </div>
  <handle-button :trigger-drawer="toggleDrawer" style="display: block"/>
</template>

<style lang="scss" scoped>
.app-container{
  //width: calc(100vw - 20px);
  //background-color: #f5f8fb;
}
</style>
