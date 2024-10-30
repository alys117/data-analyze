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
const remove = async() => {
  const res = await request('/api/remove/token')
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
const storeComponents = reactive(new Map())
// 原组件包里面
function formatComponent(component, route) {
  let afterComponent
  if (component) {
    const path = route.path
    if (storeComponents.has(path)) {
      afterComponent = storeComponents.get(path)
    } else {
      afterComponent = {
        name: path,
        render() {
          return h(component)
        }
      }
      // cacheRoutes.push(path) //进行缓存
      storeComponents.set(path, afterComponent)
    }
    console.log([...storeComponents.keys()], 'afterComponent')
    return h(afterComponent)
  }
}
</script>

<template>
  <main class="app-container">
    <router-view v-slot="{ Component, route }">
      <transition :name="'el-fade-in'" :mode="'out-in'">
        <keep-alive :include="[...storeComponents.keys()]">
          <component :is="formatComponent(Component, route)" />
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
        <el-button type="danger" @click="remove">remove</el-button>
        <el-button type="success" @click="getCookie">cookie</el-button>
        <el-button type="primary" @click="api">api</el-button>
        <el-divider/>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <el-button type="primary" @click="test3">test3</el-button>
          <el-button type="primary" @click="getUserinfo">getUserinfo</el-button>
          <el-button type="primary" @click="router.push('/test/1')">push test1</el-button>
          <el-button type="primary" @click="router.push('/test/2')">push test2</el-button>
          <el-button type="primary" @click="router.push('/')">push /</el-button>
        </div>
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
