<template>
  <el-scrollbar>
    <!-- background-color：背景颜色 -->
    <!-- text-color：文字颜色 -->
    <!-- active-text-color：选中后的背景颜色 -->
    <!-- router:开启路由跳转 -->
    <!-- default-active:设置默认菜单 -->
    <!-- collapse:是否水平折叠收起菜单 -->
    <!-- collapse-transition:是否开启折叠动画 -->
    <!-- unique-opened:一次是否只能展开一个菜单 -->
    <el-menu router class="layout-menu system-scrollbar" background-color="var(--system-menu-background)"
      text-color="var(--system-menu-text-color)" active-text-color="var(--system-primary-color)"
      :default-active="$route.path" :collapse="isCollapse" :collapse-transition="false" :unique-opened="expandOneMenu">
      <template v-for="menu in allRoutes">
        <!-- if  存在子路由 -->
        <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0" :key="menu.path">
          <template #title>
            <el-icon>
              <component :is="menu.meta?.icon" />
            </el-icon>
            <span>{{ menu.meta?.title }}</span>
          </template>
          <sub-menu :chil="menu.children" />
        </el-sub-menu>
        <!-- else  没有子路由   -->
        <template v-else>
          <el-menu-item :index="menu.path" :key="menu.path">
            <el-icon>
              <component :is="menu.meta?.icon" />
            </el-icon>
            <template #title>
              <span>{{ menu.meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>

    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
// 引入子菜单组件
import SubMenu from '@/layout/Menu/SubMenu.vue'
import { useRouter } from 'vue-router'
// 引入pinia
import { useStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const router = useRouter();

// 获取所有路由  --》 后面修改为从数据库获取路由信息
const allRoutes = router.options.routes[0].children

// 声明pinia对象
const store = useStore()
/**
 * 获取全局状态
 * isCollapse:false 侧边栏是否收缩展示
 * expandOneMenu:true 一次是否只能展开一个菜单
 */
let { isCollapse, expandOneMenu } = storeToRefs(store)

</script>

<style lang="scss" scoped>
.el-scrollbar {
  background-color: var(--system-menu-background);
}

.layout-menu {
  width: 100%;
  border: none;

  &.collapse {
    margin-left: 0px;
  }

  :deep() {

    .el-menu-item,
    .el-sub-menu {
      background-color: var(--system-menu-background) !important;
    }

    .el-menu-item i,
    .el-menu-item-group__title,
    .el-sub-menu__title i {
      color: var(--system-menu-text-color);
    }

    .el-menu-item,
    .el-sub-menu__title {
      &.is-active {
        background-color: var(--system-primary-color) !important;
        color: var(--system-primary-text-color) !important;

        i {
          color: var(--system-primary-text-color) !important;
        }

        &:hover {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
        }
      }

      &:hover {
        background-color: var(--system-menu-hover-background) !important;
      }
    }

    .el-sub-menu {
      &.is-active {

        >.el-sub-menu__title,
        >.el-sub-menu__title i {
          color: var(--system-menu-submenu-active-color) !important;
        }
      }

      .el-menu-item {
        background-color: var(--system-menu-children-background) !important;

        &.is-active {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;

          &:hover {
            background-color: var(--system-primary-color) !important;
            color: var(--system-primary-text-color) !important;
          }
        }

        &:hover {
          background-color: var(--system-menu-hover-background) !important;
        }
      }

      .el-sub-menu {
        .el-sub-menu__title {
          background-color: var(--system-menu-children-background) !important;

          &:hover {
            background-color: var(--system-menu-hover-background) !important;
          }
        }
      }
    }
  }
}
</style>