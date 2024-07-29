<template>
  <div class="pie-chart-container">
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

provide(THEME_KEY, 'light')

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
// 创建渐变色对象
const gradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0,
  color: 'rgba(0, 0, 255, 1)' // 起始颜色
}, {
  offset: 1,
  color: 'rgba(0, 0, 255, 0)' // 结束颜色，透明度为0
}]);
const reDraw = (data, msg) => {
  loading.value = true
  console.log(data, '图表数据', msg)
  if (!data.draw_data) return
  option.value.legend.data = Object.keys(data.draw_data.y)
  option.value.xAxis[0].data = data.draw_data.x.x_axis
  option.value.series = []
  for (const datum in data.draw_data.y) {
    option.value.series.push({
      name: datum,
      type: Math.random() > 0.5 ? 'bar' : 'line',
      // stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      roundCap: true, // 设置圆角
      data: data.draw_data.y[datum],
      itemStyle: {
        // 修改柱子圆角
        barBorderRadius: 10, // 设置柱子圆角
        color: gradient // 设置渐变色为填充色
      }
    })
  }
}
defineExpose({ reDraw, dispose, clear, resize, legendselectchanged, getDataURL: () => chartRef.value.getDataURL() })

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
      return {
        draw_data: {
          x: {
            x_axis: []
          },
          y: { }
        }
      }
    }
  }
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
.pie-chart-container {
  margin: 20px 0;
  background-color: #fff;
  //padding: 20px;

  .chart {
    height: 500px;
  }
}
</style>
