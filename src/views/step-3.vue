<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import emitter from '@/utils/mitt.js'
import { generateID, findFamily } from '@/utils/util.js'
import TimeLine from '@/components/time-line.vue'
import { ArrowRight } from '@element-plus/icons-vue'
const router = useRouter()

const loading = ref(true)
const currentAct = ref({})

const result = ref([])
onMounted(() => {
  loading.value = false
  setId(activities)
  emitter.on('load-advice', (activity) => {
    currentAct.value = activity
    result.value = findFamily(activities, activity.id)
    console.log(result, 'result')
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (!activity.type) {
        emitter.emit('change-point', { id: currentAct.value.id, type: 'danger' })
      }
    }, 200)
  })
})
const activities = reactive([
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    type: ''
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    // hollow: true,
    type: '',
    children: [
      {
        content: 'child',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46'
      }
    ]
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    children: [
      {
        content: 'child',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46',
        children: [
          {
            content: 'child',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: 'Custom hollow',
            timestamp: '2018-04-03 20:46'
          }
        ]
      }
    ]
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46'
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
    children: [
      {
        content: 'child',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46'
      }
    ]
  }
])

function setId(activities) {
  activities.forEach((activity) => {
    activity.id = generateID(8)
    if (activity.children && activity.children.length) {
      setId(activity.children)
    }
  })
}
const completePoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'primary' })
}
</script>

<template>
  <div v-loading="loading">
    <div style="width: fit-content">
      <my-step :step="3" />
      <div class="step3-container">
        <div class="timeline-container">
          <time-line :activities="activities" :level="1"/>
        </div>
        <div class="step3-main">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="item in result" :key="item.id">
              <span style="font-size: 16px">{{ item.content }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div style="background: #fcfcfc;padding: 10px">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet animi dolor eos eveniet id iusto maxime molestias numquam, obcaecati praesentium quidem quis quisquam, sunt vel veritatis vero? Aliquam aliquid, expedita illo
            ipsam possimus quis quo repudiandae sit vel vitae? Adipisci cumque cupiditate delectus deleniti eligendi esse eveniet expedita fuga fugit ipsa laborum maxime nam nemo odio, officia porro, quo reiciendis tempora, ullam voluptas.
            Accusantium aliquid cumque deleniti, deserunt ex exercitationem, illum inventore iusto nostrum numquam optio praesentium quam qui, recusandae sint soluta ullam vel vero. Dignissimos, dolorem esse ex inventore ipsum iste magni
            maiores perferendis possimus, sequi tempore voluptatibus?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur dolores explicabo provident. At delectus magni nam ratione similique. Ad aliquid aperiam consequatur dolorem esse laborum minima nostrum praesentium quo?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur dolores explicabo provident. At delectus magni nam ratione similique. Ad aliquid aperiam consequatur dolorem esse laborum minima nostrum praesentium quo?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur dolores explicabo provident. At delectus magni nam ratione similique. Ad aliquid aperiam consequatur dolorem esse laborum minima nostrum praesentium quo?
          </div>
          <el-button type="primary" @click="completePoint">emit</el-button>
        </div>
      </div>
      <div class="step-forward">
        <el-button size="default" type="primary" @click="router.push('/step2')">上一步</el-button>
        <el-button size="default" type="primary" @click="router.push('/step4')">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-forward{
  padding: 20px;
  text-align: right;
}
.step3-container{
  display: flex;
  //height: calc(100vh - 112px - 72px - 17px);
  .timeline-container{
    border-right: 1px dashed #acacac ;
    padding-right: 20px;
    flex-shrink: 0;
  }
  .step3-main{
    padding-left: 20px;
  }
}
</style>
