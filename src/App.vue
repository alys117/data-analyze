<script setup>
import { ref } from 'vue'
import HandleButton from '@/components/handle-button.vue'
const drawer = ref(false)
const toggleDrawer = () => {
  drawer.value = !drawer.value
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
  <div style="display: none">
    <el-drawer
      v-model="drawer"
      :close-on-click-modal="false"
      direction="rtl"
      size="30%"
      title="Basic Drawer 抽屉标题">
      <div>
        抽屉内容
      </div>
    </el-drawer>
  </div>
  <handle-button :trigger-drawer="toggleDrawer" style="display: none"/>
</template>

<style lang="scss" scoped>
.app-container{
  //width: calc(100vw - 20px);
  //background-color: #f5f8fb;
}
</style>
