<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import NodePreview from '@/views/node-preview.vue'
const router = useRouter()
import { useStepStore } from '@/stores/step.js'
import TimeLineView from '@/components/time-line-view.vue'
import emitter from '@/utils/mitt.js'
import { debounce } from 'xe-utils'
const step = useStepStore()
const loading = ref(true)
const nodes = ref()
onActivated(() => {
  console.log('step-4 activated')
  nodes.value = structuredClone(toRaw(step.treeCache))
})
const contentRef = ref()
const scrollHanler = debounce(() => {
  console.log('scroll')
  const ids = findAllIds(nodes.value)
  const rects = ids.map((id) => {
    const el = document.querySelector(`[data-node-id="${id}"]`)
    return el.getBoundingClientRect()
  })
  for (let i = 0; i < ids.length; i++) {
    const rect = rects[i]
    if (rect.top > 0 && rect.top < 300) {
      emitter.emit('bold', ids[i])
      break
    }
  }
}, 100)
const findAllIds = (nodes) => {
  const ids = []
  nodes.forEach((node) => {
    ids.push(node.id)
    if (node.children && node.children.length) {
      ids.push(...findAllIds(node.children))
    }
  })
  return ids
}
onMounted(() => {
  loading.value = false
  // setId(nodes)
  emitter.on('scroll-to', (id) => {
    console.log('scroll-to', id)
    const el = document.querySelector(`[data-node-id="${id}"]`)
    console.log(el)
    el.scrollIntoView({ behavior: 'smooth' })
  })
  console.log('step-4 mounted')
  contentRef.value.addEventListener('scroll', scrollHanler)
})
function back2step3() {
  step.setStep3(null)
  router.push('/step3')
}
</script>

<template>
  <div v-loading="loading">
    <my-step :step="4" />
    <div class="view">
      <div class="index">
        <h3 style="margin-bottom: 10px;">大纲目录</h3>
        <time-line-view :activities="step.step3" :level="1" />
      </div>
      <div ref="contentRef" class="content">
        <node-preview :nodes="nodes" />
        <div class="step-forward">
          <el-button size="default" type="primary" @click="back2step3">上一步</el-button>
          <!--          <el-button size="default" type="primary" @click="router.push('/demo1')">demo</el-button>-->
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.step-forward{
  padding: 20px;
  text-align: right;
}
.view{
  border-top: 1px solid #eee ;
  min-width: 1628px;
  display: flex;
  .index{
    flex-shrink: 0;
    min-width: 400px;
    max-width: 600px;
    border-right: 1px dotted #eee;
    overflow: auto;
    padding: 20px;
    height: calc(100vh - 113px);
    background-color: #fcfcfc;
  }
  .content{
    height: calc(100vh - 113px);
    overflow: auto;
  }
}
</style>
