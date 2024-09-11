<script setup>
import { Delete } from '@element-plus/icons-vue'
import { generateID } from '@/utils/util.js'

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => {
      return null
    }
  }
})
const th = ref([])
const rows = ref([])
function handleData() {
  th.value = ['-', ...props.data.x.x_axis]
  rows.value = Object.keys(props.data.y).map((key, index) => {
    return [key]
  })
  Object.values(props.data.y).forEach((val, index) => {
    val.forEach((v, i) => {
      rows.value[index].push(v)
    })
  })
}
handleData()
console.log(th.value, rows.value)
function addRow() {
  rows.value.push(Array.from({ length: th.value.length }))
}
function addColumn() {
  th.value.push('新列' + generateID(4))
  rows.value.forEach(item => {
    item.push('')
  })
}
function deleteCol(idx) {
  th.value.splice(idx, 1)
  rows.value.forEach(item => {
    item.splice(idx, 1)
  })
}
function deleteRow(idx) {
  rows.value.splice(idx, 1)
}
watch(() => props.data, (newVal, oldVal) => {
  handleData()
})
function edit(val, idx, index, e) {
  console.log(val, e.target.innerText, val === e.target.innerText)
  rows.value[index][idx] = e.target.innerText
}
function editTH(val, idx, e) {
  console.log(val, e.target.innerText, val === e.target.innerText)
  th.value[idx] = e.target.innerText
}
function handleChange() {
  const obj = {
    x: {
      x_axis: th.value.slice(1)
    },
    y: {}
  }
  rows.value.forEach((item, idx) => {
    obj.y[item[0]] = item.slice(1)
  })
  return obj
}
defineExpose({
  handleChange
})
</script>

<template>
  <el-link @click="addRow" style="user-select: none;color: darkcyan">添加行</el-link>
  <el-link @click="addColumn" style="user-select: none;color: #2a598a; margin-left: 20px">添加列</el-link>
  <div style="overflow: auto;padding-right: 20px; user-select: none">
    <table>
      <tr style="height: 10px">
        <th v-for="(item, idx) in th" :key="item+idx" style="height: 10px">
          <el-link v-if="idx" @click="deleteCol(idx)">
            <Delete style="height: 1em"/>
          </el-link>
        </th>
        <th rowspan="2" style="width: 40px;min-width: 40px;">操作</th>
      </tr>
      <tr>
        <th v-for="(item, idx) in th" :key="item+idx">
          <div style="display: flex;align-items: center">
            <span :contenteditable="idx > 0" style="flex: 1" @blur="editTH(item, idx, $event)">{{ item }}</span>
<!--            <el-link v-if="idx" @click="deleteCol(idx)">-->
<!--              <Delete style="height: 1em"/>-->
<!--            </el-link>-->
          </div>
        </th>
      </tr>
      <tr v-for="(item, index) in rows" :key="index">
        <td v-for="(val, idx) in item" :key="val" @blur="edit(val, idx, index,$event)" contenteditable>
          {{ val }}
        </td>
        <td style="width: 40px;min-width: 40px">
          <el-link @click="deleteRow(index)">
            <Delete style="height: 1em"/>
          </el-link>
        </td>
      </tr>
    </table>
<!--    <el-button @click="console.log(th, rows)" type="success"/>-->
<!--    <el-button @click="handleChange" type="warning"/>-->
  </div>
</template>

<style scoped lang="scss">
$gray: #fcfcfc;
table {
  width: 100%;
  margin: 10px auto; /* 让表格居中 */
  border-collapse: collapse;
  border: 2px solid $gray; /* 整体边框颜色 */
}
th,
td {
  line-height: 30px; /* 行高 */
  border: 1px solid $gray; /* 每行边框 */
  text-align: center;
  font-size: 14px;
  height: 30px;
  min-width: 90px;
}
th {
  background-color: $gray; /* 表头背景色 */
  color: #000;
}
/* 这次奇偶行用 class 来写 */
tr.even {
  background-color: #eee; /* 偶数行浅灰色 */
}
tr:hover {
  background-color: $gray; /* 鼠标悬停时的背景色:蓝色 */
}
/* 把90分以上的要特殊标识绿色 */
td.perfect {
  background-color: #00ff00; /* 绿色背景 */
}
</style>
