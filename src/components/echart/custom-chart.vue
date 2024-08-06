<template>
  <div class="chart-container">
    <div style="display: flex;align-items: center" v-if="tip">
      <span style="margin: 10px;padding: 10px; background-color: #fdfdfd;font-size: 20px;font-family: 'Microsoft YaHei UI'">问题不能满足哟，麻烦修改后再分析</span>
      <el-button type="warning" @click="router.push('/step2')">返回</el-button>
    </div>
    <v-chart ref="chartRef"
             :option="option"
             @legendselectchanged="legendselectchanged"
             autoresize
             class="chart" />
    <div style="display: none">
      <el-button @click="exportPNG" type="primary">导出png</el-button>
      <el-button @click="clear" type="primary">clear</el-button>
      <el-button @click="resize" type="primary">resize</el-button>
    </div>
    <div v-if="isHasData" style="position: absolute;top: 0px;left: 0px;">
      <el-link @click="edit"><Edit style="height: 1em"/>编辑数据</el-link>
    </div>
    <el-dialog title="编辑数据" v-model="dialogVisible" append-to-body>
      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 1000 }" v-model="customData" placeholder="请输入数据" />
      <div style="display: flex;justify-content: flex-end;margin-top: 20px">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="render">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script setup>
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { PieChart, LineChart, BarChart } from 'echarts/charts'
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   ToolboxComponent,
//   GridComponent
// } from 'echarts/components'
// use([
//   CanvasRenderer,
//   PieChart,
//   LineChart,
//   BarChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   ToolboxComponent,
//   GridComponent
// ])
import * as echarts from 'echarts'
import emitter from '@/utils/mitt.js'
import 'echarts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { Edit } from '@element-plus/icons-vue'
const router = useRouter()

provide(THEME_KEY, 'light')
const dialogVisible = ref(false)
function edit() {
  dialogVisible.value = true
}
function render() {
  dialogVisible.value = false
  emitter.emit('changeData', { draw_data: JSON.parse(customData.value) })
}
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
const legendselectchanged = (legend) => {
  emitter.emit('legendselectchanged', legend)
}
function hexToRgb(hex, prefix = 'rgba(', suffix = ')') {
  // 确保我们有一个有效的十六进制字符串
  hex = hex.replace('#', '')
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color')
  }
  // 将十六进制转换为十进制
  var r = parseInt(hex.substring(0, 2), 16)
  var g = parseInt(hex.substring(2, 4), 16)
  var b = parseInt(hex.substring(4, 6), 16)
  return r + ', ' + g + ', ' + b
}
const tip = ref(false)
// 创建渐变色对象
const rgbColors = ['84, 112, 198', '145, 204, 117', '250, 200, 88', '238, 102, 102', '115, 192, 222', '59, 162, 114']
const customData = ref({})
const isHasData = ref(false)
const reDraw = (data, msg) => {
  clear()
  loading.value = true
  // console.log(data, '图表数据', msg)
  if (!data.draw_data) return
  isHasData.value = true
  customData.value = JSON.stringify(data.draw_data, null, 2)
  option.value.legend.data = Object.keys(data.draw_data.y)
  option.value.xAxis[0].data = data.draw_data.x.x_axis
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
      type: 'bar',
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
}
function setTip(flag) {
  tip.value = flag
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
    height: 500px;
  }
}
</style>
