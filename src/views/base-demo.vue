<script setup>
import { toRaw } from 'vue'
import { useCounterStore } from '@/stores/counter.js'
import BaseChild from '@/views/base-child.vue'

const router = useRouter()
const counter = useCounterStore()

const user = counter.userinfo
const user2 = reactive({ name: 'york', addr: 'nyc' })
const refObj = ref({ a: 123 })
const refNum = ref(5)
const reactiveObj = reactive({ a: 234 })
const reactivArr = reactive([{ a: 555 }, 'hello'])
const cloneArr = toRaw(reactivArr)
onMounted(() => {
  console.log(refObj, refNum, reactiveObj)
  console.log(reactivArr, cloneArr)
  console.log(counter)
})
const update = (n) => {
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
    case 6:
      counter.count = 4
      console.log(counter)
      break
    default:
      console.log('no match')
  }
}
</script>

<template>
  <div style="padding: 20px">
    <el-input v-model="user.name"/>
    <el-input v-model="user2.name"/>
    <div>{{ refObj }}</div>
    <div>{{ refNum }}</div>
    <div>{{ reactivArr }}</div>
    <div>{{ reactiveObj }}</div>
    <div>{{ cloneArr }}</div>
    <div>{{ counter.count }}</div>
    <div>{{ counter.userinfo }}</div>
    ----------------
    <base-child :props-user="user" />
    -----------------------
    <base-child :props-user="user2" />
    <el-button @click="update(1)" type="danger"> update1 </el-button>
    <el-button @click="update(2)" type="danger"> update2 </el-button>
    <el-button @click="update(3)" type="danger"> update3 </el-button>
    <el-button @click="update(4)" type="danger"> update4 </el-button>
    <el-button @click="update(5)" type="danger"> update5 </el-button>
    <el-button @click="update(6)" type="danger"> update6 </el-button>
    <div style="margin: 20px">
      <el-button size="default" type="primary" @click="counter.setCount(10)">setCount</el-button>
      <el-button size="default" type="primary" @click="counter.addUserinfoProps('hobby', ['suck', 'swarm'])">addUserinfoProps</el-button>
      <el-button size="default" type="primary" @click="counter.resetUserinfo({name: 'jerry', age: 1})">resetUserinfo</el-button>
      <el-button size="default" type="primary" @click="router.push('/talk')">AI-Conversation</el-button>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>
