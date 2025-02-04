<template>
  <div>
    <el-button type="primary" @click="openAddDialog">添加课程</el-button>

    <el-table :data="courses" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="课程名称"></el-table-column>
      <el-table-column prop="categoryId" label="分类ID" width="120"></el-table-column>
      <el-table-column prop="duration" label="时长" width="100"></el-table-column>
      <el-table-column label="图片">
        <template #default="{ row }">
          <el-image :src="row.image" style="width: 100px; height: 100px;" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="isHot" label="热门" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isHot ? 'success' : 'info'">{{ row.isHot ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editCourse(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteCourse(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="currentCourse" :rules="formRules" ref="formRef">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="currentCourse.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分类ID" prop="categoryId">
          <el-input v-model="currentCourse.categoryId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="时长" prop="duration">
          <el-input v-model="currentCourse.duration" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-input v-model="currentCourse.image" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="currentCourse.description" type="textarea" rows="4" />
        </el-form-item>
        <el-form-item label="热门" prop="isHot">
          <el-switch v-model="currentCourse.isHot" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="currentCourse.price" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCourse">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';

// 数据与状态
const store = useStore();
const courses = computed(() => store.state.courses);
const currentCourse = ref({});
const dialogVisible = ref(false);
const formLabelWidth = '120px';
const formRef = ref(null);

// 动态标题
const dialogTitle = computed(() =>
  currentCourse.value.id ? '编辑课程' : '添加课程'
);

// 表单验证规则
const formRules = {
  name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请输入分类ID', trigger: 'blur' }],
  duration: [{ required: true, message: '请输入课程时长', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片URL', trigger: 'blur' }],
  description: [{ required: true, message: '请输入课程描述', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
};

// 加载课程数据
onMounted(() => {
  store.dispatch('fetchCourses');
});

// 打开添加课程对话框
const openAddDialog = () => {
  currentCourse.value = {
    name: '',
    categoryId: '',
    duration: '',
    image: '',
    description: '',
    isHot: false,
    price: '',
  };
  dialogVisible.value = true;
};

// 编辑课程
const editCourse = (row) => {
  currentCourse.value = { ...row };
  dialogVisible.value = true;
};

// 删除课程
const deleteCourse = (id) => {
  store
    .dispatch('deleteCourse', id)
    .then(() => {
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.error('删除失败，请稍后重试');
    });
};

// 保存课程
const saveCourse = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    const action = currentCourse.value.id ? 'updateCourse' : 'addCourse';
    store
      .dispatch(action, currentCourse.value)
      .then(() => {
        ElMessage.success(`${dialogTitle.value}成功`);
        dialogVisible.value = false;
        currentCourse.value = {}; // 重置表单
      })
      .catch(() => {
        ElMessage.error(`${dialogTitle.value}失败，请稍后重试`);
      });
  });
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

.el-table {
  margin-top: 20px;
}

.el-image {
  border-radius: 8px;
}

.el-input {
  width: 100%;
}
</style>