<template>
    <div class="page-hot1">
                    <div class="page-title-box">
                        <img src="../assets/page-bg.png" class="page-bg" alt="">
                        <div class="page-title font-num">
                            <div class="title-box">
                                <div class="cn font-hm">课程分类</div>
                                <div class="en">Classification</div>
                                <div class="num">02</div>
                            </div>
                        </div>
                    </div>
                    <div class="hlll">
                        
                    </div>
                <div class="hot1">
                  <div class="cate">
                        <a
                          href="javascript:;"
                          :class="{ active: selectedCategoryId === null }"
                          @click="selectCategory(null)"
                        >
                          全部
                        </a>
                        <a
                          v-for="category in categories"
                          :key="category.id"
                          href="javascript:;"
                          :class="{ active: selectedCategoryId === category.id }"
                          @click="selectCategory(category.id)"
                        >
                          {{ category.name }}
                        </a>
                      </div>
                    <div class="item-all">
                      <CourseCard
                        v-for="course in filteredCourses"
                        :key="course.id"
                        :course="course"
                      />
                    </div>
                </div>
                <div class="page-zhuangshi-right">
                    <img src="../assets/page-zhuangshi.png" alt="">
                </div>
            </div>
  </template>
  
  <script>
  import CourseCard from '@/components/CourseCard.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Category',
    components: {
      CourseCard
    },
    data() {
      return {
        selectedCategoryId: null // 初始状态下显示所有课程
      };
    },
    computed: {
      ...mapGetters(['getAllCategories', 'getCoursesByCategoryId', 'getAllCourses']),
      categories() {
        return this.getAllCategories;
      },
      filteredCourses() {
        const searchQuery = this.$route.query.search?.toLowerCase();
        const courses = this.selectedCategoryId
          ? this.getCoursesByCategoryId(this.selectedCategoryId)
          : this.getAllCourses;
  
          console.log('Selected Category ID:', this.selectedCategoryId);
          console.log('All Courses:', this.getAllCourses);
          console.log('Filtered Courses by Category:', courses);
        // 如果存在搜索关键词，进行过滤
        if (searchQuery) {
          return courses.filter(course =>
            course.name.toLowerCase().includes(searchQuery) ||
            course.description.toLowerCase().includes(searchQuery)
          );
      }

      return courses;
    },
    },
    methods: {
      selectCategory(categoryId) {
        this.selectedCategoryId = categoryId;
      }
    }
  };
  </script>
  
  <style >
  .hlll{
    height: 80px;
  }
  .page-hot1{
    position: relative;
  }
  .hot1{
            width: 50%;
            
            margin: 100px auto;
        }

  
  .category-list {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #e0e0e0;
  }
  
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  .cate {
    margin-left: 35%;
    margin-bottom:100px ;
  display: inline-flex;
  padding: 0 0.78vw;
  height: 2.50vw;
  align-items: center;
  background: #222122;
  border-radius: 1.30vw;
  color: white;
  font-size: 0.89vw;
  font-weight: 800;
}

.cate a {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  width: 7.62vw;
  height: 100%;
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.cate a::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  width: 5.21vw;
  height: 1.77vw;
  background: url('../assets/lengxing.png') no-repeat center / cover;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.cate a:hover,
.cate a.active {
  color: black;
}

.cate a:hover::after,
.cate a.active::after {
  opacity: 1;
}
  </style>