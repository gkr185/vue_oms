<template>
    <div class="order-management">
      <h2>订单管理</h2>
      <ul class="order-list">
        <li v-for="order in orders" :key="order.id" class="order-item">
          <div class="order-details">
            <h3>订单号: {{ order.id }}</h3>
            <p>课程: {{ order.courseName }}</p>
            <p>数量: {{ order.quantity }}</p>
            <p>总价: ￥{{ order.totalPrice }}</p>
          </div>
          <button @click="cancelOrder(order.id)">取消订单</button>
        </li>
      </ul>
      <p v-if="orders.length === 0">暂无订单</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderManagement',
    data() {
      return {
        orders: [
          // 示例订单数据
          {
            id: 1,
            courseName: "Vue.js 简介",
            quantity: 2,
            totalPrice: 198,
          },
          {
            id: 2,
            courseName: "Node.js 深入浅出",
            quantity: 1,
            totalPrice: 109,
          },
        ],
      };
    },
    methods: {
      cancelOrder(orderId) {
        this.orders = this.orders.filter((order) => order.id !== orderId);
        this.$message.success("订单已取消！");
      },
    },
  };
  </script>
  
  <style scoped>
  .order-management {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .order-list {
    list-style: none;
    padding: 0;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #fff;
  }
  
  .order-details {
    flex-grow: 1;
  }
  
  button {
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    background-color: #e63946;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #d62839;
  }
  </style>