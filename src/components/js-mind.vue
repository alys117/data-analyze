<template>
  <div class="js-back">
    <div id="jsMind" :style="{'--width': w,'--height': h}" class="js-mind-container"></div>
  </div>
</template>

<script setup>
import 'jsmind/style/jsmind.css'
import JsMind from 'jsmind'
import 'jsmind/draggable-node'
import { onMounted, toRaw } from 'vue'
import emitter from '@/utils/mitt.js'
import { renameObjectProperties } from '@/utils/util.js'
const w = ref('0px')
const h = ref('00px')
const mind = {
  /* 元数据，定义思维导图的名称、作者、版本等信息 */
  meta: {
    name: '思维导图',
    author: 'aspire',
    version: '0.2'
  },
  /* 数据格式声明 */
  format: 'node_tree',
  /* 数据内容 */
  data: {
    id: 'root',
    topic: 'jsMind',
    children: [
      {
        id: 'easy', // [必选] ID, 所有节点的ID不应有重复，否则ID重复的结节将被忽略
        topic: 'Easy', // [必选] 节点上显示的内容
        direction: 'right', // [可选] 节点的方向，此数据仅在第一层节点上有效，目前仅支持 left 和 right 两种，默认为 right
        expanded: true, // [可选] 该节点是否是展开状态，默认为 true
        children: [
          { id: 'easy1', topic: 'Easy to show' },
          { id: 'easy2', topic: 'Easy to edit' },
          { id: 'easy3', topic: 'Easy to store' },
          { id: 'easy4', topic: 'Easy to embed' }
        ]
      },
      {
        id: 'open',
        topic: 'Open Source',
        direction: 'right',
        expanded: true,
        children: [
          { id: 'open1', topic: 'on GitHub' },
          { id: 'open2', topic: 'BSD License' }
        ]
      },
      {
        id: 'powerful',
        topic: 'Powerful',
        direction: 'right',
        children: [
          { id: 'powerful1', topic: 'Base on Javascript' },
          { id: 'powerful2', topic: 'Base on HTML5' },
          { id: 'powerful3', topic: 'Depends on you' }
        ]
      },
      {
        id: 'other',
        topic: 'test node',
        direction: 'right',
        children: [
          { id: 'other1', topic: "I'm from local variable" },
          { id: 'other2', topic: 'I can do everything' }
        ]
      }
    ]
  }
}
const options = {
  container: 'jsMind', // [必选] 容器的ID
  editable: true, // [可选] 是否启用编辑
  theme: 'primary' // [可选] 主题
  // view: {
  //   engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
  //   hmargin: 120, // 思维导图距容器外框的最小水平距离
  //   vmargin: 50, // 思维导图距容器外框的最小垂直距离
  //   line_width: 2, // 思维导图线条的粗细
  //   line_color: '#ddd' // 思维导图线条的颜色
  // },
  // layout: {
  //   hspace: 100, // 节点之间的水平间距
  //   vspace: 20, // 节点之间的垂直间距
  //   pspace: 20 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
  // },
  // shortcut: {
  //   enable: false // 是否启用快捷键 默认为true
  // }
}
const emit = defineEmits(['resize'])
onMounted(() => {
  // 初始化
  // const jm = jsMind.show(options, mind)
  const jm = new JsMind(options)
  jm.show(mind)
  const height = document.getElementsByTagName('jmnodes')[0].style.height
  const width = document.getElementsByTagName('jmnodes')[0].style.width
  emit('resize', { height, width })
  emitter.on('data-js-mind', async data => {
    // console.log(data, 'data from sample-tree')
    mind.data.topic = '大纲'
    const tmp = structuredClone(toRaw(data))
    renameObjectProperties(tmp, 'label', 'topic')
    mind.data.children = tmp
    h.value = 0
    w.value = 0
    await nextTick(() => {
      jm.show(mind)
    })
    const height = document.getElementsByTagName('jmnodes')[0].style.height
    const width = document.getElementsByTagName('jmnodes')[0].style.width
    console.log(height, width, 'height, width')
    h.value = height
    w.value = width
  })
})
</script>

<style lang="scss" scoped>
.js-back{
  //margin: 20px;
  background-color: #fcfcfc;
}
.js-mind-container {
  width: var(--width);
  height: var(--height);
}
</style>
