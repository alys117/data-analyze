<template>
  <div style="width: 1000px">
    <el-table
      ref="elTable"
      border
      style="width: 100%"
      :data="tableData"
      :key="headKey"
      :cell-class-name="cellClassName"
      :header-cell-class-name="cellClassName"
    >
      <!-- 循环表头 -->
      <template v-for="(col, index) in tableHead" :key="index">
        <el-table-column
          :fixed="!index"
          :prop="col.prop"
          :align="col.align || 'center'"
          :width="col.width || 100"
        >
          <!-- 通过插槽为表头绑定mousedown和dragover方法 -->
          <template v-slot:header="{ column, $index }" >
            <div
              style="cursor: move"
              @mousedown="handleMouseDown($event, column, $index)"
              @dragover="handleDragover($event, column, $index)">
              <span>
                {{ col.label }}
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    headColumns: Array,
    data: Array
  },

  mounted() {
    /** 备用操作（如果需要对headColumns数组操作） */
    this.tableHead = this.headColumns
    this.tableData = this.data
    // console.log(this.tableHead)
  },

  data() {
    return {
      tableHead: [],
      tableData: [],

      // 拖拽状态
      dragState: {
        start: -3, // 起始元素的 index 防止初始化cellStyle时序号、展开等默认样式改变，最好小于-3
        end: -3, // 移动鼠标时所覆盖的元素 index
        dragging: false, // 是否正在拖动
        direction: undefined // 拖动方向
      },

      headKey: 'dragHead', // 表头数组变换位置时，重绘table（不更新该值，表头数组变化时，页面不会改变）

      scrollX: 0 // 初始x轴scroll位置（用于定位X轴滚动条）
    }
  },

  methods: {
    /** 鼠标摁下触发 */
    handleMouseDown(e, column, $index) {
      console.log(e)
      this.dragState.dragging = true
      this.dragState.start = parseInt($index)
      // 添加鼠标抬起事件  消除鼠标摁下立刻松开问题
      document.addEventListener('mouseup', this.handleMouseUp)
      // 添加拖拽结束事件
      document.addEventListener('dragend', this.handleMouseUp)

      // 对选中的表头允许其拖拽
      const dragClass = '.el-table__header-wrapper .' + column.id
      const dragDom = document.querySelectorAll(dragClass)
      dragDom.forEach((dom) => {
        // 允许表头块可以被拖拽 draggable 属性 不允许拖拽dragover等相关拖拽事件无法触发
        dom.setAttribute('draggable', true)
      })
    },

    /** 鼠标在拖拽移动时触发 */
    handleDragover(e, column, $index) {
      console.log(e, column)
      if (this.dragState.dragging) {
        // 获取当前滚动条的位置
        const scrollDom = this.$refs.elTable.$refs.bodyWrapper
        this.scrollX = scrollDom.scrollLeft
        const index = parseInt($index) // 记录起始列
        /** 实时更改鼠标处于表头的位置 */
        if (index - this.dragState.start !== 0) {
          this.dragState.direction =
            index - this.dragState.start < 0 ? 'left' : 'right' // 判断拖动方向
          this.dragState.end = parseInt($index)
        } else {
          this.dragState.end = this.dragState.start
          this.dragState.direction = null
        }
      }
    },

    /** 鼠标抬起或拖拽结束触发 */
    handleMouseUp() {
      // 更新拖拽后的表头
      this.headDragged(this.dragState)
      const { end } = this.dragState
      // 初始化拖动状态
      this.dragState = {
        start: end, // 记录最后拖动的位置
        end: -9,
        dragging: false,
        direction: undefined
      }
      document.removeEventListener('mouseup', this.handleMouseUp)
      document.removeEventListener('dragend', this.handleMouseUp)

      setTimeout(() => {
        // 重置拖拽状态
        this.dragState.start = -9
      }, 10)
    },

    // 更新拖拽后的表头
    headDragged({ start, end, direction }) {
      if (direction) {
        const originColumn = this.tableHead[start]
        // 有位置交换时，原先位置的元素删除，再在目标处插入
        this.tableHead.splice(start, 1)
        this.tableHead.splice(end, 0, originColumn)
        this.headKey = new Date().getTime() + '' // 更新table key值
        this.$nextTick(() => {
          // 因为表头重绘后滚动条会移到最左端初始位置，因此如果是在中间部分拖拽，还需要把滚动条在定位到该位置
          this.$refs.elTable.$refs.bodyWrapper.scrollLeft = this.scrollX
        })
      }
    },

    // 拖动虚线样式设置
    cellClassName({ columnIndex }) {
      const { start, end, direction } = this.dragState
      const target = columnIndex - 0
      if (target === start) {
        // 被移动的元素
        return 'drag_start'
      } else if (target === end) {
        // 要移动的位置
        return `drag_end_${direction}`
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-table) {
  .drag_start {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.938);
    color: #f3e8e8fd;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .drag_end_left {
    border-left: 2px dotted rgba(0, 0, 0, 0.938);
  }
  .drag_end_right {
    border-right: 2px dotted rgba(0, 0, 0, 0.938);
  }
}
</style>
