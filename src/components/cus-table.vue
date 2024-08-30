<script setup>
import { ref, reactive, onMounted } from 'vue'
import VxeUIExport from 'vxe-pc-ui'
const { tableInfo } = defineProps({
  tableInfo: {
    type: Object,
    default: () => {}
  }
})

onMounted(() => {
  setTimeout(() => {
    dealGrid(tableInfo)
  }, 600)
})

// 下面是对表格的操作 ！！！
const cusTableContent = ref()
const xGrid = ref()
const gridOptions = reactive({
  border: true,
  loading: false,
  height: 308,
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
const dealGrid = (info) => {
  gridOptions.columns = []
  for (const key in info['所需字段']) {
    gridOptions.columns.push({ field: key, title: info['所需字段'][key], width: crudStore.getWidth('所需字段') })
  }
  // delete gridOptions.columns.at(-1).width
  gridOptions.data = []
  info['样例数据'].forEach((item, index) => {
    gridOptions.data.push(item)
  })
}
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
      // console.log(column.field)
      column.field && useField.push(column.field)
    })
    VxeUIExport.modal.message('使用的字段：' + $grid.getTableColumn().tableColumn.map(i => i.title).join(', '))
    return useField
  },
  getWidth: (type) => {
    const containerWidth = cusTableContent.value.offsetWidth
    const len = Object.keys(tableInfo[type]).length
    let width = Math.floor(containerWidth / len)
    width = width < 100 ? 100 : width
    return width
  },
  onLoadData: (type) => {
    gridOptions.columns = []
    for (const key in tableInfo[type]) {
      gridOptions.columns.push({ field: key, title: tableInfo[type][key], width: crudStore.getWidth(type) })
    }
    // delete gridOptions.columns.at(-1).width
  },
  /** 更多自定义方法 */
  moreFn: () => {
    console.log('moreFn')
  }
})
defineExpose({ getUseFields: crudStore.onSubmit })
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
</script>

<template>
  <div ref="cusTableContent" class="cus-table-content">
    <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <div class="toolbar">
          <vxe-button size="mini" status="success" icon="vxe-icon-square-checked-fill" @click="crudStore.onSubmit()">使用</vxe-button>
          <vxe-button size="mini" status="primary" icon="vxe-icon-lightning" @click="crudStore.onLoadData('表的所有字段')">全部字段</vxe-button>
          <vxe-button size="mini" status="primary" icon="vxe-icon-lightning" @click="crudStore.onLoadData('所需字段')">推荐字段</vxe-button>
          <span style="margin-left: 10px;font-weight: 900;font-size: 18px">{{ tableInfo['中文名'] +'~'+ tableInfo['表名'] }}</span>
        </div>
      </template>
    </vxe-grid>
  </div>
</template>

<style scoped lang="scss">
.cus-table-content{
  //width: 50%;
}
.toolbar{
  display: flex;
  align-items: center;
}
</style>
