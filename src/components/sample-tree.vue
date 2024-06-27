<script setup>
import { ref } from 'vue'
import { DArrowRight, DArrowLeft, RefreshLeft, Check, Platform } from '@element-plus/icons-vue'
const dataSource = ref([
  {
    id: 'fdsfds',
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1-------55555-------2222222'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])
const dataSource2 = ref([
  {
    id: 100,
    label: '一级 食物',
    children: [
      {
        id: 101,
        label: '二级 水果',
        children: [
          {
            id: 102,
            label: '三级 苹果'
          },
          {
            id: 103,
            label: '三级 香蕉'
          }
        ]
      }
    ]
  },
  {
    id: 104,
    label: '一级 食物',
    children: [
      {
        id: 105,
        label: '二级 水果',
        children: [
          {
            id: 106,
            label: '三级 苹果'
          },
          {
            id: 107,
            label: '三级 香蕉'
          }
        ]
      }
    ]
  },
  {
    id: 200,
    label: '一级 2',
    children: [
      {
        id: 201,
        label: '二级 2-1'
      },
      {
        id: 202,
        label: '二级 2-2'
      }
    ]
  }
])
let id = 10000

const edit = (data) => {
  console.log(data, id++)
}
const append = (data) => {
  console.log(data, id++)
}
const remove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}

const handleMouseenter = (data) => {
  data.show = true
}
const handleMouseleave = (data) => {
  data.show = false
}
// 拖拽相关api
const treeIn = ref()
const treeOut = ref()
const handleNodeDragStart = (ev) => {
  ev.dataTransfer.dropEffect = 'copy'
  ev.dataTransfer.setData('srcId', ev.target.id)
}

function dragover_handler(ev) {
  ev.preventDefault()
  ev.dataTransfer.dropEffect = 'link'
}

function drop_handler(ev) {
  ev.preventDefault()

  const outId = ev.dataTransfer.getData('srcId')
  const inId = ev.target.id

  // 获取拖拽节点
  const outNode = treeOut.value.getNode(Number(outId))
  console.log(outNode, 'outNode')
  treeIn.value.append(outNode.data, Number(inId))
}
</script>

<template>
  <div class="transfer-container">
    <div class="tree">
      <el-tree
        ref='treeIn'
        class="flow-tree"
        :data="dataSource"
        node-key="id"
        draggable
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node" @mouseenter="handleMouseenter(data)" @mouseleave="handleMouseleave(data)">
            <span :id="data.id" @drop="drop_handler" @dragover="dragover_handler">
              <span v-if="data.children"></span>
              <span v-else style="margin-right: 3px"><el-icon><Platform /></el-icon></span>
              {{ node.label }}
            </span>
            <span>
              <a @click="append(data)" :style="{ 'color': !data.show ? 'transparent': ''}">添加</a>
              <a @click="edit(data)" :style="{ 'color': !data.show ? 'transparent': ''}">编辑</a>
              <a @click="remove(node, data)" :style="{ 'color': !data.show ? 'transparent': ''}">删除</a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <div class="middle">
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowRight"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowLeft"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="RefreshLeft"/></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="Check"/></div>
    </div>
    <div class="tree">
      <el-tree
        ref='treeOut'
        class="tree"
        :data="dataSource2"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span :id='data.id' draggable="true" @dragstart="handleNodeDragStart">{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>

</template>

<style lang="scss">
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
    display: flex;
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
</style>
