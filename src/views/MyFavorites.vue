<template>
<div class="page-login" style="background-color: #1b1b1b;">
  <img src="../assets/sdda-detail2.png" alt="背景图片" />
  <div class="my-favorites">
    <h2>我的购物车</h2>
    <el-scrollbar height="300px">
    <ul class="course-list">
      <!-- 显示收藏的课程 -->
      <li v-for="course in favoriteCourses" :key="course.id" class="course-item">
        <div class="course-details">
          <h3>{{ course.name }}</h3>
          <img :src="course.image" alt="课程图片" class="course-image">
          <p>价格: ￥{{ course.price }}</p>
          <p>时长: {{ course.duration }} 分钟</p>

          <!-- 数量调整 -->
          <div class="quantity-control">
            <button @click="decreaseQuantity(course.id)">-</button>
            <span>{{ quantities[course.id] || 1 }}</span>
            <button @click="increaseQuantity(course.id)">+</button>
          </div>
        </div>

        <!-- 取消收藏按钮 -->
        <button @click="toggleFavorite(course.id)">取消收藏</button>
      </li>
    </ul>
  </el-scrollbar>
    <div class="total-duration">
      总时长: {{ totalDuration }} 分钟
    </div>
    <div class="total-price">
      总价: ￥{{ totalPrice }}
    </div> 

    <!-- 结算按钮 -->
     <div style="height: 100px;width: 250px; margin: 20px 0 0 auto;">
      <button class="btn" @click="checkout">结算</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MyFavorites',
  data() {
    return {
      quantities: {} // 记录每个课程的购买数量
    };
  },
  computed: {
    ...mapGetters(['getFavoriteCourses']),
    favoriteCourses() {
      return this.getFavoriteCourses || [];
    },
    totalDuration() {
      return this.favoriteCourses.reduce((total, course) => total + (course.duration || 0), 0);
    },
    totalPrice() {
      return this.favoriteCourses.reduce(
        (total, course) =>
          total + (course.price || 0) * (this.quantities[course.id] || 1),
        0
      );
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_FAVORITE']),
    toggleFavorite(courseId) {
      this.TOGGLE_FAVORITE(courseId);
      delete this.quantities[courseId]; // 移除对应数量
    },
    increaseQuantity(courseId) {
      if (!this.quantities[courseId]) this.quantities[courseId] = 1;
      this.quantities[courseId]++;
    },
    decreaseQuantity(courseId) {
      if (!this.quantities[courseId] || this.quantities[courseId] <= 1) {
        return;
      }
      this.quantities[courseId]--;
    },
    checkout() {
      this.$message.success("商品下单成功！");
    }
  }
};
</script>

<style>
.my-favorites {
  width: 800px;
  margin: 0px auto;
  position: absolute;
    top: 10%;
    z-index: 2;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(0.26vw);
    border-radius: 0.63vw;
    padding: 1.67vw 2.08vw;
    transition: all 0.3s ease;
}

.course-list {
  list-style: none;
  padding: 0;
}

.course-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
  justify-content: space-between;
}

.course-image {
  width: 100px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.course-list button {
  margin-left: 10px;
  padding: 5px 10px;
  color: #fff;
  background-color: #e63946;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.course-list button:hover {
  background-color: #d62839;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-control button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
}

.quantity-control span {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
}

.total-duration,
.total-price {
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
}

.checkout-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #45a049;
}
</style>