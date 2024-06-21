<script setup>
import { ref } from 'vue'
import { DArrowRight, DArrowLeft, RefreshLeft, Check, Platform } from '@element-plus/icons-vue'
const dataSource = ref([
  {
    id: 1,
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
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
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
let id = 1000

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
</script>

<template>
  <div class="transfer-container">
    <div class="tree">
      <el-tree
        class="flow-tree"
        :data="dataSource"
        node-key="id"
        draggable
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
        <span class="custom-tree-node" @mouseenter="handleMouseenter(data)" @mouseleave="handleMouseleave(data)">
          <span>
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
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowRight"></el-button></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="DArrowLeft"></el-button></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="RefreshLeft"></el-button></div>
      <div><el-button type="primary" size="small" class="button-a" :icon="Check"></el-button></div>
    </div>
    <div class="tree">
      <el-tree
        class="tree"
        :data="dataSource2"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
        <span class="custom-tree-node" @mouseenter="handleMouseenter(data)" @mouseleave="handleMouseleave(data)">
          <span>{{ node.label }}</span>
          <span v-show="data.show">
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
