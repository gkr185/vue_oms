<template>
  <el-container style="height: 100vh;">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <el-menu
        active-text-color="#409Eff"
        background-color="#1b1b1b"
        text-color="#fff"
        unique-opened
      >
        <el-menu-item index="/managementPage/user">
          <router-link to="/managementPage/user">
            <el-icon class="el-icon-user" />
            用户管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="/managementPage/order">
          <router-link to="/managementPage/order">
            <el-icon class="el-icon-document" />
            订单管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="/managementPage/courseManagement">
          <router-link to="/managementPage/courseManagement">
            <el-icon class="el-icon-notebook-2" />
            课程管理
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区域 -->
    <el-main style="background-color: #f5f5f5; padding: 20px;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<style scoped>
/* 侧边栏样式 */
.el-aside {
  background-color: #1b1b1b; /* 深色背景 */
}

/* Menu 样式 */
.el-menu {
  border-right: none;
}

.el-menu-item,
.el-submenu__title {
  font-size: 14px; /* 调整字体大小 */
  color: #fff; /* 白色字体 */
}

.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #ffffff !important; /* 悬停时背景 */
  color: #000  !important;
}




/* 主内容区样式 */
.el-main {
  background-color: #f5f5f5; /* 浅灰色背景 */
  padding: 20px;
  color: #333; /* 文字颜色 */
}

.router-link-active {
  text-decoration: none;
  color: #d8fa00;
}
a {
  text-decoration: none;
  color: #fff;
}

a :hover{
  text-decoration: none;
  color: #000000;
}

</style>