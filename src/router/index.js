
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { // 登录
      path: '/login',
      name: 'Login',
      component: () => import("@/views/background/login/index.vue"),
      meta: {
        login: true
      }
    },
    {   // 后台框架
      path: '/background',
      name: "BackGround",
      component: () => import("@/views/background/control/layout/index.vue"),
      redirect: '/background/head',
      meta: {
        token: true
      },
      children: [
        { // 后台首页
          path: 'head',
          name: 'head',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/son/head.vue")
        },
        { // 个人设置
          path: 'set',
          name: 'set',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/components/set/index.vue")
        },
        { // 用户列表
          path: 'userlist',
          name: 'userlist',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/components/user/index.vue")
        },
        {
          // 用户详细数据
          path:'userDetail/:id',
          name:'userDetail',
          meta:{
            token:true
          },
          component:()=>import("@/views/background/control/components/user/UserInformation.vue")
        },
        {
          // 商品列表
          path: 'commodityList',
          name: 'commodityList',
          component: () => import("@/views/background/control/components/category/index.vue"),
          // props: true
          meta: {
            token: true
          },
        },
        {
          // 商品详情
          path: 'commodityDetail/:id',
          name: 'commodityDetail',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/components/category/detail.vue")
        },
        {
          // 新增分类
          path: 'addCategory',
          name: 'addCategory',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/son/add.vue")
        },
        {
          // 新增商品
          path: 'addCommodity',
          name: 'addCommodity',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/son/add.vue")
        },
        {
          // 订单列表
          path: 'orderList',
          name: 'orderList',
          component: () => import("@/views/background/control/components/Order/index.vue"),
          // props: true
          meta: {
            token: true
          },
        },
        {
          // 订单详情
          path: 'orderDetail/:id',
          name: 'orderDetail',
          meta: {
            token: true
          },
          component: () => import("@/views/background/control/components/Order/detail.vue")
        },
      ]
    },
    
    // 重定向到后台首页
    {
      path: '/',
      redirect:"/background"
    }
  ]
})

// 路由前卫
router.beforeEach((to, from) => {
  // 当去的界面要token的时候
  if (to.meta.token) {
    if (!localStorage.getItem('token') && to.name !== 'Login') {
      return ({ name: 'Login',      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }, })
    }
  }
  // 当去的界面为登录界面的时候
  if (to.meta.login) {
    if (localStorage.getItem('token')) {
      return {
        name: 'BackGround'
      }
    }
  }
 return true
})

export default router
