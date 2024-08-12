<template>
  <el-button @click="exportClick">导出</el-button>
  <div class="table">
    <el-table id="table1" :data="tableData" :span-method="objectSpanMethod" border style="width: 100%">
      <el-table-column prop="time" label="时间"/>
      <el-table-column prop="grade" label="年级"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="subjects" label="科目"/>
      <el-table-column prop="score" label="成绩"/>
    </el-table>
  </div>
</template>

<script>
import * as XLXS from 'xlsx'

export default {
  name: 'TableDemo',
  data() {
    return {
      tableData: [
        { time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '语文', score: 80 },
        { time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '数学', score: 80 },
        { time: '2020-08-10', grade: '三年一班', name: '小雷', subjects: '语文', score: 70 },
        { time: '2020-08-10', grade: '三年一班', name: '小雷', subjects: '数学', score: 80 },
        { time: '2020-08-11', grade: '三年三班', name: '小花', subjects: '语文', score: 60 },
        { time: '2020-08-11', grade: '三年三班', name: '小花', subjects: '数学', score: 60 }
      ],
      mergeObj: {},
      mergeArr: ['time', 'grade', 'name', 'subjects', 'score']
    }
  },
  methods: {
    exportClick() {
      // 设置当前日期
      const time = new Date()
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      const name = year + '' + month + '' + day
      // 导出文件名
      // 通过id，获取导出的表格数据
      const wb = XLXS.utils.table_to_book(document.getElementById('table1'), {
        raw: true
      })
      console.log(XLXS.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 2 }))
      // XLXS.writeFileXLSX(wb, name + '.xlsx')
    },
    getSpanArr(data) {
      this.mergeArr.forEach((key, index1) => {
        let count = 0 // 用来记录需要合并行的起始位置
        this.mergeObj[key] = [] // 记录每一列的合并信息
        data.forEach((item, index) => {
          // index == 0表示数据为第一行，直接 push 一个 1
          if (index === 0) {
            this.mergeObj[key].push(1)
          } else {
            // 判断当前行是否与上一行其值相等 如果相等 在 count 记录的位置其值 +1 表示当前行需要合并 并push 一个 0 作为占位
            if (item[key] === data[index - 1][key]) {
              this.mergeObj[key][count] += 1
              this.mergeObj[key].push(0)
            } else {
              // 如果当前行和上一行其值不相等
              count = index // 记录当前位置
              this.mergeObj[key].push(1) // 重新push 一个 1
            }
          }
        })
      })
    },
    // 默认接受四个值 { 当前行的值, 当前列的值, 行的下标, 列的下标 }
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 判断列的属性
      if (this.mergeArr.indexOf(column.property) !== -1) {
        // 判断其值是不是为0
        if (this.mergeObj[column.property][rowIndex]) {
          return [this.mergeObj[column.property][rowIndex], 1]
        } else {
          // 如果为0则为需要合并的行
          return [0, 0]
        }
      }
    }
  },
  mounted() {
    this.getSpanArr(this.tableData)
  }
}
</script>

<style lang="scss" scoped>
</style>
