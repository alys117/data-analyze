<template>
  <div class='container'>
    <div class="dragbox">
      <el-table row-key="id" :data="tableData" :border="true">
        <el-table-column
          v-for="item in columnList"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          sortable
        >
          <template #header>
            {{item.label}}
            <el-popover
              :ref="el => setRef(el, item)"
              :visible="item.visible"
              placement="bottom"
              :width="200"
              trigger="click"
            >
              <template #reference>
                <el-button :type="item.input===''?'info':'primary'" link :icon="Search" @click.stop="handleSearch(item)" v-click-outside="e=>onClickOutside(e, item)"/>
              </template>
              <div>
                <el-input v-model="item.input" placeholder="请输入" size="small" />
                <div style="margin-top: 5px; display: flex; justify-content: space-between;">
                  <el-button size="small" type="primary" @click="searchItem(item)">合并</el-button>
                  <el-button size="small" @click="resetItem(item)">重置</el-button>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button @click="showInfo"> ddd </el-button>
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import Sortable from 'sortablejs'
import { ref, unref, onMounted, nextTick } from 'vue'
const popoverRefs = {}
const setRef = (el, item) => {
  el ? popoverRefs[item.prop] = el : delete popoverRefs[item.prop]
}
const onClickOutside = (e, item) => {
  item.visible = unref(popoverRefs[item.prop]).popperRef.contentRef.contains(e.target)
}
const tableData = ref([
  { id: 1, name: '纸巾', type: '百货', price: 30, address: '北京' },
  { id: 2, name: '抽纸', type: '百货', price: 18, address: '上海' },
  { id: 3, name: '水杯', type: '百货', price: 50, address: '广州' },
  { id: 4, name: '电脑', type: '数码', price: 5000, address: '深圳' },
  { id: 5, name: '手机', type: '数码', price: 3000, address: '杭州' },
  { id: 6, name: '平板', type: '数码', price: 2000, address: '南京' },
  { id: 7, name: '电视', type: '家电', price: 4000, address: '武汉' },
  { id: 8, name: '冰箱', type: '家电', price: 6000, address: '成都' },
  { id: 9, name: '洗衣机', type: '家电', price: 3000, address: '重庆' }
])
const columnList = ref([
  { label: '名称', prop: 'name', input: '', visible: false },
  { label: '类型', prop: 'type', input: '', visible: false },
  { label: '地址', prop: 'address', input: '', visible: false },
  { label: '价格', prop: 'price', input: '', visible: false }
])
onMounted(() => {
  // 页面加载完成执行拖拽函数
  rowDrop()
  columnDrop()
})
//
const handleSearch = (item) => {
  columnList.value.forEach(item => {
    item.visible = false
  })
  item.input = ''
  item.visible = !item.visible
}
// 列合并
const searchItem = (item) => {
  console.log(item)
  const index = columnList.value.findIndex(i => i.prop === item.prop)
  const itemAfter = columnList.value[index + 1]
  if (itemAfter === undefined) return
  tableData.value.forEach(i => {
    i[item.prop + '_origin'] = i[item.prop + '_origin'] || i[item.prop]
    i[item.prop] = i[item.prop] + item.input + i[itemAfter.prop]
  })
  item.visible = false
}
// 列查询重置
const resetItem = (item) => {
  console.log(tableData.value)
  tableData.value.forEach(i => {
    i[item.prop] = i[item.prop + '_origin'] || i[item.prop]
  })
  item.visible = false
  item.input = ''
}
// 行拖拽
const rowDrop = () => {
  const tbody = document.querySelector('.dragbox .el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    draggable: '.dragbox .el-table__row',
    onEnd(evt) {
      const currRow = tableData.value.splice(evt.oldIndex, 1)[0]
      tableData.value.splice(evt.newIndex, 0, currRow)
      console.log(tableData.value)
    }
  })
}
// 列拖拽
const columnDrop = () => {
  const tr = document.querySelector('.dragbox .el-table__header-wrapper tr')
  Sortable.create(tr, {
    animation: 150,
    delay: 0,
    onEnd: (evt) => {
      const oldItem = columnList.value[evt.oldIndex]
      columnList.value.splice(evt.oldIndex, 1)
      columnList.value.splice(evt.newIndex, 0, oldItem)
      console.log(columnList.value)
    }
  })
}
const showInfo = () => {
  columnList.value = columnList.value.filter(i => i.prop !== 'address')
  // columnList.value.push({ label: '类型', prop: 'type', input: '', visible: false })
  console.log(popoverRefs, columnList.value)
}
</script>
<style lang='scss' scoped>
.container {
  //height: 100vh;
  .dragbox {
    height: 100%;
  }
}
</style>
