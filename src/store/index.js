import { createStore } from 'vuex';
import axios from 'axios';

// 配置 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:3000/', // JSON Server 的基础 URL
  timeout: 10000, // 请求超时时间
});

export default createStore({
  state: {
    users: [],
    categories: [], // 从 JSON Server 动态加载
    courses: [], // 从 JSON Server 动态加载
    currentUser: null, // 当前登录的用户信息
    role: null, // 当前登录用户的角色
    orders: [],
    favorites: [] // 收藏课程 ID 列表
  },
  getters: {
    getAllCourses(state) {
      return state.courses;
    },
    getAllCategories(state) {
      return state.categories;
    },
    getHotCourses(state) {
      return state.courses.filter(course => course.isHot);
    },
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id);
    },
    getFavoriteCourses(state) {
      return state.courses.filter(course => state.favorites.includes(course.id));
    },
    getCoursesByCategoryId: (state) => (categoryId) => {
      return state.courses.filter(course => String(course.categoryId) === String(categoryId));
    },
    isLoggedIn(state) {
      return !!state.currentUser;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getRole(state) {
      return state.role;
    },
    allOrders(state) {
      return state.orders;
    }
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    ADD_COURSE(state, course) {
      state.courses.push(course);
    },
    UPDATE_COURSE(state, updatedCourse) {
      const index = state.courses.findIndex(course => course.id === updatedCourse.id);
      if (index !== -1) {
        state.courses.splice(index, 1, updatedCourse);
      }
    },
    DELETE_COURSE(state, courseId) {
      state.courses = state.courses.filter(course => course.id !== courseId);
    },
    TOGGLE_FAVORITE(state, courseId) {
      const index = state.favorites.indexOf(courseId);
      if (index === -1) {
        state.favorites.push(courseId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    SET_USER(state, user) {
      state.currentUser = user;
      state.role = user?.role || null;
    },
    LOGOUT(state) {
      state.currentUser = null;
      state.role = null;
      state.favorites = [];
    },
    ADD_COURSE_TO_STATE(state, course) {
      if (!state.courses.some(c => c.id === course.id)) {
        state.courses.push(course);
      }
    },
    SET_ORDERS(state, orders) {
      state.orders = orders; // 设置订单列表
    },
    REMOVE_ORDER(state, orderId) {
      state.orders = state.orders.filter(order => order.id !== orderId); // 删除指定订单
    },


//ly
    SET_USERS(state, users) {
      state.users = users; // 用于更新用户列表数据的mutation，接收从后端获取的用户数据列表并更新state中的users
    }




  },
  actions: {
    // 获取所有分类
    async fetchCategories({ commit }) {
      try {
        const response = await api.get('categories');
        commit('SET_CATEGORIES', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    // 获取所有课程
    async fetchCourses({ commit }) {
      try {
        const response = await api.get('courses');
        commit('SET_COURSES', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    // 添加课程
    async addCourse({ commit }, course) {
      try {
        const response = await api.post('courses', course);
        commit('ADD_COURSE', response.data);
      } catch (error) {
        console.error('Error adding course:', error);
      }
    },
    // 更新课程
    async updateCourse({ commit }, updatedCourse) {
      try {
        const response = await api.put(`courses/${updatedCourse.id}`, updatedCourse);
        commit('UPDATE_COURSE', response.data);
      } catch (error) {
        console.error('Error updating course:', error);
      }
    },
    // 删除课程
    async deleteCourse({ commit }, courseId) {
      try {
        await api.delete(`courses/${courseId}`);
        commit('DELETE_COURSE', courseId);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    },
    // 登录
    async login({ commit }, { username, password, role }) {
      try {
        // 请求用户数据，匹配用户名和密码
        const response = await api.get('users', {
          params: { username, password },
        });

        const user = response.data[0]; 

        if (user) {
          // 检查用户角色是否匹配
          if (user.role !== role) {
            throw new Error('用户类型不匹配，请选择正确的用户类型');
          }

          // 设置用户信息到 Vuex
          commit('SET_USER', user);
          return { success: true, role: user.role };
        } else {
          throw new Error('用户名或密码错误');
        }
      } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
      }
    },
    // 登出
    logout({ commit }) {
      commit('LOGOUT');
    },
  /*
   //更新用户手机号
 
  async updatePhone({ commit, state }, { id, newPhone }) {
    try {
      const user = state.users.find(user => user.id === id);
      if (user) {
        // 更新用户的手机号
        const updatedUser = { ...user, phone: newPhone };
        const response = await api.put(`users/${id}`, updatedUser); // 提交到后端
        if (response.status === 200) {
          commit('SET_USER', response.data); // 更新 Vuex 状态
        }
      }
    } catch (error) {
      console.error('Error updating phone:', error);
    }
  },

  
   // 更新用户密码

  async updatePassword({ commit, state }, { id, newPassword }) {
    try {
      const user = state.users.find(user => user.id === id);
      if (user) {
        // 更新用户的密码
        const updatedUser = { ...user, password: newPassword };
        const response = await api.put(`users/${id}`, updatedUser); // 提交到后端
        if (response.status === 200) {
          commit('SET_USER', response.data); // 更新 Vuex 状态
        }
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  },

  
   //* 更新用户收货地址

  async updateAddress({ commit, state }, { id, newAddress }) {
    try {
      const user = state.users.find(user => user.id === id);
      if (user) {
        // 更新用户的收货地址
        const updatedUser = { ...user, address: newAddress };
        const response = await api.put(`users/${id}`, updatedUser); // 提交到后端
        if (response.status === 200) {
          commit('SET_USER', response.data); // 更新 Vuex 状态
        }
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  },
  */

  /**
   * 通过 ID 获取用户信息（如果需要动态加载用户）
   * @param {Object} context Vuex context 对象
   * @param {Number} id 用户 ID
   */
  async fetchUser({ commit }, id) {
    try {
      const response = await api.get(`users/${id}`);
      if (response.status === 200) {
        commit('SET_USER', response.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },

   /**
   * 根据课程 ID 获取课程
   * @param {Object} context Vuex context 对象
   * @param {Number} id 课程 ID
   * @returns {Promise<Object>} 返回课程对象
   */
   async getCourseById({ state, commit }, id) {
    try {
      // 检查 Vuex 中是否已有该课程
      const cachedCourse = state.courses.find(course => course.id === id);
      if (cachedCourse) {
        return Promise.resolve(cachedCourse);
      }

      // 从后端获取课程数据
      const response = await api.get(`courses/${id}`);
      const course = response.data;

      // 将课程添加到 Vuex
      commit('ADD_COURSE_TO_STATE', course);
      return course;
    } catch (error) {
      console.error(`Error fetching course by ID ${id}:`, error);
      throw new Error('获取课程失败');
    }
  },
  async fetchOrders({ commit }) {
    try {
      const response = await api.get('/orders');
      commit('SET_ORDERS', response.data || []); // 防止返回 null 的情况
    } catch (error) {
      console.error('获取订单失败:', error);
      commit('SET_ORDERS', []); // 确保有默认值
    }
  },
  async cancelOrder({ commit }, orderId) {
    try {
      await api.delete(`/orders/${orderId}`);
      commit('REMOVE_ORDER', orderId);
    } catch (error) {
      console.error('取消订单失败:', error);
    }
  },


  async updatePassword_info({ commit }, { id, newPassword }) {
    try {
      await api.patch(`users/${id}`, { password: newPassword });
    } catch (error) {
      console.error('密码更新失败:', error);
      throw new Error('密码更新失败');
    }
  },

  async updatePhone_info({ commit }, { id, newPhone }) {
    try {
      await api.patch(`users/${id}`, { phone: newPhone });
    } catch (error) {
      console.error('手机号更新失败:', error);
      throw new Error('手机号更新失败');
    }
  },

  async updateAddress_info({ commit }, { id, newAddress }) {
    try {
      await api.patch(`users/${id}`, { address: newAddress });
    } catch (error) {
      console.error('收货地址更新失败:', error);
      throw new Error('收货地址更新失败');
    }
  },


















































/**
 * ly
*/



  // 提取公共逻辑用于更新用户部分信息，包含查找用户、发送请求、更新状态等操作
  async updateUserInfo({ commit }, id, updatedData) {
    const user = state.users.find(user => user.id === id);
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      const response = await api.put(`users/${id}`, updatedUser);
      if (response.status === 200) {
        commit('SET_USER', response.data);
        const index = state.users.findIndex(u => u.id === id);
        if (index !== -1) {
          const updatedUsers = [...state.users];
          updatedUsers.splice(index, 1, response.data);
          commit('SET_USERS', updatedUsers);
        }
      }
    }
  },
// 获取用户列表数据的action，细化错误处理并抛出错误信息给调用处
async fetchUsers({ commit }) {
  try {
    const response = await api.get('users');
    commit('SET_USERS', response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    let errorMessage = '获取用户列表失败，请稍后重试';
    if (error.response) {
      const { data, status } = error.response;
      if (status === 401) {
        errorMessage = '未授权访问用户列表，请检查登录状态';
      } else if (status === 404) {
        errorMessage = '用户列表资源不存在，请联系管理员';
      } else if (data && data.errorMessage) {
        errorMessage = data.errorMessage;
      }
    } else if (error.request) {
      errorMessage = '网络连接出现问题，无法获取用户列表，请检查网络设置';
    }
    throw new Error(errorMessage);
  }
},
// 添加用户的action，优化错误处理并返回添加后的用户信息（如果成功）
async addUser({ commit }, newUser) {
  try {
    const response = await api.post('users', newUser);
    commit('SET_USERS', [...state.users, response.data]);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    let errorMessage = '添加用户失败，请稍后重试';
    if (error.response) {
      const { data } = error.response;
      if (data.errorMessage) {
        errorMessage = data.errorMessage;
      }
    }
    throw new Error(errorMessage);
  }
},
// 更新用户信息的action，提取公共逻辑处理更新相关操作，细化错误处理
async updateUser({ commit }, updatedUser) {
  try {
    const response = await api.put(`users/${updatedUser.id}`, updatedUser);
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      const updatedUsers = [...state.users];
      updatedUsers.splice(index, 1, response.data);
      commit('SET_USERS', updatedUsers);
    }
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    let errorMessage = '更新用户信息失败，请稍后重试';
    if (error.response) {
      const { data } = error.response;
      if (data.errorMessage) {
        errorMessage = data.errorMessage;
      }
    }
    throw new Error(errorMessage);
  }
},
// 删除用户的action，细化错误处理
async deleteUser({ commit }, userId) {
  try {
    await api.delete(`users/${userId}`);
    commit('SET_USERS', state.users.filter(user => user.id !== userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    let errorMessage = '删除用户失败，请稍后重试';
    if (error.response) {
      const { data } = error.response;
      if (data.errorMessage) {
        errorMessage = data.errorMessage;
      }
    }
    throw new Error(errorMessage);
  }
},
// 更新用户手机号，提取公共逻辑更新用户信息
async updatePhone({ commit }, { id, newPhone }) {
  try {
    await updateUserInfo({ commit }, id, { phone: newPhone });
  } catch (error) {
    console.error('Error updating phone:', error);
    throw new Error('更新用户手机号失败，请稍后重试');
  }
},
// 更新用户密码，提取公共逻辑更新用户信息
async updatePassword({ commit }, { id, newPassword }) {
  try {
    await updateUserInfo({ commit }, id, { password: newPassword });
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('更新用户密码失败，请稍后重试');
  }
},
// 更新用户收货地址，提取公共逻辑更新用户信息
async updateAddress({ commit }, { id, newAddress }) {
  try {
    await updateUserInfo({ commit }, id, { address: newAddress });
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('更新用户收货地址失败，请稍后重试');
  }
},













  },
  modules: {}
});