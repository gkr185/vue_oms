<!-- src/components/Hot.vue -->
<template>
  
    <div class="hot-courses">
      <div ><h2></h2></div>
      <button @click="goToHotDetails">更多热门课程</button>
    </div>
    <div class="course-grid">
      <CourseCard
        v-for="course in displayedCourses"
        :key="course.id"
        :course="course"
      />
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CourseCard from './CourseCard.vue';

export default {
  components: { CourseCard },
  computed: {
    ...mapGetters(['getHotCourses']),
    displayedCourses() {
      // 随机选择
      return this.getHotCourses
        .sort(() => 0.5 - Math.random())  // 随机排序
        .slice(0, 6); 
    }
  },
  methods: {
    ...mapActions(['fetchCourses']), // 引入 Vuex action
    goToHotDetails() {
      this.$router.push('/hotCourses');
    }
  },
  created() {
    // 在组件创建时调用 Vuex 的 action 来加载所有课程
    this.fetchCourses();
  }
};
</script>

<style scoped>
.hot-courses {
  display:flex;
  padding: 20px;
  justify-content: space-between;
}
.hott {
  text-align: center;
  font-weight: 900;
  font-size: 35px;
  color: #f3f3f3;
  line-height: 100px;
  width: 300px;
  height: 100px;
  background: url("../assets/background.jpg");
  border-radius: 100px; /* 添加圆角 */
  border: 5px solid #d8fa00; /* 添加黑色边框 */
}

.course-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
  