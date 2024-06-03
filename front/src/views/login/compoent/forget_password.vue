<template>
  <div>
    <!-- 忘记密码 -->
    <el-dialog
      v-model="state.forgetPasswordDialog"
      title="忘记密码"
      width="500"
      :before-close="handleClose"
    >
      <span>
        <el-form
          ref="forgetPasswordRef"
          style="max-width: 400px"
          :model="forgetPasswordForm"
          label-width="auto"
          class="demo-ruleForm"
          size="large"
          status-icon
        >
          <el-form-item
            label="输入您的注册账号"
            prop="account"
            :rules="[
              {
                required: true,
                message: '注册账号不能为空',
                trigger: 'blur'
              }
            ]"
          >
            <el-input v-model="forgetPasswordForm.account" />
          </el-form-item>
          <el-form-item
            label="输入您的个人邮箱"
            prop="email"
            :rules="[
              {
                required: true,
                message: '个人邮箱不能为空',
                trigger: 'blur'
              }
            ]"
          >
            <el-input type="email" v-model="forgetPasswordForm.email" />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="btnCancel(forgetPasswordRef)">取消</el-button>
          <el-button
            type="primary"
            @click="openChangePassword(forgetPasswordRef)"
          >
            下一步
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--修改密码 -->
    <el-dialog
      v-model="updatePasswordDialog"
      title="修改密码"
      width="500"
      :before-close="handleClose"
    >
      <span>
        <el-form
          ref="updatePasswordRef"
          style="max-width: 400px"
          :model="updatePasswordForm"
          label-width="auto"
          class="demo-ruleForm"
          size="large"
          status-icon
        >
          <el-form-item
            label="旧密码"
            prop="password"
            :rules="[
              {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
              }
            ]"
          >
            <el-input
              v-model="updatePasswordForm.password"
              placeholder="请输入旧密码"
            />
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="newPassword"
            :rules="[
              {
                required: true,
                message: '新密码不能为空',
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
              v-model="updatePasswordForm.newPassword"
              placeholder="请输入新密码"
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
                  } else if (value !== updatePasswordForm.newPassword) {
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
              v-model="updatePasswordForm.checkPassword"
              placeholder="请再一次输入新密码"
            />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="btnCancel(updatePasswordRef)">取消</el-button>
          <el-button type="primary" @click="btnOk(updatePasswordRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
const forgetPasswordRef = ref<FormInstance>()
const forgetPasswordForm = reactive({
  account: '',
  email: ''
})
const updatePasswordRef = ref<FormInstance>()
const updatePasswordDialog = ref(false)
const updatePasswordForm = reactive({
  password: '',
  newPassword: '',
  checkPassword: ''
})
// 关闭功能
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要退出吗？')
    .then(() => {
      // Reset form fields before closing the dialog
      if (forgetPasswordRef.value) {
        forgetPasswordRef.value.resetFields()
      }
      if (updatePasswordRef.value) {
        updatePasswordRef.value.resetFields()
      }
      done()
    })
    .catch(() => {
      // catch error
    })
}
// 取消功能
const btnCancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  updatePasswordDialog.value = false
  state.forgetPasswordDialog = false
}
// 打开修改密码弹窗
const openChangePassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      state.forgetPasswordDialog = false
      updatePasswordDialog.value = true
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 确定功能
const btnOk = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updatePasswordDialog.value = false
      formEl.resetFields()
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 控制弹窗默认关闭
const state = reactive({
  forgetPasswordDialog: false
})
// 打开弹窗
const open = () => {
  state.forgetPasswordDialog = true
}
defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>
