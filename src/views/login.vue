<template>
  <el-card style="max-width: 480px;margin: 20% auto">
    <el-form :model="form" :rules="rules" ref="loginFormRef" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" clearable show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import { login, fetchUserinfo } from '@/api/request.js'
const router = useRouter()
const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const loginFormRef = useTemplateRef('loginFormRef')

const handleLogin = () => {
  loginFormRef.value.validate(async(valid) => {
    if (valid) {
      const res = await login({ username: form.value.username, password: form.value.password })
      if (res.status === 200) {
        const userStore = useUserStore()
        userStore.setToken(res.token)
        const userinfo = await fetchUserinfo()
        userStore.setUserinfo(userinfo)
        await router.push('/')
        ElMessage.success('登录成功')
      } else {
        // ElMessage.error(res.message)
      }
    } else {
      ElMessage.error('请填写完整的表单')
      return false
    }
  })
}

const handleReset = () => {
  loginFormRef.value.resetFields()
}

</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}
</style>
