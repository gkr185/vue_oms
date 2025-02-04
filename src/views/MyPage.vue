<template>
    <div class="my-page">
      <nav>
        <router-link to="/mypage/profile">个人信息</router-link>
        <router-link to="/mypage/orders">订单管理</router-link>
      </nav>
      <!-- 子路由内容区域 -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyPage',
  };
  </script>
  
  <style scoped>
  .my-page {
    padding: 100px 20px 20px 20px;
  }
  
  nav {
    margin-bottom: 20px;
  }
  
  nav a {
    margin-right: 10px;
    text-decoration: none;
    color: #347ae2;
  }
  
  nav a.router-link-exact-active {
    font-weight: bold;
    color: #1d4ed8;
  }
  </style>