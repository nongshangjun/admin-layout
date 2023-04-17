import { defineStore } from "pinia";

/**
 * 缓存控制维护
 * add:传入name即可达到将组件缓存的效果. 注意:vue3中 组件名 = name ,如果在路由中操作缓存,路由中的name 和 组件名保持一致
 * remove:当我们想要销毁某个页面，只要调用下 remove 方法移除 caches 里对应的组件名，就可以销毁该页面的缓存了
 * clear:清除全部缓存
 */
export const useKeepAliverStore = defineStore('keepAliver', {
  state: () => ({
    caches: [] as any
  }),
  getters: {},
  actions: {
    setKeepAliver(nameArr: any[]) {
      this.caches = nameArr
    },
    add(name: string | null | undefined) {
      if (!this.caches.includes(name)) {
        this.caches.push(name)
      }
    },
    remove(name: string | null | undefined) {
      this.caches = this.caches.filter((item: any) => item !== name)
    },
    clear() {
      this.caches = []
    }
  }
})
