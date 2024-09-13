<template>
  <button type="button" @click="exportClick()">导出</button>
  <div id="table4">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="date" label="Date" sortable />
      <el-table-column prop="name" label="Name" sortable />
      <el-table-column prop="address" label="Address" sortable />
    </el-table>
  </div>
</template>
<script lang="js" setup>
import * as XLSX from 'xlsx-js-style'

const exportClick = () => {
  // 设置当前日期
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const name = year + '' + month + '' + day
  // 导出文件名
  // 通过id，获取导出的表格数据
  const wb = XLSX.utils.table_to_book(document.getElementById('table4'), {
    raw: true
  })
  XLSX.writeFileXLSX(wb, name + '.xlsx')
}

const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu'

      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu'
      }
    ]
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
