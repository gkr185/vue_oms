<template>
              <div class="page-sdda sdda-detail">
                    <div class="page-title-box">
                        <img src="../assets/page-bg.png" class="page-bg" alt="">
                        <div class="page-title font-num">
                            <div class="title-box">
                                <div class="cn font-hm">课程简介</div>
                                <div class="en">ClassID</div>
                                <div class="num">{{ course.id }}</div>
                            </div>
                        </div>
                    </div>           

                    <div class="page-zhuangshi-right">
                        <img src="../assets/page-zhuangshi.png" alt="">
                    </div>






                    <div class="content-box">
                      <div class="sdda-back">
                          <a href="javascript:history.back();">
                              <img src="../assets/back2.png" alt="">
                          </a>
                      </div>
                      <img :src="course.image" alt="课程图片" class="thumb">

                      <div class="world-detail__title">
                        {{ course.name }}
                      </div>

                      <div class="world-detail__content">
                        <p><strong>价格：</strong>￥{{ course.price }}</p>
                        <p><strong>时长：</strong>{{ course.duration }} 分钟</p>
                        <p><strong>描述：</strong>{{ course.description }}</p>
                        <!-- 收藏按钮 -->
                         <div class="fay">
                          <button @click="toggleFavorite" class="btn">{{ isFavorited ? '取消收藏' : '加入收藏' }}</button>
                        </div>
                      </div>
                    </div>
            </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import '@/css/sdda.css';

export default {
  name: 'CourseDetail',
  data() {
    return {
      loading: true, // 数据加载状态
      course: {}, // 当前课程对象
    };
  },
  computed: {
    ...mapGetters(['getCourseById']),
    isFavorited() {
      // 检查当前课程是否为收藏状态
      return this.$store.state.favorites.includes(this.course.id);
    },
  },
  methods: {
    ...mapMutations(['TOGGLE_FAVORITE']),
    async loadCourse() {
      const courseId = this.$route.params.courseId;
      const cachedCourse = this.getCourseById(courseId);
      this.course = cachedCourse || (await this.$store.dispatch('getCourseById', courseId));
      this.loading = false; // 加载完成
    },
    toggleFavorite() {
      this.TOGGLE_FAVORITE(this.course.id);
    },
  },
  async created() {
    try {
      await this.loadCourse();
    } catch (error) {
      console.error('课程加载失败:', error.message);
      this.$message.error('加载课程失败，请稍后重试');
      this.loading = false; // 加载失败也需要关闭加载状态
    }
  },
};
</script>

<style>
.fay{
  margin: 44px auto;
}

.btn {
  margin-left: 44%;
  font-size: 27px;
  font-weight: 900;
  background: transparent;
  border: none;
  padding: 1em 1.5em;
  color: #d8fa00;
  text-transform: uppercase;
  position: relative;
  transition: 0.5s ease;
  cursor: pointer;
}

.btn::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  width: 0;
  background-color: #d8fa00;
  transition: 0.5s ease;
}

.btn:hover {
  background-color: #000000 ;
  color: #f5f5ff;
  transition-delay: 0.5s;
}

.btn:hover::before {
  width: 100%;
}

.btn::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  background: url("../assets/background.jpg")!important;
  transition: 0.4s ease;
  z-index: -1;
}

.btn:hover::after {
  height: 100%;
  transition-delay: 0.4s;
  background: url("../assets/background.jpg");
}
</style>