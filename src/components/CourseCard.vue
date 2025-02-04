<!-- src/components/CourseCard.vue -->
<template>
  <a @click="goToCourseDetail" class="item">
    <div class="img">
      <img :src="course.image || 'default.jpg'" :alt="`课程: ${course.name || '未知课程'}`" />
    </div>
    <div class="time font-num">
      <span>{{ course.price || '未定价' }}</span>
      <span class="news-tag">￥</span>
    </div>
    <div class="title clamp1">{{ course.name || '课程名称未定义' }}</div>
    <div class="desc clamp2">{{ course.description || '暂无简介' }}</div>
  </a>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    role() {
      return this.$store.getters.getRole || '';
    }
  },
  methods: {
    goToCourseDetail() {
      if (!this.role) {
        this.$message.error('请先登录用户账号！');
        setTimeout(() => {
          this.$router.push('/login');
        }, 1000);
        return;
      }
      this.$router.push(`/course/${this.course.id}`);
    }
  }
};
</script>

<style>
.item {
  display: block;
  width: calc(33.33% - 1.15vw);
  margin-bottom: 1.56vw;
  text-decoration: none;
  color: inherit;
}

.item .img {
  border-radius: 0 1.30vw 0 1.30vw;
  overflow: hidden;
}

.item .img img {
  width: 100%;
  height: 8.60vw;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item:hover .img img {
  transform: scale(1.15);
}

.item .time {
  display: flex;
  margin-top: 1.30vw;
  font-size: 0.83vw;
  align-items: center;
}

.item .time .news-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.77vw;
  height: 0.78vw;
  margin-left: 0.78vw;
  color: var(--themeColor, #d8fa00);
  font-size: 0.57vw;
  background: url('../assets/news-tag.png') no-repeat center / cover;
}

.item .title {
  font-size: 0.94vw;
  font-weight: 800;
  margin-top: 1.30vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item .desc {
  margin-top: 0.63vw;
  font-size: 0.70vw;
  line-height: 0.94vw;
  color: #666;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

</style>