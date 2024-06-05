<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="150px">
        <el-menu router="true">
          <div class="title">通用后台管理系统</div>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><location /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="3-1">产品管理员</el-menu-item>
              <el-menu-item index="3-2">用户管理员</el-menu-item>
              <el-menu-item index="3-3">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="3-4">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><location /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="4-1">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="4-2">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><location /></el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="5-1">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="5-2">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="6">
            <el-icon><icon-menu /></el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <el-icon><icon-menu /></el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-menu-item index="8">
            <el-icon><icon-menu /></el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="9">
            <el-icon><icon-menu /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <span>尊敬的 杜威 欢迎你登录本系统</span>
            </el-col>
            <el-col :span="12">
              <el-row type="flex" class="right">
                <el-icon><Message /></el-icon>
                <el-avatar :size="24" :src="circleUrl" />
                <el-dropdown>
                  <span> 设置 </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>设置账号</el-dropdown-item>
                      <el-dropdown-item>更改头像</el-dropdown-item>
                      <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown></el-row
              >
            </el-col>
          </el-row>
        </el-header>
        <el-main style="width: 1000px"> <RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const { circleUrl } = toRefs(state)
</script>

<style lang="scss" scoped>
.el-header {
  height: 50px;
  line-height: 50px;
}
.right {
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
  .el-avatar {
    margin: 0 15px;
  }
  .el-dropdown span:hover {
    border: 0px;
  }
}
</style>
