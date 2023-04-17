/// <reference types="vite/client" />
/**
 * 这段代码可以让 main.ts 中的引入 APP.vue 报错消失
 */
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 解决element-plus 在引入 main.ts 文件时出现报错问题
declare module "element-plus";

declare module "vue-router";

// 进度条工具引入
declare module "nprogress";