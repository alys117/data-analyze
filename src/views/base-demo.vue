<script setup>
import { toRaw } from 'vue'

const refObj = ref({a:123})
const refNum = ref(5)
const reactiveObj = reactive({a:234})
const reactivArr = reactive([{a:555},'hello'])
const cloneArr = toRaw(reactivArr)
onMounted(()=>{
  console.log(refObj,refNum,reactiveObj)
  console.log(reactivArr, cloneArr)
})
const update = (n)=>{
  switch (n) {
    case 1:
      refObj.value.b = 3333
      break
    case 2:
      refNum.value = 8
      break
    case 3:
      reactiveObj.newProperty = 'new add'
      break
    case 4:
      reactivArr.length = 7
      console.log(reactivArr)
      break
    case 5:
      cloneArr.length = 4
      console.log(cloneArr)
      break
    default:
      console.log('no match')
  }
}
</script>

<template>
  <div style="padding: 20px">

    <div>{{ refObj }}</div>
    <div>{{ refNum }}</div>
    <div>{{ reactivArr }}</div>
    <div>{{ reactiveObj }}</div>
    <div>{{ cloneArr }}</div>
    <el-button @click="update(1)" type="danger"> update1 </el-button>
    <el-button @click="update(2)" type="danger"> update2 </el-button>
    <el-button @click="update(3)"type="danger"> update3 </el-button>
    <el-button @click="update(4)" type="danger"> update4 </el-button>
    <el-button @click="update(5)" type="danger"> update5 </el-button>
  </div>
</template>

<style scoped lang="scss">

</style>
