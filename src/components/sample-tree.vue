<script setup>
// import { ref, toRaw, onMounted, watch } from 'vue'
import emitter from '@/utils/mitt.js'
import { DArrowRight, DArrowLeft, RefreshLeft, Check, Medal } from '@element-plus/icons-vue'
import { convertFormat, generateID } from '@/utils/util.js'
import { historyTree } from '@/api/fakeData.js'
import { fetchHistoryOutline } from '@/api/request.js'
const route = useRoute()
const router = useRouter()
const props = defineProps(['tree-data'])
const dataSourceIn = ref()
const dataSourceOut = ref(historyTree)
const currentInput = ref('')
const setRef = (el, data) => {
  if (!el) return
  // console.log(data, '编辑状态')
  el.focus()
}
const edit = (data) => {
  data.isInput = true
  currentInput.value = data.label
}
const saveCurrentInp = (data) => {
  // console.log('保存')
  data.label = currentInput.value
  data.isInput = false
}
const append = (data) => {
  const newChild = { id: generateID(8), label: '新节点', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}
const remove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  // dataSourceIn.value = [...dataSourceIn.value] // 这个地方不太明白
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
}
function handleDrop(draggingNode, dropNode, dropType, ev) {
  // console.log('tree drop:', dropNode.label, dropType)
}

defineExpose({
  getOutline: () => toRaw(dataSourceIn.value)
})
watch(() => dataSourceIn.value, (newVal, oldVal) => {
  // console.log('jsmind', router, route, newVal)
  if (route.fullPath === '/step2') {
    emitter.emit('data-js-mind', dataSourceIn.value)
    console.log('dataSourceIn 变化了', dataSourceIn.value)
  }
}, { deep: true })
watch(() => props.treeData, (val) => {
  if (val) {
    dataSourceIn.value = props.treeData.dsIn
    console.log('props.treeData 变化了', dataSourceIn.value)
  }
}, { deep: true })
onActivated(async() => {
  if (router.options.history.state.back === '/step1') return
  emitter.emit('data-js-mind', dataSourceIn.value)
})
onMounted(async() => {
  const fakeHis = await fetchHistoryOutline({
    'theme': '你好',
    'other': []
  })
  // console.log(convertFormat(fakeHis))
  dataSourceOut.value = convertFormat(fakeHis)
})
</script>

<template>
  <div class="transfer-container">
    <div class="tree tree-wrap">
      <el-tree
        ref='treeOut'
        class="flow-tree"
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
    <div class="middle">
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowRight"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowLeft"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="RefreshLeft"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="Check" @click="console.log(toRaw(dataSourceIn))" /></div>
    </div>
    <div class="tree tree-wrap">
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
            <span style="display: flex; align-items: center;">
              <span v-if="data.children && data.children.length"></span>
              <span v-else style="color: #7c7c7c;display: flex;margin-right: 5px;"><el-icon><Medal /></el-icon></span>
              <span v-if="!data.isInput">{{ node.label }}</span>
              <span v-else><el-input size="small" :ref="(el)=>setRef(el, data)" v-model="currentInput" placeholder="请输入分类名称" @blur="saveCurrentInp(data)"/></span>
            </span>
            <span class="tree-btn" style="text-wrap: nowrap;margin-left: 5px">
              <a @click="append(data)">添加</a>
              <a @click="edit(data)">编辑</a>
              <a @click="remove(node, data)">删除</a>
            </span>
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
    //width: 400px;
    overflow: auto;
    // 树滚动条
    .flow-tree {
      width: 450px;
      overflow: auto;
      :deep(.el-tree-node) {
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
<style scoped>
/* 这里需要用到深度选择器，否则改变不了样式，
无论scoped是否存在都需要使用到深度选择器 */
/*:deep(.el-tree-node) {
  white-space: normal;
  outline: 0;
}

:deep(.el-tree-node__content) {
  text-align: left;
  align-items: start;
  margin: 4px;
  height: 100%;

}*/
</style>
<style scoped lang="scss">
// 如果使用了sass时，也可以这样写，
// 使用了sass也可以像上面一样写，就写两个深度选择器
// 这个我也是F12，然后看到它们对应的关系的
:deep(.el-tree-node) {
  white-space: normal;
  outline: 0;

  .el-tree-node__content {
    text-align: left;
    //align-items: start;
    margin: 8px;
    height: 100%;
  }
}
</style>
