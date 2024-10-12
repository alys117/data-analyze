<template>
  <el-row class="tac">
    <el-col :span="6">
      <h5 class="mb-2">Default colors</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6">
      <h5 class="mb-2">Custom colors</h5>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <div style="min-width: 1000px;width: 80vw">
    <demo-tinymce v-model:description="description" />
    <index-bak v-if="false" />
    <el-button @click="mock('/api/test1')">mock1</el-button>
    <el-button @click="mock('/api/test2')">mock2</el-button>
    <el-button @click="mock('/api/test3')">mock3</el-button>
    <el-button @click="mock('/api/test4')">mock4</el-button>
    <el-button @click="mock('/api/test10')">mock10</el-button>
    <el-button @click="mock('/api/select_tables')">/api/select_tables</el-button>
  </div>
  <span>{{form1}}</span>
  <span>{{form2}}</span>
  <el-divider/>
  <my-form v-model:abc="form1" v-model:bcd="form2" />
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'
import DemoTinymce from '@/components/tinymce/demo-tinymce.vue'
import IndexBak from '@/components/tinymce/index-bak.vue'
import MyForm from '@/views/my-form.vue'

const form1 = reactive({
  user: '11',
  region: '123',
  date: '2024-09-09',
  options: [{
    label: '123',
    value: '123'
  }, {
    label: '456',
    value: '456'
  }]
})

const form2 = reactive({
  user: 'a',
  region: 'b',
  date: 'c'
})
function mock(n = '/api/select_tables') {
  fetch(`${n}?_t=${new Date().getTime()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ a: n })
  }).then(res => res.json()).then(res => {
    console.log(res)
  })
}

const description = ref('tip<br>this is a message')
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleSelect = (a, b, c) => {
  console.log(a, b, c, 'select')
}
</script>
