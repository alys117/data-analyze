<script setup>
// import { ref, toRaw, onMounted, watch } from 'vue'
import emitter from '@/utils/mitt.js'
import { DArrowRight, DArrowLeft, RefreshLeft, Check, Platform } from '@element-plus/icons-vue'
import { generateID } from '@/utils/util.js'
import { historyTree } from '@/api/fakeData.js'

const props = defineProps(['tree-data'])
const dataSourceIn = ref()
const dataSourceOut = ref(historyTree)
const currentInput = ref('')
const setRef = (el, data) => {
  if (!el) return
  console.log(data, '编辑状态')
  el.focus()
}
const edit = (data) => {
  data.isInput = true
  currentInput.value = data.label
}
const saveCurrentInp = (data) => {
  console.log('保存')
  data.label = currentInput.value
  data.isInput = false
  // emitter.emit('data-js-mind', dataSourceIn.value) // 使用watch监听dataSourceIn
}
const append = (data) => {
  const newChild = { id: generateID(8), label: '新节点', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  // emitter.emit('data-js-mind', dataSourceIn.value) // 使用watch监听dataSourceIn
}
const remove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  // dataSourceIn.value = [...dataSourceIn.value] // 这个地方不太明白
  // emitter.emit('data-js-mind', dataSourceIn.value) // 使用watch监听dataSourceIn
}

const handleMouseenter = (data) => {
  // data.show = true
}
const handleMouseleave = (data) => {
  // data.show = false
}

// 拖拽相关api
const changeNodeId = (tree) => {
  tree.id = generateID(8)
  if (tree.children) {
    tree.children.forEach((item) => {
      changeNodeId(item)
    })
  }
}

const treeIn = ref()
const treeOut = ref()
const handleNodeDragStart = (ev) => {
  ev.dataTransfer.dropEffect = 'copy'
  ev.dataTransfer.setData('srcId', ev.currentTarget.dataset.treeId)
}

function dragover_handler(ev, data) {
  ev.preventDefault()
  ev.dataTransfer.dropEffect = 'link'
  data.css = true
}
function dragleave_handler(ev, data) {
  data.css = false
}

function drop_handler(ev, data) {
  ev.preventDefault()
  data.css = 0
  const outId = ev.dataTransfer.getData('srcId')
  const inId = ev.currentTarget.dataset.treeId // ev.currentTarget.getAttribute('data-tree-id')

  // 获取拖拽节点
  const outNode = treeOut.value.getNode(outId)
  const tmp = toRaw(outNode.data)
  const copy = structuredClone(tmp)
  changeNodeId(copy)
  // console.log(copy, 'copy', inId)
  treeIn.value.append(copy, inId)
  // emitter.emit('data-js-mind', dataSourceIn.value) // 使用watch监听dataSourceIn
}
function handleDrop(draggingNode, dropNode, dropType, ev) {
  // console.log('tree drop:', dropNode.label, dropType)
  // emitter.emit('data-js-mind', dataSourceIn.value) // 使用watch监听dataSourceIn
}

defineExpose({
  getOutline: () => toRaw(dataSourceIn.value)
})
watch(() => dataSourceIn.value, (newVal, oldVal) => {
  emitter.emit('data-js-mind', dataSourceIn.value)
}, { deep: true })
watch(() => props.treeData, (val) => {
  if (val) {
    dataSourceIn.value = props.treeData.dsIn
  }
})
onMounted(() => {})
</script>

<template>
  <div class="transfer-container">
    <div class="tree">
      <el-tree
        ref='treeIn'
        class="flow-tree"
        :data="dataSourceIn"
        node-key="id"
        draggable
        default-expand-all
        :expand-on-click-node="false"
        @node-drop="handleDrop"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node"
                :id="data.id"
                :data-tree-id="data.id"
                @mouseenter="handleMouseenter(data)"
                @mouseleave="handleMouseleave(data)"
                @drop="drop_handler($event, data)"
                @dragleave="dragleave_handler($event, data)"
                @dragover="dragover_handler($event,data)"
                :style="{background: data.css?'lightgreen':''}">
            <span>
              <span v-if="data.children && data.children.length"></span>
              <span v-else style="margin-right: 3px"><el-icon><Platform /></el-icon></span>
              <span v-if="!data.isInput">{{ node.label }}</span>
              <span v-else><el-input size="small" :ref="(el)=>setRef(el, data)" v-model="currentInput" placeholder="请输入分类名称" @blur="saveCurrentInp(data)"/></span>
            </span>
            <span class="tree-btn">
              <a @click="append(data)">添加</a>
              <a @click="edit(data)">编辑</a>
              <a @click="remove(node, data)">删除</a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <div class="middle">
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowRight"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowLeft"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="RefreshLeft"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="Check" @click="console.log(toRaw(dataSourceIn))" /></div>
    </div>
    <div class="tree">
      <el-tree
        ref='treeOut'
        class="tree"
        :data="dataSourceOut"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node" :id='data.id' :data-tree-id="data.id" draggable="true" @dragstart="handleNodeDragStart">
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin flex {
  display: flex;
}
.transfer-container{
  @include flex;
  .tree {
    min-width: 400px;
    overflow: auto;
    .flow-tree {
      overflow: auto;
      .el-tree-node {
        .el-tree-node__children {
          overflow: visible
        }
      }
    }
  }
  .middle{
    display: none;
    //display: flex;
    width: 60px;
    gap: 20px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .button-a{
      height: 30px;
      width: 30px;
      border-radius: 5px;
    }
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  a,
  .green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    //transition: 0.4s;
    padding: 3px;
  }

  @media (hover: hover) {
    a:hover {
      background-color: hsla(160, 100%, 37%, 0.2);
    }
  }
}
.tree-btn{
  visibility: hidden;
}
.custom-tree-node:hover .tree-btn{
  visibility: visible;
}
</style>
