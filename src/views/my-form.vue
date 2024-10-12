<template>
  <el-form :inline="true" :model="formInline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select
        v-model="formInline.region"
        placeholder="Activity zone"
        clearable
      >
        <el-option v-for="item in formInline.options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="Pick a date"
        clearable
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <span> {{abc}}</span>
  <span> {{bcd}}</span>
</template>

<script setup>
const bcd = defineModel('bcd')
const formInline = defineModel('abc')

const onSubmit = () => {
  console.log('submit!')
}
</script>

