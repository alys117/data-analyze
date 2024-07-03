<script setup lang="ts">
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const popoverShow = ref(false) // 是否显示
const popoverRef = ref()

/** 点击空白处隐藏 */
const onClickOutside = (e) => {
  // console.log('clickOutside')
  if (
    popoverShow.value &&
    !unref(popoverRef).popperRef.contentRef.contains(e.target)
  ) {
    popoverShow.value = false
  }
}

/** 提交方法 */
function submit() {
  console.log('提交成功')
}
</script>
<template>
  <div>--------------------------------</div>
  <el-popover
    placement="bottom"
    :width="160"
    :visible="popoverShow"
    ref="popoverRef"
  >
    <div class="mt-10" style="text-align: right; margin: 0">
      <div>文本内容</div>
      <el-button size="small" text @click="popoverShow = false">取消</el-button>
      <el-button size="small" type="primary" @click="submit()">确认</el-button>
    </div>
    <template #reference>
      <el-button
        type="primary"
        @click="popoverShow = true"
        v-click-outside="onClickOutside"
      >
        open
      </el-button>
    </template>
  </el-popover>
</template>
