<script setup>
import noPermission from '@/assets/403.svg'
</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center;flex-direction: column">
    <img width="350" :src="noPermission" alt="" />
    <div style="color: #909399">您无权访问此页面，请重新登陆。</div>
  </div>
</template>

<style scoped lang="scss">

</style>
