<template>
  <!-- Header -->
  <Header :is-logo-active="isLogoActive"/>
  <router-view/>
   <!-- Footer -->
   <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';



  export default {
    name:'App',
    data(){
      return {
        isDataLoaded: false, // 用于标记数据是否加载完成
        isLogoActive: false,// 用于全局控制 Logo 的显示状态
      };
    },
    components: {
    Header,
    Footer,
  },
  created() {
    // 加载全局需要的数据
    this.loadInitialData();
  },
  methods: {
    async loadInitialData() {
      try {
        // 并行加载所有需要的数据
        await Promise.all([
          this.$store.dispatch('fetchCategories'),
          this.$store.dispatch('fetchCourses'),
        ]);
        this.isDataLoaded = true; // 数据加载完成后，更新状态
      } catch (error) {
        console.error('数据加载失败:', error);
      }
    },
    handleScroll() {
      this.isLogoActive = window.scrollY > 550; // 检查全局滚动位置
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 监听全局滚动事件
    this.handleScroll(); // 初始化检查滚动位置
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll); // 移除监听器，避免内存泄漏
  },
  
}
</script>

<style >
  #app {
  margin: 0;
  padding: 0;
  background-color: rgb(238, 238, 238);
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu, sans-serif;
}
*{
  margin: 0;
  padding: 0;
  
}

</style>
