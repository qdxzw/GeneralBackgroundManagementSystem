<template>
  <div class="common-layout login">
    <el-container class="login_content">
      <el-header>
        <h2>欢迎来到通用后台管理系统</h2>
      </el-header>
      <el-main>
        <div class="formData">
          <el-tabs type="border-card" stretch="true">
            <el-tab-pane label="登录" style="text-align: center">
              <el-form
                ref="loginFormRef"
                style="max-width: 400px"
                :model="loginForm"
                label-width="auto"
                class="demo-ruleForm"
                size="large"
                status-icon
              >
                <el-form-item
                  label="账号"
                  prop="account"
                  :rules="[
                    {
                      required: true,
                      message: '账号不能为空',
                      trigger: 'blur'
                    },
                    {
                      min: 6,
                      max: 12,
                      message: '账号长度为6-12个字符',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    v-model="loginForm.account"
                    placeholder="请输入账号"
                  />
                </el-form-item>
                <el-form-item
                  label="密码"
                  prop="password"
                  :rules="[
                    {
                      required: true,
                      message: '密码不能为空',
                      trigger: 'blur'
                    },
                    {
                      min: 6,
                      max: 12,
                      message: '密码长度为6-12个字符',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <p @click="openForget">忘记密码</p>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="submitLogin(loginFormRef)"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册">
              <el-form
                ref="registerFormRef"
                style="max-width: 400px"
                :model="registerForm"
                label-width="auto"
                class="demo-ruleForm"
                size="large"
                status-icon
              >
                <el-form-item
                  label="账号"
                  prop="account"
                  :rules="[
                    {
                      required: true,
                      message: '账号不能为空',
                      trigger: 'blur'
                    },
                    {
                      min: 6,
                      max: 12,
                      message: '账号长度为6-12个字符',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    v-model="registerForm.account"
                    placeholder="请输入账号"
                  />
                </el-form-item>
                <el-form-item
                  label="密码"
                  prop="password"
                  :rules="[
                    {
                      required: true,
                      message: '密码不能为空',
                      trigger: 'blur'
                    },
                    {
                      min: 6,
                      max: 12,
                      message: '密码长度为6-12个字符',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    type="password"
                    v-model="registerForm.password"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <el-form-item
                  label="重复密码"
                  prop="checkPassword"
                  :rules="[
                    {
                      required: true,
                      message: '重复密码不能为空',
                      trigger: 'blur'
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (value === '') {
                          callback(new Error('Please input the password again'))
                        } else if (value !== registerForm.password) {
                          callback(new Error('两次密码不一样'))
                        } else {
                          callback()
                        }
                      },
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    type="password"
                    v-model="registerForm.checkPassword"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="submitRegister(registerFormRef)"
                    >注册</el-button
                  >
                </el-form-item>
              </el-form></el-tab-pane
            >
          </el-tabs>
        </div></el-main
      >
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
  <forget ref="forgetP" />
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import forget from './compoent/forget_password.vue'
// 忘记密码弹层显示
const dialogVisible = ref(false)
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  account: '',
  password: ''
})

const submitLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}
const forgetP = ref()
const openForget = () => {
  forgetP.value.open()
}
const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
  account: '',
  password: '',
  checkPassword: ''
})

const submitRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  width: 1200px;
  margin: auto;
  text-align: center;
}
.formData {
  margin: 0 auto;
  width: 40%;
  p {
    text-align: right;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
