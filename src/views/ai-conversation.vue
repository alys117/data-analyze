<script setup>
import AI_HEAD_IMG_URL from '@/assets/aspire-logo.gif'
import ChatWindow from '@/components/chatHome/chat-window.vue'
import { useRouter } from 'vue-router'
import { useStepStore } from '@/stores/step.js'
import { fetchCheckInputRewrite } from '@/api/request.js'
const step = useStepStore()
const router = useRouter()
const showTalk = ref(true)
const chatWindowRef = ref()
onMounted(() => {
  chatWindowInfo.value = {
    img: '',
    name: 'Robot',
    detail: '模型对话',
    lastMsg: 'chatgpt v3.5 所基于的模型',
    id: 'gpt-3.5-turbo',
    headImg: AI_HEAD_IMG_URL,
    showHeadImg: true
  }
})

const chatWindowInfo = ref({})
// 全部的设置参数
const SettingInfo = ref({
  cutSetting: 1,
  readeFile: false,
  inputStatus: true,
  translateEnglish: false,
  openProductionPicture: false,
  openChangePicture: false,
  TemperatureAudio: 0,

  n: 1,
  size: '256x256',
  language: 'zh',
  chat: {
    suffix: '',
    MaxTokens: 1000,
    Temperature: 1,
    TopP: 1,
    n: 1,
    stream: true,
    echo: false,
    stop: '',
    FrequencyPenalty: 0,
    PresencePenalty: 0
  },
  openNet: false,
  max_results: 3,
  fineTunes: {
    training_file: '',
    model: 'curie',
    n_epochs: 4,
    prompt_loss_weight: 0.01,
    suffix: ''
    // compute_classification_metrics: false,
    // classification_betas:"",
    // classification_positive_class:"",
  }
})
const storeStatus = ref(0)
onActivated(() => {
  showTalk.value = true
})
const endTalk = async(param) => {
  // console.log('endTalk', param)
  const question =
    chatWindowRef.value.chatList.length
      ? chatWindowRef.value.chatList.at(-1).msg
      : '我想要了解各个地市在家庭宽带业务上的情况，汇报对象是运营经理，行业是通信行业，植本职工作是运营经理助理'
  chatWindowRef.value.canOperate = false
  const check = await fetchCheckInputRewrite({
    question,
    other: []
  })
  chatWindowRef.value.canOperate = true
  if (check.output === 'False') {
    ElMessageBox.alert('问题不符合要求！', '提示', { type: 'warning' })
    return
  }

  showTalk.value = false
  step.setAiConversation({ question })
  setTimeout(() => {
    router.push({
      name: 'Step1',
      state: { params: { question }}
    })
  }, 500)
}
</script>

<template>
  <div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div v-show="showTalk" class="chat-container">
        <chat-window
          ref="chatWindowRef"
          :frined-info="chatWindowInfo"
          :setting-info="SettingInfo"
          :store-statu="storeStatus"
          @endTalk="endTalk"
        />
      </div>
    </transition>
  </div>
</template>
<style>
:root{
  --animate-duration: 500ms;
  --animate-delay: 0s;
}
</style>
<style lang="scss" scoped>
.chat-container{
  padding: 20px 20px 0 20px;
  height: 100vh;
}
</style>
