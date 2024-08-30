<template>
  <div class="chart-container">
    <div style="display: flex;align-items: center" v-if="tip">
      <span style="margin: 10px;padding: 10px; background-color: #fdfdfd;font-size: 20px;font-family: 'Microsoft YaHei UI'">问题不能满足哟，麻烦修改后再分析</span>
      <el-button type="warning" @click="router.push('/step2')">返回</el-button>
    </div>
    <div>
      <v-chart ref="chartRef"
               :option="option"
               @legendselectchanged="legendselectchanged"
               autoresize
               v-show="!editVisible"
               class="chart" />
      <div v-if="editVisible" class="chart">
        <div style="display: flex; gap:10px; align-items: center">
          <div style="display: flex;justify-content: flex-end;">
            <el-button v-if="false" size="small" @click="dialogVisible = false; editVisible = false; editType = true; rerender();">取消</el-button>
            <el-button size="small" type="primary" @click="render">确认修改</el-button>
          </div>
        </div>
        <el-switch
          v-model="editType"
          size="large"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-right: 20px;"
          active-text="json视图"
          inactive-text="表格视图"
          v-if="false"
        />
        <contenteditable-table ref="editTableRef" v-if="editType" :data="customDataObj" />
        <el-input v-if="!editType"
                  type="textarea"
                  style="padding-right: 20px"
                  :autosize="{ minRows: 5, maxRows: 1000 }"
                  v-model="customData"
                  placeholder="请输入数据" />
      </div>
    </div>

    <div style="display: none">
      <el-button @click="exportPNG" type="primary">导出png</el-button>
      <el-button @click="clear" type="primary">clear</el-button>
      <el-button @click="resize" type="primary">resize</el-button>
      <el-button @click="rerender" type="primary">重新渲染</el-button>
    </div>
    <div v-if="isHasData" style="position: absolute;top: 0px;right: 40px;">
      <el-link @click="edit" v-if="false"><Edit style="height: 1em"/>编辑数据</el-link>
      <el-switch
        v-model="editVisible"
        v-if="route.path === '/step3'"
        @change="rerender"
        size="large"
        class="ml-2"
        inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="数据"
        inactive-text="图表"
      />
    </div>
    <el-dialog title=""
               tip="'不用dialog了'"
               v-if="false"
               v-model="dialogVisible"
               style="width: 1200px;"
               append-to-body>
      <template #header>
        <!-- 这里可以放置任何自定义标题内容 -->
        <span style="font-size: 14px" @click="editType = !editType">{{ editType ? '转到json编辑' : '转到表格编辑' }}</span>
      </template>
      <!--      <el-table :data="list" stripe v-if="editType">-->
      <!--        <el-table-column v-for="(item, index) in columns" :key="index" :header-align="'center'">-->
      <!--          <template #header>-->
      <!--            <span v-if="!index">{{ item.label }}</span>-->
      <!--            <el-input v-if="index" v-model="item.label"/>-->
      <!--          </template>-->
      <!--          <template #default="scope">-->
      <!--            <el-input v-model="scope.row[item.label]" />-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--      </el-table>-->
      <contenteditable-table ref="editTableRef" v-if="editType" :data="customDataObj" />
      <el-input v-if="!editType" type="textarea" :autosize="{ minRows: 5, maxRows: 1000 }" v-model="customData" placeholder="请输入数据" />
      <div style="display: flex;justify-content: flex-end;margin-top: 20px">
        <el-button @click="dialogVisible = false; editType = true">取 消</el-button>
        <el-button type="primary" @click="render">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script setup>
import * as echarts from 'echarts'
import emitter from '@/utils/mitt.js'
import 'echarts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import ContenteditableTable from '@/components/echart/contenteditable-table.vue'
const router = useRouter()
const route = useRoute()

provide(THEME_KEY, 'light')
const dialogVisible = ref(false)
const editVisible = ref(false)
function edit() {
  dialogVisible.value = true
  editVisible.value = true
  console.log(customDataObj, 'obj')
  columns.value = ['指标', ...customDataObj.value.x.x_axis].map(i => { return { label: i } })
  list.value = Object.keys(customDataObj.value.y).map((key, index) => {
    return {
      '指标': key
    }
  })
  Object.values(customDataObj.value.y).forEach((val, index) => {
    val.forEach((v, i) => {
      list.value[index][customDataObj.value.x.x_axis[i]] = v
    })
  })
}
function render() {
  dialogVisible.value = false
  editVisible.value = false
  if (editType.value) {
    const obj = editTableRef.value.handleChange()
    obj.plot = customDataObj.value.plot
    editType.value && emitter.emit('changeData', { draw_data: obj })
    return
  }
  const obj = JSON.parse(customData.value)
  obj.plot = customDataObj.value.plot
  emitter.emit('changeData', { draw_data: obj })
}
const editTableRef = ref()

