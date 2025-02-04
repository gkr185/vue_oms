<template>
  <div class="header">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo dark"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="header__logo">
      <img src="../assets/logo.svg"   alt="" :class="{ active1: isLogoActive }" class="logo1"/>
      <img src="logo.jpg"   alt="" :class="{ active2: isLogoActive }" class="logo2"/>
    </el-menu-item>
    <el-menu-item index="1"><p>首页</p></el-menu-item>
    <el-menu-item index="2"><p>课程分类</p></el-menu-item>
    <el-menu-item index="3"><p>我的购物车</p></el-menu-item>
    <el-menu-item index="4"><p>个人信息</p></el-menu-item>
    <el-menu-item index="5" v-if="role === 'admin'"><p>管理员窗口</p></el-menu-item>
    <el-menu-item style="background-color: transparent; padding-bottom: 25px;">
      <div class="header-search">
        <el-input
          v-model="searchQuery"
          placeholder="搜索课程"
          class="search-input"
          @keyup.enter="performSearch"
          clearable
        >
          <template #append>
            <button @click="performSearch" ariadisabled="false" type="button" class="el-button is-circle" style="">
              <i class="el-icon" style=""><!--[-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1624 1500">
                  <path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"></path>
                </svg>
                <!--]--></i><!--v-if-->
              </button>
          </template>
        </el-input>
      </div>
    </el-menu-item>
    <el-menu-item style="background-color: transparent; padding-bottom: 30px;">
      <div class="header-buttons">
        <el-button v-if="!isLoggedIn" type="primary" @click="goToLogin" class="el-button el-button--success is-round" style="background-color: #d8fa00; color: #000;">登录</el-button>
        <el-dropdown v-else>
          <el-button type="success" class="el-button el-button--success is-text is-has-bg" style="background-color: #1b1b1b; color: #d8fa00;">
            {{ role === 'admin' ? '管理员' : '普通用户' }}
          </el-button>
          <template v-slot:dropdown>
            <div @click="handleLogout" >退出登录</div>
          </template>
        </el-dropdown>
      </div>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      searchQuery: '', // 搜索框的输入内容
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    role() {
      return this.$store.getters.getRole;
    },
  },
  methods: {
    handleSelect(key) {
      if ((key === '3' || key === '4') && this.role !== 'user') {
        this.$message.error('请先登录普通用户账号！');
        this.$router.push('/login');
        return;
      }
      switch (key) {
        case '1':
          this.$router.push('/');
          break;
        case '2':
          this.$router.push('/category');
          break;
        case '3':
          this.$router.push('/favorites');
          break;
        case '4':
          this.$router.push('/mypage');
          break;
        case '5':
          this.$router.push('/managementPage');
          break;
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    handleLogout() {
      this.$store.dispatch('logout');
      this.$message.success('您已退出登录');
      this.$router.push('/login');
    },
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.$message.warning('请输入搜索关键词');
        return;
      }
      this.$router.push({ path: '/category', query: { search: this.searchQuery } });
    },
  },
  props: {
    isLogoActive: {
      type: Boolean,
      required: true, // 从父组件接收滚动状态
    },
  },
};
</script>

<style>
.header{
  position: sticky;
    top: 0px;
    z-index: 99;
}
.el-menu-demo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 1rem;
  padding: 0 400px 0 100px;
  border-bottom: none !important;
  background-color: #1b1b1b!important; /* 深色背景 */
  color: #949494!important; /* 白色字体 */
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-left: 25%;
  margin-right: auto;
}

.header-buttons {
  float: right;
  margin: 10px 10px 5px 10px;
}

.header-search {
  float: right;
  margin-right: 20px;
  width: 300px;
}

.search-input {
  width: 100%;
}



 .header__logo  .logo1{
    width: 6.96vw;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.header__logo  .active1 {
    width: 6.96vw;
    opacity: 1;
}

 .header__logo  .logo2{
    position: absolute;
    top: 25%;
    left: 0;
    width: 8.96vw;
    height: auto;
    max-width: none;
    transform-origin: top left;
    transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

 .header__logo  .active2 {
    opacity: 0 ;
    transform: scale(0);
}






.el-menu-item {
  background-color: transparent !important; /* 保持透明，适配深色背景 */
}
.el-menu-item p {
  font-weight: 900;
  color: #888888 !important;
}

.el-menu-item p:hover{
  font-weight: 900;
  color:#000000!important;
}

.el-menu-item:nth-child(2):hover {
  background-color: #ffffff!important; /* 增加悬停效果 */
}
.el-menu-item:nth-child(3):hover {
  background-color: #ffffff!important; /* 增加悬停效果 */
}
.el-menu-item:nth-child(4):hover {
  background-color: #ffffff!important; /* 增加悬停效果 */
}
.el-menu-item:nth-child(5):hover {
  background-color: #ffffff!important; /* 增加悬停效果 */
}
.el-menu-item:nth-child(6):hover {
  background-color: #ffffff!important; /* 增加悬停效果 */
}


.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #d8fa00 !important;
}

.el-menu--horizontal>.el-menu-item.is-active p{
    color: #d8fa00 !important;
}


</style>