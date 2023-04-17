<template>
  <el-container style="height: 100vh">
    <!-- 左侧 -->
    <el-aside :width="isCollapse ? '60px' : '250px'" :class="isCollapse ? 'hide-aside' : 'show-side'">
      <Logo />
      <Menu />
    </el-aside>

    <el-container>
      <!-- 头 -->
      <el-header>
        <Header />
      </el-header>

      <!-- 标签 -->
      <Tabs />
      <!-- 身体 -->
      <el-main v-loading="isLoading" element-loading-text="页面加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
        <router-view v-slot="{ Component }" v-if="isRouterAlive">
          <KeepAlive :include="caches">
            <component :is="Component" />
          </KeepAlive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// 引入pinia
import { useStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import { useKeepAliverStore } from '@/store/KeepAlive'


// 引入布局组件
import Logo from '@/layout/Logo/index.vue'
import Menu from '@/layout/Menu/index.vue'
import Header from "@/layout/Header/index.vue";
import Tabs from "./Tabs/index.vue";

// 声明pinia对象
const store = useStore()
let { isCollapse, isRouterAlive, isLoading } = storeToRefs(store)

// 缓存路由数组
const { caches } = storeToRefs(useKeepAliverStore())

</script>



<style lang="scss" scoped>
.el-header {
  padding-left: 0;
  padding-right: 0;
}

.el-aside {
  display: flex;
  flex-direction: column;
  transition: 0.2s;
  overflow-x: hidden;
  transition: 0.3s;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.el-main {
  background-color: var(--system-container-background);
  height: 100%;
  padding: 0;
  overflow-x: hidden;
}

:deep(.el-main-box) {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}

@media screen and (max-width: 1000px) {
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;

    &.hide-aside {
      left: -250px;
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
