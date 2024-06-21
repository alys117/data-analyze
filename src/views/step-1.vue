<script setup>
import { ref, onMounted } from 'vue'
import MyStep from '@/components/my-step.vue'
import AI_HEAD_IMG_URL from '@/assets/chatgpt.jpg'
import CusTable from '@/components/cus-table.vue'
import ChatWindow from '@/components/chatHome/chat-window.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const showTalk = ref(true)
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
  readefile: false,
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

const endTalk = function() {
  showTalk.value = false
}
</script>

<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInDown"
    leave-active-class="animate__animated animate__backOutUp"
  >
    <div v-show="showTalk" class="chat-container">
      <chat-window
        ref="chatWindow"
        :frined-info="chatWindowInfo"
        :setting-info="SettingInfo"
        :store-statu="storeStatus"
        @endTalk="endTalk"
      />
    </div>
  </transition>
  <div v-show="!showTalk">
    <div class="step-container" >
      <my-step :step="1" />
    </div>
    <div class="cus-table-container">
      <cus-table :options="[{label: 'prop传入',value: 'prop实际值'}]" />
    </div>
    <div class="step-forward">
      <vxe-button size="mini" status="primary" content="下一步" @click="router.push('/step2')"></vxe-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-container{
  padding: 20px;
}
.chat-container{
  padding: 0 20px;
}
.cus-table-container{
  padding: 20px 20px 0 20px;
}
.step-forward{
  padding: 20px;
  text-align: right;
}
</style>
