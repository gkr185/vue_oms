<template>
  <div class="order-page" >
    <!-- 加载提示，当正在获取订单数据时显示 -->
    <div v-if="loading" class="loading">正在加载订单信息，请稍候...</div>
    <!-- 订单信息表格 -->
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="id" label="订单ID" width="180"></el-table-column>
      <el-table-column prop="courseName" label="商品名称"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column prop="totalPrice" label="总价"></el-table-column>
      <!-- 可以根据实际需求添加更多订单相关字段对应的列 -->
    </el-table>
    <!-- 错误提示，当获取订单数据出错时显示 -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 订单列表数据，使用ref响应式地存储数据
const orderList = ref([]);
// 加载状态，用于显示加载提示，初始为false，表示未开始加载
const loading = ref(false);
// 错误信息，用于显示获取数据出错时的提示内容，初始为空字符串
const errorMessage = ref('');

// 页面挂载时获取订单列表数据
onMounted(() => {
  fetchOrderList();
});

// 获取订单列表数据的函数
const fetchOrderList = () => {
  loading.value = true; // 设置加载状态为true，显示加载提示
  axios.get('http://localhost:3000/orders') // 向JSON Server的/orders接口请求订单数据
    .then(response => {
      orderList.value = response.data; // 获取成功，将返回的数据赋值给orderList
      loading.value = false; // 加载完成，设置加载状态为false，隐藏加载提示
    })
    .catch(error => {
      console.error(error);
      errorMessage.value = '获取订单信息失败，请稍后重试'; // 设置错误信息内容
      loading.value = false; // 即使出错，也设置加载状态为false，避免一直显示加载提示
    });
};
</script>

<style scoped>
/* 局部样式，用于美化页面显示效果 */
.order-page {
  margin-top: 200px;
  padding: 20px;
}

.loading {
  text-align: center;
  margin: 20px 0;
  color: #666;
}

.error {
  text-align: center;
  margin: 20px 0;
  color: red;
}
</style>