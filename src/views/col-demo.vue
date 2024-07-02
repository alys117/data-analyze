<template>
  <div>
    <drag-head :head-columns="tableHead" :data="tableData"/>
  </div>
</template>
<script>
import DragHead from './drag-head.vue'

export default {
  name: 'DragHeadCase',

  components: { DragHead },

  data() {
    return {
      tableHead: [
        {
          label: '零零',
          prop: 'v0',
          width: 150
        },
        {
          label: '一一',
          prop: 'v1',
          width: 150
        },
        {
          label: '二二',
          prop: 'v2',
          width: 150
        },
        {
          label: '三三',
          prop: 'v3',
          width: 150
        },
        {
          label: '四四',
          prop: 'v4',
          width: 300
        },
        {
          label: '五五',
          prop: 'v5'
        },
        {
          label: '六六',
          prop: 'v6'
        },
        {
          label: '七七',
          prop: 'v7'
        },
        {
          label: '八八',
          prop: 'v8'
        },
        {
          label: '九九',
          prop: 'v9'
        }
      ],

      tableData: [
        {
          v0: '2016-05-02',
          v1: '王小虎',
          v2: '上海',
          v3: '普陀区',
          v4: '上海市普陀区金沙江路 1518 弄',
          v5: 200333,
          v6: '2016-05-02',
          v7: '王小虎',
          v8: '上海',
          v9: '普陀区'
        },
        {
          v0: '2016-05-02',
          v1: '王小虎',
          v2: '上海',
          v3: '普陀区',
          v4: '上海市普陀区金沙江路 1518 弄',
          v5: 200333,
          v6: '2016-05-02',
          v7: '王小虎',
          v8: '上海',
          v9: '普陀区'
        },
        {
          v0: '2016-05-02',
          v1: '王小虎',
          v2: '上海',
          v3: '普陀区',
          v4: '上海市普陀区金沙江路 1518 弄',
          v5: 200333,
          v6: '2016-05-02',
          v7: '王小虎',
          v8: '上海',
          v9: '普陀区'
        },
        {
          v0: '2016-05-02',
          v1: '王小虎',
          v2: '上海',
          v3: '普陀区',
          v4: '上海市普陀区金沙江路 1518 弄',
          v5: 200333,
          v6: '2016-05-02',
          v7: '王小虎',
          v8: '上海',
          v9: '普陀区'
        },
        {
          v0: '2016-05-02',
          v1: '王小虎',
          v2: '上海',
          v3: '普陀区',
          v4: '上海市普陀区金沙江路 1518 弄',
          v5: 200333,
          v6: '2016-05-02',
          v7: '王小虎',
          v8: '上海',
          v9: '普陀区'
        }
      ]
    }
  }
}
</script>
