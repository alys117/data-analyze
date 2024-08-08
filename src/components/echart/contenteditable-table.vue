<script setup>
import { Delete } from '@element-plus/icons-vue'
import { generateID } from '@/utils/util.js'

const props = defineProps({
  rows: {
    type: Object,
    required: false,
    default: () => {
      return null
    }
  }
})
const { rows } = toRefs(props)
function handleData(data) {
  console.log(data)
}
const fakeTR = ref([
  ['2010', '01', '23', 'jun'],
  ['shen', 'xiao', 'jun', 'jun'],
  ['shen', 'xiao', 'jun', 'jun']
])
const fakeTH = ref(['www.dreamdu.com', 'www.dreamdu.com', 'biaotou', 'biaotou'])
function addRow() {
  fakeTR.value.push(Array.from({ length: fakeTH.value.length }))
}
function addColumn() {
  fakeTH.value.push('新列' + generateID(4))
  fakeTR.value.forEach(item => {
    item.push('')
  })
}
function deleteCol(idx) {
  fakeTH.value.splice(idx, 1)
  fakeTR.value.forEach(item => {
    item.splice(idx, 1)
  })
}
function deleteRow(idx) {
  fakeTR.value.splice(idx, 1)
}
</script>

<template>
  <el-link @click="addRow">添加行</el-link>
  <el-link @click="addColumn">添加列</el-link>
  <table>
    <tr contenteditable>
      <th v-for="(item, idx) in fakeTH" :key="item">
        {{ item }}
        <el-link @click="deleteCol(idx)">
          <Delete style="height: 1em"/>
        </el-link>
      </th>
      <th style="width: 40px">操作</th>
    </tr>
    <tr v-for="(item, index) in fakeTR" :key="index" contenteditable>
      <td v-for="i in item" :key="i">
        {{ i }}
      </td>
      <td style="width: 40px">
        <el-link @click="deleteRow(index)">
          <Delete style="height: 1em"/>
        </el-link>
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  margin: 10px auto; /* 让表格居中 */
  border-collapse: collapse;
  border: 2px solid #f1f1f1; /* 整体边框颜色 */
}
th,
td {
  line-height: 40px; /* 行高 */
  border: 1px solid #f1f1f1; /* 每行边框 */
  text-align: center;
  font-size: 16px;
  height: 40px;
  min-width: 30px;
}
th {
  background-color: #f1f1f1; /* 表头背景色 */
  color: #000;
}
/* 这次奇偶行用 class 来写 */
tr.even {
  background-color: #eee; /* 偶数行浅灰色 */
}
tr:hover {
  background-color: #f1f1f1; /* 鼠标悬停时的背景色:蓝色 */
}
/* 把90分以上的要特殊标识绿色 */
td.perfect {
  background-color: #00ff00; /* 绿色背景 */
}
</style>
