<template>
  <div v-drag="resetH" :style="{height: (height + 10) + 'px'}">
    <div style="padding: 0 20px">
      <el-scrollbar class="custom-mind-container" :style="{'--height': height + 'px'}">
        <div ref="customMindRef" id="customMind" :style="{'--innerHeight': h, '--innerWidth': w}" class="mind-ref"></div>
      </el-scrollbar>
      <!--      <el-button @click="jmResize">resize</el-button>-->
      <!--      <el-button @click="height = height + 5 ">long</el-button>-->
      <!--      <el-button @click="height = height - 5 ">short</el-button>-->
    </div>
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
const height = ref(500)
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
          { id: 'easy1', topic: 'Easy to show1' },
          { id: 'easy2', topic: 'Easy to edit1' },
          { id: 'easy3', topic: 'Easy to store1' },
          { id: 'easy4', topic: 'Easy to embed1' }
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
  theme: 'clouds', // [可选] 主题
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
function resetH(aa, bb) {
  console.log(height.value, aa, bb)
  if (bb) { height.value = bb.substring(0, bb.length - 2) - 10 }
}
height.value = height.value - 10
onMounted(async() => {
  // 初始化
  // const jm = jsMind.show(options, mind)
  jm.value = new JsMind(options)
  const _jm = jm.value
  // customMindRef.value.addEventListener('click', handleClick)
  const remoteMind = await fetchBusiTree()
  mind.value.data = remoteMind
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
  emitter.emit('business-tree-ready', 'business-tree ready')
  // const node = _jm.get_node('easy')
  // _jm.set_node_color(node.id, 'pink', null)
  _jm.resize()
})
const tableOrder = defineModel('tableOrder', { type: Array })
function hightlightNode(prop, label) {
  const arr = findFamily(mind.value.data.children, 'table_ename', prop) || []
  // console.log(arr, 'arr', prop, mind.value.data.children)
  if (!arr.length) {
    ElMessage.error(`未找到该表 ${label} -- ${prop}`)
    tableOrder.value.push({ tableName: prop, order: null })
    return
  }
  arr.forEach(item => { jm.value.expand_node(item.id) })
  const lastNode = arr.at(-1)
  tableOrder.value.push({ tableName: lastNode.table_ename, order: lastNode.order })
  const _jm = jm.value
  // const aaa = _jm.get_node(lastNode.id)
  // console.log(aaa, 'aaa')
  _jm.enable_edit()
  _jm.set_node_color(lastNode.id, '#2667db', '#f1f1f1')
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
    ElMessageBox.confirm(`${node.data.table_cname}（${node.data.table_ename}）添加到推荐列表？`, '提示', {
      confirmButtonText: '添加',
      cancelButtonText: '撤销',
      type: 'warning'
    }).then(() => {
      node.data.operation = 'add'
      emitter.emit('add-table', node.data)
      const _jm = jm.value
      _jm.enable_edit()
      _jm.set_node_color(node.id, '#2667db', '#f1f1f1')
      _jm.disable_edit()
    }).catch(() => {
      // console.log('cancel')
      node.data.operation = 'delete'
      emitter.emit('add-table', node.data)
      const _jm = jm.value
      _jm.enable_edit()
      _jm.set_node_color(node.id, '#ecf0f1', '#333333')
      _jm.disable_edit()
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-mind-container {
  --height: 500px;
  background-color: #fcfcfc;
  padding-bottom: 8px; // 否则el-scrollbar的滚动条会被遮挡
  padding-right: 8px;
  height: var(--height);
  width: 100%;
  overflow: auto;
}
.mind-ref{
  height: var(--innerHeight);
  width: var(--innerWidth);
}
</style>
