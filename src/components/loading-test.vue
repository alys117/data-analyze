<script setup>
const tip = ref('loading...')
const count = ref(1)
setInterval(() => {
  count.value++
  tip.value = 'loading...' + count.value
}, 1000)
</script>

<template>
  <div>
    <h1>loading-test {{ tip }}</h1>
  </div>
</template>

<style scoped lang="scss">

</style>
