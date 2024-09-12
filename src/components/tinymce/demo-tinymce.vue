<template>
  <div class="home">
    <el-link type="primary" @click="getValue" style="margin-bottom: 10px">{{ !show?'编辑':'展示'}}</el-link>
    <my-editor v-if="show" v-model="myValue" placeholder="请输入..."/>
    <div v-if="!show" v-html="myValue"></div>
  </div>
</template>

<script setup>
import MyEditor from '@/components/tinymce/index.vue'
const show = defineModel('show', { type: Boolean, default: false })
const myValue = defineModel('description', { type: String, default: '' })
function getValue() {
  console.log(myValue.value)
  show.value = !show.value
}
defineExpose({
  getValue
})
</script>
