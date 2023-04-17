import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      isCollapse: false, // 侧边栏是否收缩展示
      expandOneMenu: true, // 一次是否只能展开一个菜单
      contentFullScreen: false, // 内容是否可全屏展示
      showLogo: true,// 是否显示Logo
      isRouterAlive: true, // 组件局部刷新
      isLoading: false// 组件局部刷新
    }
  },
  // pinia中的计算属性
  getters: {},
  // 方法声明
  actions: {
    isCollapseChange(type: boolean) {
      this.isCollapse = type
    }
  }
})
