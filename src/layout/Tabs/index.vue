<template>
  <div class="tabs">
    <el-scrollbar id="scroll" ref="scrollbarDom" class="scroll-container tags-view-container"
      @wheel.passive="handleWhellScroll" @scroll="handleScroll">
      <Item v-for="menu in menuList" :key="menu.meta.name" :menu="menu" :active="activeMenu.path === menu.path"
        @reload="pageReload" @close="delMenu(menu)" />
    </el-scrollbar>


    <div class="handle">
      <el-dropdown placement="bottom">
        <div class="el-dropdown-link">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="tab-ddropdown-item" @click="pageReload"><el-icon>
                <RefreshLeft />
              </el-icon>重新加载</el-dropdown-item>
            <el-dropdown-item class="tab-ddropdown-item" :disabled="currentDisabled" @click="closeCurrentRoute"><el-icon>
                <CircleClose />
              </el-icon>关闭当前标签</el-dropdown-item>
            <el-dropdown-item class="tab-ddropdown-item" :disabled="menuList.length < 3"
              @click="closeOtherRoute"><el-icon>
                <CircleClose />
              </el-icon>关闭其他标签</el-dropdown-item>
            <el-dropdown-item class="tab-ddropdown-item" :disabled="menuList.length <= 1" @click="closeAllRoute"><el-icon>
                <CircleClose />
              </el-icon>关闭所有标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
/** 类型引用 */
import type { Ref } from 'vue'
import Item from './Item.vue'
import tabsHook from './tabsHook'
import type { ElScrollbar } from 'element-plus'
/** 引用vue系列函数 */
import { computed, watch, reactive, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKeepAliverStore } from '@/store/KeepAlive'
// 引入pinia
import { useStore } from '@/store/index'
// 声明pinia对象
const store = useStore()

const { clear, remove, setKeepAliver } = useKeepAliverStore()


const route = useRoute()
const router = useRouter()
const scrollbarDom: Ref<typeof ElScrollbar | null> = ref(null)
const scrollLeft = ref(0)




// 默认菜单,hideClose:用于隐藏首页的关闭,首页不可关闭
const defaultMenu = {
  path: '/home',
  name: 'Home',
  meta: { title: '首页', hideClose: true }
}
// 当前菜单,用于判断命中菜单
let activeMenu: any = reactive({ path: '' })
// 菜单集合
let menuList = ref(tabsHook.getItem())

const currentDisabled = computed(() => route.path === defaultMenu.path)

// 监听菜单变化
watch(menuList.value, (newVal: []) => {
  // 存入 localStorage 中
  tabsHook.setItem(newVal)
})
watch(menuList, (newVal: []) => {
  tabsHook.setItem(newVal)
})

// 后置路由监听
router.afterEach(() => {
  // 添加菜单
  addMenu(route)
  // 重新赋值 activeMenu 当前路由
  initMenu(route)
})

// 添加新的菜单项
function addMenu(menu: any) {
  let { path, name, meta } = menu
  if (meta.hideTabs) {
    return
  }
  // 判断添加的menu，是否存在 菜单集合中
  let hasMenu = menuList.value.some((obj: any) => {
    return obj.path === path
  })
  // 如果不存在，再将 菜单 添加到集合中，防止出现重复的标签
  if (!hasMenu) {
    menuList.value.push({
      path,
      name,
      meta
    })
  }
}


// 当前页面组件重新加载
function pageReload() {
  store.isLoading = true // 展示数据加载状态
  store.isRouterAlive = false // 设置为false，卸载dom
  // setTimeout(() => { // 此处采用了定时器，并没有采用网上比较常见的nextTick
  //   store.isRouterAlive = true // 设置为true，重新挂载dom
  //   store.isLoading = false // 隐藏数据加载状态
  // }, 200)
  nextTick(() => {
    store.isRouterAlive = true // 设置为true，重新挂载dom
    store.isLoading = false // 隐藏数据加载状态
  })
}

