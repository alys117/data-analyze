<template>
  <div style='width:400px;user-select: none;'>
    <el-tree :data="dataSource"
             node-key="id"
             default-expand-all
             :expand-on-click-node="false"
             ref='treeIn'
             @node-click='clickTree'>
      <template #default="{ node, data }">

        <el-input v-model='data.label' size="small" v-if='data.edit' @blur='data.edit = false'/>
        <span :id='data.id' @drop="drop_handler" @dragover="dragover_handler" v-else @dblclick='data.edit=true'>{{
          node.label }}</span>
        <span style='margin-left: 20px;' class='tree-btn'>
          <el-button @click="append(data)" size="small" text type="success" v-if="data.flag!=='entity'"> add
          </el-button>
          <el-button @click="remove(node, data)" size="small" text type="success">del
          </el-button>
        </span>
      </template>
    </el-tree>

    <div style='border:1px solid red;margin-top: 30px;'>
      <el-tree :data="dataSource2" node-key="id" default-expand-all :expand-on-click-node="false" ref='treeOut'>
        <template #default="{ node, data }">

          <span :id='data.id' draggable="true" @dragstart="handleNodeDragStart">{{ node.label }}</span>

        </template>
      </el-tree>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'

const treeIn = ref()
const treeOut = ref()

const dataSource = ref([
  {
    id: 1,
    label: '蔬菜',
    edit: false,
    children: [
      {
        id: 4,
        label: '红色的',
        children: [
          {
            id: 9,
            edit: false,
            label: '辣椒'
          },
          {
            edit: false,
            id: 10,
            label: '丸子'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '水果',
    edit: false,
    children: [
      {
        id: 5,
        edit: false,
        label: '软乎乎的'
      },
      {
        id: 6,
        edit: false,
        label: '刺刺的'
      }
    ]
  },
  {
    id: 3,
    label: '杂类',
    edit: false,
    children: [
      {
        id: 7,
        label: '红绿色',
        edit: false
      },
      {
        id: 8,
        edit: false,
        label: '黑紫色'
      }
    ]
  }
])

const handleNodeDragStart = (ev) => {
  ev.dataTransfer.dropEffect = 'copy'
  ev.dataTransfer.setData('text/plain', ev.target.id)
}

function dragover_handler(ev) {
  ev.preventDefault()
  ev.dataTransfer.dropEffect = 'link'
}

function drop_handler(ev) {
  ev.preventDefault()

  const outId = ev.dataTransfer.getData('text/plain')
  const inId = ev.target.id

  // 获取拖拽节点
  const outNode = treeOut.value.getNode(Number(outId))
  treeIn.value.append(outNode.data, Number(inId))
  // ev.target.appendChild(document.getElementById(data));
}

const dataSource2 = ref([
  {
    id: 1,
    label: '食品列表',
    children: [
      {
        id: 4,
        label: '香蕉',
        children: [],
        flag: 'entity'
      },
      {
        id: 5,
        label: '菠萝',
        children: [],
        flag: 'entity'
      },

      {
        id: 43,
        label: '榴莲（哈哈 我的最爱）',
        children: [],
        flag: 'entity'
      },
      {
        id: 44,
        label: '西红柿鸡蛋（不喜欢）',
        children: [],
        flag: 'entity'
      },
      {
        id: 45,
        label: '茄子',
        children: [],
        flag: 'entity'
      },
      {
        id: 46,
        label: '香菇',
        children: [],
        flag: 'entity'
      }

    ]
  }
])

let id = 1000

const append = (data) => {
  const newChild = { id: id++, label: '新增节点', children: [], edit: true }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  dataSource.value = [...dataSource.value]
}
const remove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}

const clickTree = (data, node) => {
  console.log(node)
}
onMounted(() => {

})
</script>

<style scoped lang="scss">
.el-tree-node__content {
  .tree-btn {
    display: none;
  }
}

.el-tree-node__content:hover {
  .tree-btn {
    display: block;
  }
}
</style>