const dispose = () => {
  chartRef.value.dispose()
}
const clear = () => {
  chartRef.value.clear()
}
const resize = () => {
  nextTick(() => {
    chartRef.value.resize()
  })
}
const rerender = () => {
  clear()
  // nextTick(() => {})
  setTimeout(() => {
    chartRef.value.setOption(option.value)
  }, 10)
}
const legendselectchanged = (legend) => {
  emitter.emit('legendselectchanged', legend)
}
const tip = ref(false)
// 创建渐变色对象
const rgbColors = ['84, 112, 198', '145, 204, 117', '250, 200, 88', '238, 102, 102', '115, 192, 222', '59, 162, 114']
const customData = ref({})
const customDataObj = ref({})
const editType = ref(true)
const list = ref([])
const columns = ref([])
const isHasData = ref(true)
const reDraw = (data, msg) => {
  clear()
  loading.value = true
  // console.log(data, '图表数据', msg)
  if (!data.draw_data) return
  isHasData.value = true
  customData.value = JSON.stringify(data.draw_data, null, 2)
  customDataObj.value = data.draw_data
  const plot = data.draw_data.plot || 'line'
  console.log('图表类型', data.draw_data.plot)
  option.value.legend.data = Object.keys(data.draw_data.y)
  option.value.xAxis[0].data = data.draw_data.x.x_axis
  option.value.xAxis[0].axisLabel = {
    interval: 0,
    formatter: function(value) {
      let text
      const length = 8 // 文字显示长度
      if (value.length > length) {
        text = value.slice(0, length) + '…'
      } else {
        text = value
      }
      if (data.draw_data.x.x_axis.length < 10) {
        return text
      }
      return text.split('').join('\n') // 垂直显示
    }
  }
  option.value.series = []
  let count = 0
  for (const datum in data.draw_data.y) {
    const gradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: 'rgba(' + rgbColors[count % 6] + ', 1)' // 起始颜色
    }, {
      offset: 1,
      color: 'rgba(' + rgbColors[count % 6] + ', 0.3)' // 结束颜色，透明度为0
    }])
    count++
    option.value.series.push({
      name: datum,
      // type: Math.random() > 0.5 ? 'bar' : 'line',
      type: plot === 'pie' ? 'bar' : plot,
      // stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      roundCap: true, // 设置圆角
      data: data.draw_data.y[datum],
      itemStyle: {
        // 修改柱子圆角
        borderRadius: 10, // 设置柱子圆角
        color: gradient // 设置渐变色为填充色
      }
    })
  }
  rerender()
}
function setTip(flag) {
  tip.value = flag
  editVisible.value = false
}
defineExpose({ setTip, reDraw, dispose, clear, resize, legendselectchanged, getDataURL: () => chartRef.value.getDataURL() })

const option = ref({
  title: {
    // text: 'Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: [
      // 'Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'
    ]
  },
  toolbox: {
    feature: {
      // saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        interval: 0,
        formatter: function(value) {
          let text
          const length = 8 // 文字显示长度
          if (value.length > length) {
            text = value.slice(0, length) + '…'
          } else {
            text = value
          }
          return text.split('').join('\n') // 垂直显示
        }
      },
      // boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    // {
    //   name: 'Email',
    //   type: 'bar',
    //   stack: 'Total',
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [120, 132, 101, 134, 90, 230, 210]
    // }
  ]
})
const chartRef = ref()
const loading = ref(true)
const exportPNG = async() => {
  const picInfo = chartRef.value.getDataURL({
    type: 'png',
    pixelRatio: 1, // 放大两倍下载，之后压缩到同等大小展示。解决生成图片在移动端模糊问题
    backgroundColor: '#fff'
  }) // 获取到的是一串base64信息
  console.log('picInfo', picInfo)
  const elink = document.createElement('a')
  elink.download = '仪表盘'
  elink.style.display = 'none'
  elink.href = picInfo
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
}
const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => {
      return null
      // return {
      //   draw_data: {
      //     x: {
      //       x_axis: []
      //     },
      //     y: { }
      //   }
      // }
    }
  }
})
onActivated(() => {
  isHasData.value = false
})
onMounted(() => {
  // 设置overflow: auto;后就不需要resize了
  // window.addEventListener('resize', () => {
  //   console.log('resize......', props.data.tip)
  //   chartRef.value.resize()
  // }
  if (props.data) {
    reDraw(props.data)
  }
})
</script>

<style lang="scss" scope>
.chart-container {
  margin: 20px 0;
  background-color: #fff;
  position: relative;
  //padding: 20px;

  .chart {
    height: 442px;
    overflow: auto;
  }
}
</style>
