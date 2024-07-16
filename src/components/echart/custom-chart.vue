<template>
  <div class="pie-chart-container">
    <v-chart ref="chartRef" :option="option" autoresize class="chart" />
    <div>
      <el-button @click="aaa">aaa</el-button>
      <el-button @click="exportPNG">导出png</el-button>
      {{ chartData + '---' }}
    </div>
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

import 'echarts'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

provide(THEME_KEY, 'light')
const reDraw = (data) => {
  console.log('reDraw', data)
  option.value.series[0].data[0] = 190
}
defineExpose({ reDraw })

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
    // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
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
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]
})

const chartRef = ref()
const aaa = () => {
  console.log('aaa', chartRef.value)
  chartRef.value.resize()
}
const exportPNG = async() => {
  const picInfo = chartRef.value.getDataURL({
    type: 'png',
    pixelRatio: 1.5, // 放大两倍下载，之后压缩到同等大小展示。解决生成图片在移动端模糊问题
    backgroundColor: '#fff'
  }) // 获取到的是一串base64信息
  const elink = document.createElement('a')
  elink.download = '仪表盘'
  elink.style.display = 'none'
  elink.href = picInfo
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
}
</script>

<style lang="scss" scope>
.pie-chart-container {
  margin: 20px;
  background-color: #fff;
  //padding: 20px;

  .chart {
    height: 500px;
  }
}
</style>
