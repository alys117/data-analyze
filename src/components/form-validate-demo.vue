<template>
  <div>
    <el-form :model="form" ref="forms" :rules="rules">
      <el-form-item label="买家姓名" prop="buyerName">
        <el-input v-model="form.buyerName"/>
      </el-form-item>
      <el-table :data="voList">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="序号" align="center" type="index" width="100">
          <template #default="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称">
          <template v-slot="scope">
            <el-form-item :prop="'voList.'+scope.$index+'.goodsName'">
              <el-input v-model="scope.row.goodsName"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="价格">
          <template v-slot="scope">
            <el-form-item :prop="'voList.'+scope.$index+'.unitPrice'" :rules="rules.unitPrice">
              <el-input v-model="scope.row.unitPrice"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="数量">
          <template v-slot="scope">
            <el-form-item :prop="'voList.'+scope.$index+'.num'" :rules="rules.num">
              <el-input v-model="scope.row.num"/>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="success"
               @click="voList.push({
                 goodsName: null,
                 num: null,
                 unitPrice: null
               })">add</el-button>
    <el-button type="primary" @click="getData">remote</el-button>
    <el-button type="primary" @click="reset">reset</el-button>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
const data = reactive({
  form: {
    id: 1,
    documentNo: null,
    buyerName: '服务技术',
    voList: [
      {
        goodsName: '黄金',
        num: 1,
        unitPrice: 291.37
      },
      {
        goodsName: '花生',
        num: 1,
        unitPrice: 8.55
      }
    ]
  },
  rules: {
    buyerName: [{ required: true, message: '买家姓名不能为空', trigger: 'blur' }],
    num: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
    unitPrice: [{ required: true, message: '单价不能为空', trigger: 'blur' }]
  }
})
const { form, rules } = toRefs(data)
const voList = form.value.voList
function getData() {
  const remoteData = {
    id: 2,
    buyerName: '服务技术2',
    voList: [{
      goodsName: '豆腐',
      num: 4,
      unitPrice: 8.45
    }]
  }
  voList.length = 0
  voList.push(...remoteData.voList)
  delete remoteData.voList
  Object.assign(form.value, remoteData)
}
function reset() {
  Object.assign(form.value, {
    id: null,
    buyerName: null,
    documentNo: null
  })
  voList.length = 0
  proxy.resetForm('forms')
}
</script>
