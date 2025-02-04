<!-- src/views/HotCourses.vue -->
<template>
              <div class="page-hot1">
                    <div class="page-title-box">
                        <img src="../assets/page-bg.png" class="page-bg" alt="">
                        <div class="page-title font-num">
                            <div class="title-box">
                                <div class="cn font-hm">热门</div>
                                <div class="en">ALLClassification</div>
                                <div class="num">01</div>
                            </div>
                        </div>
                    </div>
                    <div class="hlll">
                        
                    </div>
                <div class="hot1">
                  <div class="hot-courses-page">
                    <div class="course-grid">
                      <CourseCard
                        v-for="course in hotCourses"
                        :key="course.id"
                        :course="course"
                      />
                    </div>
                  </div>
                </div>
                <div class="page-zhuangshi-right">
                    <img src="../assets/page-zhuangshi.png" alt="">
                </div>
            </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import CourseCard from '@/components/CourseCard.vue';
  
  export default {
    name: 'HotCourses',
    components: { CourseCard },
    computed: {
      ...mapGetters(['getHotCourses']),
      hotCourses() {
        return this.getHotCourses;
      }
    }
  };
  </script>
  
  <style scoped>
  .hot-courses-page {
    padding: 20px;
  }
  .course-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>