<script setup>
import MyStep from '@/components/my-step.vue'
import SampleTree from '@/components/sample-tree.vue'
import JsMind from '@/components/js-mind.vue'
import { convertFormat, revertFormat, reverseConvertFormat, generateID } from '@/utils/util.js'
import { fetchOutline } from '@/api/request.js'
import { useStepStore } from '@/stores/step.js'
import { callLoading } from '@/components/loading.js'
const step = useStepStore()
const router = useRouter()

const input3 = ref('')
const select = ref('')
const loading = ref(true)
const outlineTree = ref()
const sampleTreeRef = ref()
function addProperties(activities) {
  activities.forEach((activity) => {
    activity.id = activity.id || generateID(8)
    activity.content = activity.label || activity.content
    if (activity.children && activity.children.length) {
      addProperties(activity.children)
    }
  })
}
const toStep3 = () => {
  if (step.treeCache && step.treeCache.length) {
    router.push({
      name: 'Step3',
      state: { params: {}}
    })
    return
  }
  const treeData = sampleTreeRef.value.getOutline()
  addProperties(treeData)
  step.setTreeCache(treeData)
  let outline = revertFormat(treeData)
  outline = reverseConvertFormat(treeData)
  console.log(outline, 'outline--变化后', treeData, 'treeData')
  router.push({
    name: 'Step3',
    state: { params: { outline, treeData }}
  })
}

onMounted(async() => {
  console.log('step-2 mounted')
})
onActivated(async() => {
  console.log('step-2 activated')
  loading.value = false
  if (router.options.history.state.back === '/step3' && outlineTree.value) {
    console.log('step3 to step2 do nothing')
    return
  }
  if (step.treeCache) {
    outlineTree.value = step.treeCache
    console.log('treeCache 有缓存', step.treeCache)
    return
  }
  if (step.outline) {
    console.log('outline 有缓存', step.outline)
    outlineTree.value = convertFormat(step.outline)
    return
  }
  await init()
})
const init = async() => {
  const body = structuredClone(history.state.params || toRaw(step.step1))
  body['business_tree'] = 'aa->bb'
  body['other'] = []
  /*
  loading.value = true
  const outline = await fetchOutline(body)
  loading.value = false
  */
  const outline = await callLoading(async() => fetchOutline(body), [{ content: '正在生成分析大纲', timeConsuming: import.meta.env.VITE_OUT_LINE }])
  step.setOutline(outline)
  outlineTree.value = convertFormat(outline)
}
</script>

<template>
  <div v-loading="loading">
    <my-step :step="2" />
    <div class="main-container">
      <div class="left">
        <div class="head">
          <div class="history-head">
            <span style="padding-left: 10px;">历史大纲栏</span>
            <div v-if="false" class="history-head-child">
              <el-input
                v-model="input3"
                style="max-width: 400px;"
                placeholder="请输入搜索内容"
              >
                <template #prepend>
                  <el-select v-model="select" placeholder="选择" style="width: 100px">
                    <el-option label="Restaurant" value="1" />
                    <el-option label="Order No." value="2" />
                    <el-option label="Tel" value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-button>导入</el-button>
                </template>
              </el-input>
            </div>
          </div>
          <div class="model-created-head">
            <span style="padding-left: 10px">大纲栏</span>
          </div>
        </div>
        <div class="content">
          <div class="tree-container">
            <sample-tree ref="sampleTreeRef" :tree-data="{dsIn: outlineTree}"/>
          </div>
        </div>
      </div>
      <div class="right">
        <span class="mind-title">大纲思维导图</span>
        <div class="mind-container">
          <js-mind />
        </div>
      </div>
    </div>
    <!--    <div style="padding: 20px">-->
    <!--      <span class="mind-title">大纲思维导图</span>-->
    <!--      <div class="mind-container">-->
    <!--        <js-mind />-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="step-forward">
      <el-button size="default" type="primary" @click="router.push('/step1')">上一步</el-button>
      <el-button size="default" type="primary" @click="toStep3">下一步</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container{
  display: flex;
  //padding: 20px;
  //width: fit-content;
  //background-color: #f5f8fb;
}
.left{
  //width: 60vw;
  //overflow: auto;
  .head{
    display: flex;
    background-color: #f5f8fb;
    margin-bottom: 10px;
    align-items: center;
    .history-head{
      display: flex;
      align-items: center;
      gap:20px;
      line-height: 32px;
      flex: 1;
    }
    .model-created-head{
      flex: 1;
    }
  }
  .content{
    display: flex;
  }
}
.right {
  display: flex;
  flex: 1;
  flex-direction: column;
  .mind-title{
    padding-left: 20px;
    background-color: #f5f8fb;
    line-height: 32px;
  }
  .mind-container{}
}

.step-forward{
  padding: 20px;
  text-align: right;
}

.history-head-child :deep(.vxe-button.type--button) {
  margin-left: 0 ;
}
.history-head-child :deep(.input-with-select .el-input-group__prepend) {
  background-color: transparent;
}
.history-head-child :deep(.el-select__selected-item){
  color: black;
}
.history-head-child :deep(.el-button){
  background-color: var(--el-color-primary);
  color: white;
}
.history-head-child :deep(.el-button:hover){
  background-color: var(--el-button-hover-border-color);
  border-color: var(--el-button-hover-border-color);
  color: white;
}
</style>
