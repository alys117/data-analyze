<script setup>
import { reactive } from 'vue'
import * as XLSX from 'xlsx-js-style'
import FileSaver from 'file-saver'
defineProps({
  msg: String
})
const state = reactive({
  excelTitle: '表格标题1'
})
const tableData = reactive([
  {
    date: '2016-05-02',
    name: '安欣',
    address: '上海市 1518 路'
  },
  {
    date: '2016-05-04',
    name: '高启强',
    address: '上海市 1517 路'
  },
  {
    date: '2016-05-01',
    name: '高启盛',
    address: '上海市 1519 路'
  },
  {
    date: '2016-05-03',
    name: '唐小虎',
    address: '上海市 1516 路'
  }
])
const exportClick = () => {
  // 设置当前日期
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const name = year + '' + month + '' + day
  // 导出文件名
  // 通过id，获取导出的表格数据
  const wb = XLSX.utils.table_to_book(document.getElementById('table'), {
    raw: true
  })
  const ws = XLSX.utils.json_to_sheet([{ a: 123, b: 456 }, { a: 789, b: 101112 }, { b: 123 }])
  ws['!cols'] = [
    {
      wpx: 150,
      alignment: { horizontal: 'center', vertical: 'center' }
    },
    {
      wpx: 100
    }
  ]
  ws['A1'].s = {
    font: { bold: true, color: { rgb: 'ff1222' }},
    alignment: { horizontal: 'center' },
    fill: { fgColor: { rgb: '87CEEB' }}
  }
  ws['B1'].s = {
    font: { bold: true, color: { rgb: 'ff1222' }},
    alignment: { horizontal: 'center', vertical: 'center' },
    fill: { fgColor: { rgb: 'f1f1f1' }}
  }
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
  XLSX.writeFileXLSX(wb, name + '.xlsx')

  // const wbout = XLSX.write(wb, {
  //   bookType: 'xlsx',
  //   bookSST: true,
  //   type: 'array'
  // })
  // try {
  //   FileSaver.saveAs(
  //     new Blob([wbout], {
  //       type: 'application/octet-stream'
  //     }),
  //     name + '.xlsx'
  //   )
  // } catch (e) {
  //   console.log(e)
  // }
  // return wbout
}
function exportExcel2() {
  // 定义要导出的数据
  const data = [
    { name: 'John', age: 20, country: 'USA' },
    { name: 'Jane', country: 'Canada' },
    { name: 'Bob', age: 35 }
  ]
  // 将数据转换为Excel格式
  const ws = XLSX.utils.json_to_sheet(data)
  // 合并单元格
  ws['!merges'] = [{ s: { r: 1, c: 1 }, e: { r: 2, c: 1 }}, { s: { r: 2, c: 2 }, e: { r: 3, c: 2 }}]
  // 将工作表添加到工作簿
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  // 导出Excel文件
  XLSX.writeFile(wb, 'data.xlsx')
}
</script>

<template>
  <div class="home">
    <button type="button" @click="exportClick()">导出</button>
    <button type="button" @click="exportExcel2()">导出2</button>
    <div id="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="address" label="地址" width="180"/>
      </el-table>
    </div>
  </div>
</template>

<style scoped>

</style>
