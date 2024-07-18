<script setup>
import MyStep from '@/components/my-step.vue'
import SampleTree from '@/components/sample-tree.vue'
import JsMind from '@/components/js-mind.vue'
import { convertFormat, revertFormat, reverseConvertFormat } from '@/utils/util.js'
import { fetchOutline } from '@/api/request.js'
import { useStepStore } from '@/stores/step.js'
const step = useStepStore()
const router = useRouter()

const input3 = ref('')
const select = ref('')
const loading = ref(true)
const outlineTree = ref()
const sampleTreeRef = ref()
const toStep3 = () => {
  const treeData = sampleTreeRef.value.getOutline()
  let outline = revertFormat(treeData)
  outline = reverseConvertFormat(treeData)
  console.log(outline, 'outline', treeData, 'treeData')
  step.setStep2({ outline, treeData })
  router.push({
    name: 'Step3',
    state: { params: toRaw(step.step2) }
  })
}

onMounted(async() => {
  console.log('step-2 mounted')
})
onActivated(async() => {
  console.log('step-2 activated')
  loading.value = true
  await init()
  loading.value = false
})
const init = async() => {
  const body = structuredClone(history.state.params || toRaw(step.step1))
  body['business_tree'] = 'aa->bb'
  body['other'] = []
  console.log('step-2 init', body)
  const outline = await fetchOutline(body)
  outlineTree.value = convertFormat(outline)
}
</script>

<template>
  <div v-loading="loading">
    <my-step :step="2" />
    <div class="main-container">
      <div class="left">
        <div class="head">
          <div>
            <div>大纲栏</div>
          </div>
          <div class="history-head">
            <span>历史大纲栏</span>
            <div class="history-head-child">
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
    <div class="step-forward">
      <el-button size="default" type="primary" @click="router.push('/step1')">上一步</el-button>
      <el-button size="default" type="primary" @click="toStep3">下一步</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container{
  display: flex;
  padding: 20px;
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
    justify-content: space-between;
    align-items: center;
    .history-head{
      display: flex;
      align-items: center;
      gap:20px;
    }
  }
  .content{
    display: flex;
  }
}
.right {
  display: flex;
  flex-direction: column;
  .mind-title{
    padding-left: 20px;
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
