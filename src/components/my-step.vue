<template>
  <div class="step-component">
    <div class="step-info start">开始</div>
    <div class="arrow-default" :class="{'arrow-complete': step >= 1 }"><arrow1 /></div>
    <div :class="{'step': true, 'step-complete': 1 <= step -1, 'step-active': 1 === step }">
      <div :class="{'link': true, 'link-complete': 1 <= step -1, 'link-active': 1 === step }">
        <config-link style="width: 22px; height: 22px;"/>
      </div>
      <div class="title">确定主题</div>
      <div class="title subtitle">按提示补充信息</div>
    </div>
    <div class="arrow-default" :class="{'arrow-complete': step >= 2 }"><arrow2 /></div>
    <div :class="{'step': true, 'step-complete': 2 <= step -1, 'step-active': 2 === step }">
      <div :class="{'link': true, 'link-complete': 2 <= step -1, 'link-active': 2 === step }">
        <config-link style="width: 22px; height: 22px;"/>
      </div>
      <div class="title">生成大纲</div>
      <div class="title subtitle">按提示补充信息</div>
    </div>
    <div class="arrow-default" :class="{'arrow-complete': step >= 3 }"><arrow3 /></div>
    <div :class="{'step': true, 'step-complete': 3 <= step -1, 'step-active': 3 === step }">
      <div :class="{'link': true, 'link-complete': 3 <= step -1, 'link-active': 3 === step }">
        <config-link style="width: 22px; height: 22px;"/>
      </div>
      <div class="title">生成分析报告</div>
      <div class="title subtitle">按提示补充信息</div>
    </div>
    <div class="arrow-default" :class="{ 'arrow-complete': step >= 4 }"><arrow4 /></div>
    <div :class="{'step': true, 'step-complete': 4 <= step -1, 'step-active': 4 === step }">
      <div :class="{'link': true, 'link-complete': 4 <= step -1, 'link-active': 4 === step }">
        <config-link style="width: 22px; height: 22px;"/>
      </div>
      <div class="title">浏览</div>
      <div class="title subtitle">按提示补充信息</div>
    </div>
    <div class="arrow-default arrow-last" :class="{'arrow-complete': step >= 5, 'arrow-active': step === 4  }"><arrow5 /></div>
    <div class="step-info end" :class="{'finish': step ===4 }">结束</div>
  </div>
</template>

<script setup>
import Arrow1 from '@/assets/arrow1.svg?skipsvgo'
import Arrow2 from '@/assets/arrow2.svg?skipsvgo'
import Arrow3 from '@/assets/arrow3.svg?skipsvgo'
import Arrow4 from '@/assets/arrow4.svg?skipsvgo'
import Arrow5 from '@/assets/arrow5.svg?skipsvgo'
import ConfigLink from '@/assets/link.svg?skipsvgo'

const { step } = defineProps({
  step: {
    type: Number,
    default: () => 1
  }
})
console.log(step, '步骤')

</script>

<style lang="scss" scoped>
$default: #7c7c7c;
$active: #db6b26;
$complete: #2667db;
.arrow-default{
  color: $default;
  height: 50px;
  margin-right: 20px;
}
.arrow-last{
  margin: 0;
}
.arrow-complete{
  color: $complete;
}
.arrow-active{
  color: $active;
}
.link{
  z-index: 1;
  background-color: white;
  position: absolute;
  top: 15px;
  left: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $default;
  border-radius: 50%;
  padding: 7px;
}
.link-active{
  border: 1px solid $active;
  svg{
    color: $active;
  }
}
.link-complete{
  border: 1px solid $complete;
  svg{
    color: $complete;
  }
}
.step-component{
  display: flex;
  align-items: center;
  min-width: 1500px;
  color: $default;
}

.step-info{
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 15px;
}
.start{
  background: $complete;
}
.end{
  background: $default;
}
.finish{
  background: $active;
}
.step{
  position: relative;
  border: 1px solid #7c7c7c;
  border-radius: 15px;
  .title{
    height: 35px;
    width: 200px;
    font-size: 18px;
    line-height: 35px;
    text-align: left;
    padding-left: 40px;
  }
  .subtitle{
    border-top: 1px dashed #ccc;
    font-size: 14px;
  }
}
.step-complete{
  border: 1px solid $complete;
}
.step-active{
  border: 1px solid $active;
}
</style>
