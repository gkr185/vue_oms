<template>
    <div class="xwzx-sec1">
      <div class="b-title font-num">Latest Courses</div>
  
      <div class="swiper akiswiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(course, index) in courses" :key="index">
            <a href="javascript:;" class="item" @click="goToCourseDetail(course.id)">
              <img :src="course.image || 'default.jpg'" :alt="`课程: ${course.name || '未知课程'}`" />
            </a>
          </div>
        </div>
      </div>
  
      <div class="swiper-pagination"></div>
    </div>
  </template>


<script>
import { mapGetters, mapActions } from 'vuex';
import Swiper from '../swiper/swiper-bundle.min.js';
import '../swiper/swiper-bundle.min.css';
export default {
  computed: {
    ...mapGetters(['getAllCourses']), // 使用 Vuex getter 获取所有课程
    courses() {
      return this.getAllCourses; // 从 Vuex 中动态获取课程数据
    }
  },
  mounted() {
    // 初始化Swiper
    new Swiper('.akiswiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
  methods: {
    ...mapActions(['fetchCourses']), // Vuex 的 action
    goToCourseDetail(courseId) {
      if (!this.$store.getters.getRole) {
        this.$message.error('请先登录用户账号！');
        this.$router.push('/login');
        return;
      }
      this.$router.push(`/course/${courseId}`);
    }
  },
  created() {
    // 在组件创建时调用 Vuex 的 action 来加载所有课程
    this.fetchCourses();
  }

};
</script>

<style>
.xwzx-sec1 {
  padding-top: 6.25vw;
  margin-left: 25.01vw;
  overflow: hidden;
}

.xwzx-sec1 .b-title {
  text-align: right;
  font-size: 6.04vw;
  color: #dfdfdf;
  font-style: italic;
  line-height: 0.84;
  padding-right: 1.82vw;
  text-transform: uppercase;
}

.xwzx-sec1 .akiswiper {
  margin-top: 4.95vw;
  width: 100vw;
}

.xwzx-sec1 .akiswiper .swiper-slide {
  width: 26.84vw;
  margin-right: 2.0vw !important;
}

.xwzx-sec1 .akiswiper a.item {
  display: block;
  width: 100%;
  border-radius: 0 2.08vw 0 2.08vw;
  overflow: hidden;
}

.xwzx-sec1 .akiswiper a.item img {
  width: 100%;
  height: 13.33vw;
  object-fit: cover;
}

.xwzx-sec1 .swiper-pagination {
  position: static !important;
  margin: 1.56vw 0 0 1.82vw !important;
  width: auto !important;
  display: flex;
  align-items: center;
}

.xwzx-sec1 .swiper-pagination span {
  display: block;
  width: 0.60vw;
  height: 0.60vw;
  margin: 0 0.83vw 0 0 !important;
  background: #323333;
  border: 0.16vw solid #1f1f1f !important;
  opacity: 1;
  transition: all 0.3s ease;
}
.swiper-slide swiper-slide-active{
  margin-right: 40px !important;
}

.xwzx-sec1 .swiper-pagination span.swiper-pagination-bullet-active {
  border-color: #323333 ;
  background: #d8fa00 !important;
}
</style>