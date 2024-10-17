<script setup>
import notFound from '@/assets/404.svg'
</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center;flex-direction: column">
    <img width="350" :src="notFound" alt="" />
    <div style="color: #909399">抱歉，您访问的页面不存在。</div>
  </div>
</template>

<style scoped lang="scss">

</style>
