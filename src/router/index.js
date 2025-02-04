import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import CourseDetail from '@/views/CourseDetail.vue';
import MyPage from '@/views/MyPage.vue';
import MyFavorites from '@/views/MyFavorites.vue';
import UserProfile from '@/views/UserProfile.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Hot from '@/components/Hot.vue';
import HotCourses from '@/views/HotCourses.vue';
import Login from '@/views/Login.vue';
import Orders from '@/views/Orders.vue';
import ManagementPage from '@/views/views_ly/ManagementPage.vue';
import UserPage from '@/views/views_ly/UserPage.vue';
import OrderPage from '@/views/views_ly/OrderPage.vue';
import Sec1 from '@/components/Sec1.vue';
import CourseManagement from '@/views/views_ly/CourseManagement.vue';

const routes = [
  { 
    path: '/', 
    component: Home 
  },
  { 
    path: '/', 
    component: Header 
  },
  { 
    path: '/', 
    component: Footer 
  },
  { 
    path: '/category', 
    component: Category 
  },
  { 
    path: '/hot', 
    component: Hot 
  },
  { 
    path: '/hotCourses', 
    component: HotCourses 
  },
  {
    path: '/course/:courseId',
    component: CourseDetail, 
    props: true 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login 
  },
  { 
    path: '/favorites', 
    component: MyFavorites 
  },
  {
      path: '/sec1',
      component: Sec1
  },
  {
      path: '/managementPage',
      component: ManagementPage,
      children: [
        {
          path: 'user',
          component: UserPage
        },
        {
           path: 'order',
          component: OrderPage
        },
        {
          path:'courseManagement',
          component: CourseManagement
        },
      ]
  },
  { 
    path: '/mypage', 
    component: MyPage, 
    children: [
      { path: '', 
        component: UserProfile 
      },
      { path: 'profile', 
        component: UserProfile 
      },
      { path: 'orders', 
        component: Orders 
      }
    ]
  }
];



const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
