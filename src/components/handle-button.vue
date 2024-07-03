<script setup>
import { ref } from 'vue'
const { triggerDrawer } = defineProps(['triggerDrawer'])

const zIndex = ref(2004)
const opacity = ref(1)
const isShowQuestionMark = ref(true)
const openDrawer = () => {
  if (
    !isdrag(
      moveStart.value.x,
      moveStart.value.y,
      moveStart.value.l,
      moveStart.value.t
    )
  ) {
    console.log('点击事件')
    zIndex.value++
    triggerDrawer()
  } else {
    console.log('拖拽事件')
  }
}
// 判断是否拖动了，这里我设置了5px，
const isdrag = (x1, y1, x2, y2) => {
  console.log(
    Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  )
  if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 5) {
    return false
  }
  return true
}
const handleWheel = (e) => {
  // e.preventDefault()
  if (e.deltaY > 0) {
    // 向下
    console.log('正在向下')
    opacity.value = opacity.value <= 0 ? 0 : opacity.value - 0.1
  } else if (e.deltaY < 0) {
    // 向上
    console.log('正在向上')
    opacity.value = opacity.value >= 1 ? 1 : opacity.value + 0.1
  }
}
const moveStart = ref({ x: 0, y: 0, l: 0, t: 0 })

defineExpose({
  moveStart,
  isShowQuestionMark
})
const vDrag = {
  mounted: (el, binding, vnode) => {
    const instance = binding.instance
    const oDiv = el // 当前元素
    // console.log(el, binding, vnode, 'el')
    oDiv.onmousedown = function(e) {
      // 获取x坐标和y坐标
      instance.moveStart.x = e.clientX
      instance.moveStart.y = e.clientY
      // 获取左部和顶部的偏移量
      instance.moveStart.l = oDiv.offsetLeft
      instance.moveStart.t = oDiv.offsetTop

      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft
      const disY = e.clientY - oDiv.offsetTop
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function(e) {
        instance.moveStart.l = e.clientX
        instance.moveStart.t = e.clientY
        document.onmousemove = null
        document.onmouseup = null
      }
      // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
      return false
    }
  }
}
</script>

<template>
  <div v-if="isShowQuestionMark" v-drag class="button" :style="{'--zIndex': zIndex, 'filter': 'opacity('+opacity+')'}" @click="openDrawer" @wheel.prevent="handleWheel">?</div>
</template>

<style scoped>
:root{
  --zIndex: 1;
}
.button {
  z-index: var(--zIndex);
  position: fixed;
  cursor: pointer;
  bottom: 90px;
  left: 90px;
  width: 40px;
  height: 40px;
  background: #409eff;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: aliceblue;
  user-select: none;
}
</style>
