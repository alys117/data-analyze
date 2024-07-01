<script setup>
import { reactive } from 'vue'
import * as XLXS from 'xlsx'
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
  const wb = XLXS.utils.table_to_book(document.getElementById('table'), {
    raw: true
  })
  XLXS.writeFileXLSX(wb, name + '.xlsx')
  // const wbout = XLXS.write(wb, {
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
</script>

<template>
  <div class="home">
    <button type="button" @click="exportClick()">导出</button>
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
