<template>
  <div class="user-profile">
    <h2>个人信息</h2>
    <p><strong>用户名:</strong> {{ userInfo.username }}</p>
    <p><strong>角色:</strong> {{ userRole }}</p>
    <p><strong>手机号:</strong> {{ userInfo.phone }}</p>
    <p><strong>收货地址:</strong> {{ userInfo.address }}</p>

    <el-divider />

    <h3>修改信息</h3>
    <el-form :model="form" label-width="100px">
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" placeholder="请输入新密码" type="password" />
      </el-form-item>
      <el-form-item label="新手机号">
        <el-input v-model="form.newPhone" placeholder="请输入新手机号" />
      </el-form-item>
      <el-form-item label="新收货地址">
        <el-input v-model="form.newAddress" placeholder="请输入新收货地址" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      form: {
        newPassword: '',
        newPhone: '',
        newAddress: '',
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getCurrentUser || { username: '未知', phone: '', address: '' };
    },
    userRole() {
      const role = this.$store.getters.getRole;
      return role === 'admin' ? '管理员' : role === 'user' ? '普通用户' : '未知';
    },
  },
  methods: {
    async updateInfo() {
      const { id } = this.userInfo;
      const { newPassword, newPhone, newAddress } = this.form;

      try {
        if (newPassword) {
          await this.$store.dispatch('updatePassword_info', { id, newPassword });
          this.$message.success('密码修改成功！');
        }
        if (newPhone) {
          await this.$store.dispatch('updatePhone_info', { id, newPhone });
          this.$message.success('手机号修改成功！');
        }
        if (newAddress) {
          await this.$store.dispatch('updateAddress_info', { id, newAddress });
          this.$message.success('收货地址修改成功！');
        }

        this.form.newPassword = '';
        this.form.newPhone = '';
        this.form.newAddress = '';
      // 调用 fetchUser 刷新当前用户信息
      await this.$store.dispatch('fetchUser', id);
      this.$message.success('信息已刷新！');
    } catch (error) {
      console.error('更新失败:', error);
      this.$message.error('更新失败，请稍后重试！');
    }
    },
  },
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>