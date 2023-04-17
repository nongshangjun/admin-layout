import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// pinia 状态管理
import { createPinia } from 'pinia'

// ui框架
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'normalize.css' // css初始化
import './assets/style/common.scss' // 全局公共css

// 引入基于断点的隐藏类
import 'element-plus/theme-chalk/display.css'
// 引入全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus).use(createPinia()).use(router).mount('#app')

// 全局注册 element-ui icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
