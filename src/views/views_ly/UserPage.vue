<template>
  <div>
    <!-- 用户信息表格 -->
    <el-table :data="userList" style="width: 100% ; margin-top:200px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column prop="address" label="收货地址"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <!-- 操作列，添加删除和更改按钮 -->
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="danger" @click="deleteUser(scope.row.id)" size="small">删除</el-button>
          <el-button type="success" @click="openEditDialog(scope.row)" size="small">更改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户按钮 -->
    <el-button type="primary" @click="openAddDialog" aria-label="点击添加新用户">添加用户</el-button>

    <!-- 添加用户对话框 -->
    <el-dialog v-model="addDialogVisible" title="添加用户" :before-close="handleAddDialogClose">
      <el-form :model="addForm" label-width="80px" ref="addFormRef" :rules="addFormRules">
        <el-form-item label="ID" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username" :rules="usernameRules">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="passwordRules">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="收货地址" prop="address" :rules="addressRules">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :rules="phoneRules">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">确定</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑用户" :before-close="handleEditDialogClose">
      <el-form :model="editForm" label-width="80px" ref="editFormRef" :rules="editFormRules">
        <el-form-item label="ID" prop="id">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username" :rules="usernameRules">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="passwordRules">
          <el-input v-model="editForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="收货地址" prop="address" :rules="addressRules">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :rules="phoneRules">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser">确定</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';

// 获取 Vuex 实例
const store = useStore();

// 表单和对话框的引用
const addFormRef = ref(null);
const editFormRef = ref(null);

// 用户列表数据
const userList = ref([]);

// 对话框显示状态
const addDialogVisible = ref(false);
const editDialogVisible = ref(false);

// 选中的用户
const selectedUser = ref(null);

// 添加用户表单数据
const addForm = reactive({
  id: '',
  username: '',
  password: '',
  role: '',
  address: '',
  phone: ''
});

// 编辑用户表单数据
const editForm = reactive({
  id: '',
  username: '',
  password: '',
  role: '',
  address: '',
  phone: ''
});

// 自定义验证规则
const usernameRules = [{ required: true, message: '请输入用户名', trigger: 'blur' }];
const passwordRules = [{ required: true, message: '请输入密码', trigger: 'blur' }];
const addressRules = [{ required: true, message: '请输入收货地址', trigger: 'blur' }];
const phoneRules = [{ required: true, message: '请输入电话号码', trigger: 'blur' }];
const roleRules = [{ required: true, message: '请选择角色', trigger: 'blur' }];

const addFormRules = reactive({
  username: usernameRules,
  password: passwordRules,
  address: addressRules,
  phone: phoneRules,
  role: roleRules
});

const editFormRules = reactive({
  username: usernameRules,
  password: passwordRules,
  address: addressRules,
  phone: phoneRules,
  role: roleRules
});

// 获取用户列表
const fetchUserList = () => {
  axios.get('http://localhost:3000/users')
    .then((response) => {
      userList.value = response.data.map(user => ({
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        address: user.address,
        phone: user.phone
      }));
    })
    .catch((error) => {
      console.error(error);
      ElMessage.error('获取用户列表失败，请稍后重试');
    });
};

// 添加用户
const addUser = () => {
  addFormRef.value.validate((valid) => {
    if (!valid) return;

    const userData = { ...addForm };
    axios.post('http://localhost:3000/users', userData)
      .then(() => {
        ElMessage.success('用户添加成功');
        addDialogVisible.value = false;
        fetchUserList();
      })
      .catch((error) => {
        console.error(error);
        ElMessage.error('用户添加失败，请稍后重试');
      });
  });
};

// 编辑用户
const updateUser = () => {
  editFormRef.value.validate((valid) => {
    if (!valid) return;

    const userData = { ...editForm };
    axios.put(`http://localhost:3000/users/${userData.id}`, userData)
      .then(() => {
        ElMessage.success('用户更新成功');
        editDialogVisible.value = false;
        fetchUserList();
      })
      .catch((error) => {
        console.error(error);
        ElMessage.error('用户更新失败，请稍后重试');
      });
  });
};

// 删除用户
const deleteUser = (id) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        ElMessage.success('用户删除成功');
        fetchUserList();
      })
      .catch((error) => {
        console.error(error);
        ElMessage.error('用户删除失败，请稍后重试');
      });
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

// 打开添加用户对话框
const openAddDialog = () => {
  addDialogVisible.value = true;
  Object.assign(addForm, {
    id: '',
    username: '',
    password: '',
    role: '',
    address: '',
    phone: ''
  });
};

// 打开编辑用户对话框
const openEditDialog = (user) => {
  editDialogVisible.value = true;
  Object.assign(editForm, { ...user });
};

// 对话框关闭前处理
const handleAddDialogClose = () => {
  addFormRef.value.resetFields();
};

const handleEditDialogClose = () => {
  editFormRef.value.resetFields();
};

// 表格选中行变化
const handleSelectionChange = (val) => {
  selectedUser.value = val.length > 0 ? val[0] : null;
};

// 页面加载时获取用户列表
onMounted(fetchUserList);
</script>

<style scoped>
/* 可以添加一些局部样式，用于美化该页面的显示效果，这里暂不详细写样式内容 */
</style>