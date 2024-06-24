<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { VXETable } from 'vxe-table'
const { allData } = defineProps({
  allData: {
    type: Object,
    default: () => {}
  }
})
const options = ref([
  { label: 'prop传入', value: 'prop实际值' },
  { label: '选项1', value: '黄金糕' },
  { label: '选项2', value: '双皮奶' },
  { label: '选项5', value: '北京烤鸭' }
])
watch(
  () => allData,
  (newData, oldData) => {
    console.log(newData, oldData)
  })

onMounted(() => {
  console.log(allData, 111)
  for (const tableName in allData) {
    console.log(tableName)
    options.value.push({ label: tableName, value: tableName })
  }
})

const tableValue = ref('')
const xGrid = ref()
const gridOptions = reactive({
  border: true,
  loading: false,
  height: 300,
  size: 'small',
  columns: [],
  data: [],
  columnConfig: {
    resizable: true
  },
  exportConfig: {},
  /** 工具栏配置 */
  toolbarConfig: {
    refresh: true,
    custom: true,
    export: true,
    zoom: true,
    slots: { buttons: 'toolbar-btns' }
  }
})
gridOptions.loading = true
setTimeout(() => {
  gridOptions.loading = false
  // 列配置
  gridOptions.columns = [
    { type: 'seq', width: 50, title: '序号' },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'role', title: 'Role' },
    { field: 'address', title: 'Address' }
  ]
  // 数据列表
  gridOptions.data = [
    { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
    { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
    { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
    { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
  ]
}, 500)

// #region 增删改查
const crudStore = reactive({
  /** 表单类型，true 表示修改，false 表示新增 */
  isUpdate: true,
  /** 点击显示弹窗 */
  onSubmit: () => {
    const $grid = xGrid.value
    const useField = []
    $grid.getColumns().forEach((column) => {
      console.log(column.field)
      column.field && useField.push(column.field)
    })
    VXETable.modal.message('使用的字段：' + useField.join(', '))
  },
  /** 更多自定义方法 */
  moreFn: () => {}
})

const gridEvents = {
  toolbarToolClick({ code }) {
    const $grid = xGrid.value
    if ($grid) {
      switch (code) {
        case 'pan': {
          console.log(code)
          break
        }
      }
    }
  }
}

const copy = (value, mes) => {
  ElMessage({
    type: 'success',
    message: mes
  })
}
</script>

<template>
  <div class="cus-table-head">
    <div class="left-label">请选择</div>
    <el-select v-model="tableValue" placeholder="请选择" style="width: 500px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div class="cus-table-content">
    <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <div class="toolbar">
          <vxe-button size="mini" status="success" icon="vxe-icon-square-checked-fill" @click="crudStore.onSubmit()">使用</vxe-button>
          <vxe-button size="mini" status="primary" icon="vxe-icon-lightning" @click="copy('收拾收拾', '已复制')">待定</vxe-button>
          <vxe-input  size="mini" v-model="tableValue" placeholder="只读的" suffix-icon="vxe-icon-warning-triangle-fill" readonly/>
        </div>
      </template>
    </vxe-grid>
  </div>
</template>

<style scoped lang="scss">
.cus-table-head{
  display: flex;
  align-items: center;
  justify-content: left;
  .left-label{
    margin-right: 20px;
  }
}
.cus-table-content{
  //width: 50%;
}
.toolbar{
  display: flex;
  gap: 10px;
}
</style>
