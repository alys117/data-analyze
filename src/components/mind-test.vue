<template>
  <div class="js-back">
    <div ref="jsMindRef" id="jsMind" :style="{'--width': w,'--height': h}" class="js-mind-container"></div>
  </div>
</template>

<script setup>
import 'jsmind/style/jsmind.css'
import JsMind from 'jsmind'
import 'jsmind/draggable-node'
import { onMounted } from 'vue'
const w = ref('100%')
const h = ref('600px')
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
    topic: 'Mind-Test',
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
  editable: false, // [可选] 是否启用编辑
  theme: 'primary' // [可选] 主题
}
const jsMindRef = ref(null)
const jm = ref(null)
onMounted(() => {
  // 初始化
  // const jm = jsMind.show(options, mind)
  jm.value = new JsMind(options)
  // jm.value.show(mind)
  jsMindRef.value.addEventListener('click', handleClick)
  fetch('https://hizzgdev.github.io/jsmind/example/data_example.json')
    .then(resp => resp.json())
    .then(mind => jm.value.show(mind))
  jm.value.resize()
})
const handleClick = (event) => {
  const target = event.target
  const nodeId = target.getAttribute('nodeid')
  if (nodeId) {
    const node = jm.value.get_node(nodeId)
    handleNodeClick(node)
  }
}

// 节点点击事件处理函数
function handleNodeClick(node) {
  console.log(node)
  // 在这里处理节点点击事件，例如显示节点信息、跳转等
}
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