// 删除菜单项
function delMenu(menu: any) {
  let index = 0
  if (!menu.meta.hideClose) {
    index = menuList.value.findIndex((item: any) => item.path === menu.path)
    menuList.value.splice(index, 1)
  }

  if (menu.path === activeMenu.path) {
    index - 1 > 0 ? router.push(menuList.value[index - 1].path) : router.push(defaultMenu.path)
  }

  // 删除 KeepAlive
  remove(menu.name)
}


// 初始化activeMenu
function initMenu(menu: object) {
  // 绑定当前菜单
  activeMenu = menu
  nextTick(() => {
    // 每次变化，都调用纠正滚动条位置的方法
    setPosition()
  })
}

/** 设置当前滚动条应该在的位置 */
function setPosition() {
  if (scrollbarDom.value) {
    const domBox = {
      scrollbar: document.getElementById('scroll')?.querySelector('.el-scrollbar__wrap') as HTMLDivElement,
      activeDom: document.getElementById('scroll')?.querySelector('.active') as HTMLDivElement,
      activeFather: document.getElementById('scroll')?.querySelector('.el-scrollbar__view') as HTMLDivElement
    }
    let hasDoms = true
    Object.keys(domBox).forEach((dom) => {
      if (!dom) {
        hasDoms = false
      }
    })
    if (!hasDoms) {
      return
    }
    const domData = {
      scrollbar: domBox.scrollbar.getBoundingClientRect(),
      activeDom: domBox.activeDom.getBoundingClientRect(),
      activeFather: domBox.activeFather.getBoundingClientRect()
    }
    const num = domData.activeDom.x - domData.activeFather.x + 1 / 2 * domData.activeDom.width - 1 / 2 * domData.scrollbar.width
    domBox.scrollbar.scrollLeft = num
  }
}



/** 监听鼠标滚轮滚动事件 */
function handleWhellScroll(e: any) {
  let distance = 0
  let speed = 5
  if (e.wheelDelta > 30) {
    distance = -10
  } else if (e.wheelDelta < -30) {
    distance = 10
  }
  scrollbarDom.value?.setScrollLeft(scrollLeft.value + distance * speed)
}

/** 监听滚动事件 */
function handleScroll({ scrollLeft: left }: { scrollLeft: number }) {
  scrollLeft.value = left
}


// 关闭当前标签，首页不关闭
function closeCurrentRoute() {
  if (route.path !== defaultMenu.path) {
    delMenu(route)
  }
}


// 关闭除了当前标签之外的所有标签
function closeOtherRoute() {
  menuList.value = [defaultMenu]
  if (route.path !== defaultMenu.path) {
    addMenu(route)
  }
  
  let keepAliveNames: any[] = []
  menuList.value.forEach((menu: any) => {
    menu.meta && menu.meta.keepAlive && menu.name && keepAliveNames.push(menu.name)
  })
  
  // 修改KeepAliver
  setKeepAliver(keepAliveNames)
  
}

// 关闭所有的标签，除了首页
function closeAllRoute() {
  menuList.value = [defaultMenu]
  // 清除缓存
  clear()
  router.push(defaultMenu.path)
}


// 初始化时调用：1. 新增菜单 2. 初始化activeMenu
addMenu(defaultMenu)
initMenu(route)


</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: var(--system-header-background);
  border-bottom: 1px solid var(--system-header-border-color);
  border-top: 1px solid var(--system-header-border-color);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);

  .handle {
    min-width: 95px;
    height: 100%;
    display: flex;
    align-items: center;

    .el-dropdown-link {
      margin-top: 5px;
      border-left: 1px solid var(--system-header-border-color);
      height: 25px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    i {
      color: var(--system-header-text-color);
    }
  }
}

.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}

.tags-view-container {
  height: 34px;
  flex: 1;
  width: 100%;
  display: flex;
}

.el-icon-full-screen {
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .025);
  }

  &:focus {
    outline: none;
  }
}

.tab-ddropdown-item {
  display: flex;
  align-items: center;
}
</style>
