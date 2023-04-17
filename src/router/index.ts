import { createRouter, createWebHistory } from 'vue-router'
import { useKeepAliverStore } from '@/store/KeepAlive'

import NProgress from '@/utils/nprogress'
NProgress.configure({ showSpinner: false })
const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页', keepAlive: true, icon: 'HomeFilled' }
      },

      {
        path: '/compa',
        name: 'CompA',
        component: () => import('@/views/comp/CompA.vue'),
        meta: { title: 'CompA', keepAlive: true, icon: 'UserFilled' }
      },
      {
        path: '/compb',
        name: 'CompB',
        component: () => import('@/views/comp/CompB.vue'),
        meta: { title: 'CompB', keepAlive: false, icon: 'UserFilled' }
      },
      {
        path: '/menu',
        meta: { title: '菜单', icon: 'Menu' },
        children: [
          {
            path: '/menu-1',
            meta: { title: '菜单1' },
            children: [
              {
                path: '/menu-1-1',
                meta: { title: '菜单1-1' },
                children: [
                  {
                    path: '/menu-1-1-1',
                    name: 'Menu-1-1-1',
                    component: () => import('@/views/menu/Menu-1-1-1.vue'),
                    meta: { title: '菜单-1-1-1', keepAlive: true },
                  },
                  {
                    path: '/menu-1-1-2',
                    name: 'Menu-1-1-2',
                    component: () => import('@/views/menu/Menu-1-1-2.vue'),
                    meta: { title: '菜单1_1_2', keepAlive: true },
                  },
                ]
              },
              {
                path: '/menu/menu-1/menu-1-2',
                name: 'Menu-1-2',
                component: () => import('@/views/menu/Menu-1-2.vue'),
                meta: { title: '菜单1-2', keepAlive: true },
              },
            ]
          },
          {
            path: '/menu-2',
            name: 'Menu2',
            component: () => import('@/views/menu/Menu2.vue'),
            meta: { title: '菜单2', keepAlive: true }
          },
          {
            path: '/menu-3',
            name: 'Menu3',
            component: () => import('@/views/menu/Menu3.vue'),
            meta: { title: '菜单3', keepAlive: true }
          },
        ]
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// 路由跳转前的监听操作 --》可以做一些权限校验，比如：验证token再放行
router.beforeEach((to: any, from: any, next: any) => {
  // 进度条
  NProgress.start();
  next()
});

// 路由跳转后的监听操作
router.afterEach((to: any, from: any) => {
  // 跳转后，将路由加入缓存
  if (to.meta.keepAlive) {
    const { add } = useKeepAliverStore()
    add(to.name)
  }
  // 关闭进度条
  NProgress.done()
});

export default router
