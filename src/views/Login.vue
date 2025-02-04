<template>
  <div class="page-login">
    <img src="../assets/login.png" alt="背景图片" />
    <div class="login-box">
      <div class="img">
        <img src="../assets/logo2.svg" alt="Logo" />
      </div>
      <div class="link font-hm">
        <a
          :class="{ active: loginForm.role === 'user' }"
          @click="selectRole('user')"
        >
          用户登录
        </a>
        <a
          :class="{ active: loginForm.role === 'admin' }"
          @click="selectRole('admin')"
        >
          管理员登录
        </a>
      </div>
      <form @submit.prevent="handleLogin">
        <input
          type="text"
          v-model="loginForm.username"
          placeholder="用户名"
        />
        <input
          type="password"
          v-model="loginForm.password"
          placeholder="密码"
        />
        <label>
          <input type="checkbox" v-model="agreement" />
          已阅读并同意
          <span>《用户协议》</span>
          <span>《隐私政策》</span>
        </label>
        <button class="font-hm" :disabled="!agreement">登录</button>
      </form>
      <div class="other">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">遇到问题</a>
      </div>
    </div>
  </div>
</template>
  
<script>
import '@/css/login.css';
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        role: 'user', // 当前角色
      },
      validRoles: ['admin', 'user'], // 合法角色
      agreement: false, // 用户是否同意协议
    };
  },
  methods: {
    selectRole(role) {
      this.loginForm.role = role;
      this.$message.info(`切换到${role === 'admin' ? '管理员登录' : '普通用户登录'}`);
    },
    handleLogin() {
      const { username, password, role } = this.loginForm;

      // 检查是否选择了合法的角色
      if (!this.validRoles.includes(role)) {
        this.$message.error('请选择正确的用户类型');
        return;
      }

      // 登录逻辑
      this.$store
        .dispatch('login', { username, password, role })
        .then(() => {
          this.$message.success(
            `欢迎${role === 'admin' ? '管理员' : '普通用户'}登录`
          );
          this.$router.push('/');
        })
        .catch((err) => {
          this.$message.error(err.message || '登录失败');
        });
    },
  },
};
</script>
  
  <style>
  </style>