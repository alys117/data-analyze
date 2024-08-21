<template>
  <div style="padding: 20px">
    <el-scrollbar class="custom-mind-container">
      <div ref="customMindRef" id="customMind" :style="{'--innerHeight': h, '--innerWidth': w}" class="mind-ref"></div>
      <!--    <div ref="customMindRef" id="customMind" style="height: 500px"></div>-->
    </el-scrollbar>
    <!--    <el-button @click="jmResize">resize</el-button>-->
  </div>
</template>

<script setup>
import 'jsmind/style/jsmind.css'
import JsMind from 'jsmind'
import 'jsmind/draggable-node'
import { onMounted } from 'vue'
import { fetchBusiTree } from '@/api/request.js'
import emitter from '@/utils/mitt.js'
const h = ref('500px')
const w = ref('100%')
const mind = ref({
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
        'background-color': '#ff0122',
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
})
const options = {
  container: 'customMind', // [必选] 容器的ID
  editable: true, // [可选] 是否启用编辑
  theme: 'primary', // [可选] 主题
  context_menu: {
    enable: true
  },
  view: {
    zoom: { // 配置缩放
      min: 0.5, // 最小的缩放比例
      max: 3.0, // 最大的缩放比例
      step: 0.1 // 缩放比例间隔
    }
  }
}
const customMindRef = ref(null)
const jm = ref(null)
onMounted(async() => {
  // 初始化
  // const jm = jsMind.show(options, mind)
  jm.value = new JsMind(options)
  const _jm = jm.value
  // customMindRef.value.addEventListener('click', handleClick)
  const remoteMind = await fetchBusiTree()
  mind.value.data = remoteMind
  console.log(mind.value, '大纲数据到了')
  // const arr = findFamily(mind.value.data.children, 'table_ename', 'dw_mobilewire_user_statu_ds')
  // arr.forEach(item => { item.expanded = true })
  // arr.at(-1)['background-color'] = '#ff0122'
  _jm.add_event_listener(function(type, data) {
    // console.log(type, data)
    _jm.disable_edit()
    if (type === 4) {
      const node = jm.value.get_node(data.node)
      handleNodeClick(node)
    }
    const height = document.getElementsByTagName('jmnodes')[0].style.height
    const width = document.getElementsByTagName('jmnodes')[0].style.width
    console.log(height, 'height', '|', width, 'width')
    // h.value = (+height.substring(0, height.length - 2) + 17) + 'px'
    // w.value = (+width.substring(0, width.length - 2) + 17) + 'px'
    h.value = height
    w.value = width
  })
  // mind.data.children[3]['background-color'] = '#ff0122'
  // mind.data.children[3].expanded = false
  _jm.show(mind.value)
  // 可以用调用高亮函数了hightlightNode
  emitter.emit('highlight', '可以高亮了')
  // const node = _jm.get_node('easy')
  // _jm.set_node_color(node.id, 'pink', null)
  _jm.resize()
})
function hightlightNode(prop) {
  const arr = findFamily(mind.value.data.children, 'table_ename', prop) || []
  console.log(arr, 'arr', prop, mind.value.data.children)
  if (!arr.length) return
  arr.forEach(item => { jm.value.expand_node(item.id) })
  const lastNode = arr.at(-1)
  const _jm = jm.value
  _jm.enable_edit()
  _jm.set_node_color(lastNode.id, '#ff6b6b', null)
  _jm.disable_edit()
}
defineExpose({
  hightlightNode
})
function jmResize() {
  jm.value.resize()
}
const findFamily = (tree, prop, tableName, path = []) => {
  for (const item of tree) {
    if (item[prop] === tableName) {
      // 找到目标项
      return [...path, item]
    }
    if (item.children && item.children.length > 0) {
      const result = findFamily(item.children, prop, tableName, [...path, item])
      if (result) {
        // 子树中找到目标项
        return result
      }
    }
  }
  // 未找到目标项
  return null
}
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
  if (node.data.table_ename) {
    ElMessageBox.confirm(`确认选择${node.data.table_cname}（${node.data.table_ename}）?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      emitter.emit('add-table', node.data)
      const _jm = jm.value
      _jm.enable_edit()
      _jm.set_node_color(node.id, '#ff6b6b', null)
      _jm.disable_edit()
    }).catch(() => {
      console.log('取消')
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-mind-container {
  background-color: #fafafa;
  padding-bottom: 8px; // 否则el-scrollbar的滚动条会被遮挡
  height: 500px;
  width: 100%;
  overflow: auto;
}
.mind-ref{
  height: var(--innerHeight);
  width: var(--innerWidth);
}
</style>
