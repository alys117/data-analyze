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
              :visible="item.visible"
              placement="bottom"
              :width="200"
              trigger="click"
            >
              <template #reference>
                <el-button :type="item.input===''?'info':'primary'" link :icon="Search" @click.stop="item.visible = !item.visible"/>
              </template>
              <div>
                <el-input v-model="item.input" placeholder="请输入" size="small" />
                <div style="margin-top: 5px; display: flex; justify-content: space-between;">
                  <el-button size="small" type="primary" @click="searchItem(item)">查询</el-button>
                  <el-button size="small" @click="resetItem(item)">重置</el-button>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { ref, onMounted } from 'vue'
const tableData = ref([
  { id: 1, name: '纸巾', type: '百货', price: 30 },
  { id: 2, name: '抽纸', type: '百货', price: 18 },
  { id: 3, name: '水杯', type: '百货', price: 50 },
  { id: 4, name: '电脑', type: '数码', price: 5000 },
  { id: 5, name: '手机', type: '数码', price: 3000 },
  { id: 6, name: '平板', type: '数码', price: 2000 },
  { id: 7, name: '电视', type: '家电', price: 4000 },
  { id: 8, name: '冰箱', type: '家电', price: 6000 },
  { id: 9, name: '洗衣机', type: '家电', price: 3000 }
])
const columnList = ref([
  { label: '名称', prop: 'name', input: '', visible: false },
  { label: '类型', prop: 'type', input: '', visible: false },
  { label: '价格', prop: 'price', input: '', visible: false }
])
onMounted(() => {
  // 页面加载完成执行拖拽函数
  rowDrop()
  columnDrop()
})
// 列查询
const searchItem = (item) => {
  item.visible = false
  console.log(item)
}
// 列查询重置
const resetItem = (item) => {
  item.visible = false
  item.input = ''
  console.log(item)
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
</script>
<style lang='scss' scoped>
.container {
  height: 100vh;
  .dragbox {
    height: 100%;
  }
}
</style>
