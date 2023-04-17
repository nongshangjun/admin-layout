<template>
  <header>
    <div class="left-box">
      <!-- 收缩按钮 -->
      <div class="menu-icon" @click="opendStateChange">
        <el-icon :size="20">
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <!-- 快捷功能按钮 -->
      <div class="function-list">
        <div class="function-list-item hidden-sm-and-down">
          <FullScreen />
        </div>
        <!-- <div class="function-list-item"><Word /></div>
        <div class="function-list-item"><SizeChange /></div>
        <div class="function-list-item hidden-sm-and-down"><Theme /></div>
        <div class="function-list-item hidden-sm-and-down"><Github /></div> -->
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <el-dropdown ref="dropdown" class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/images/avatar.png" class="user-avatar">
            <div class="user-name">
              管理员
              <el-icon>
                <CaretBottom />
              </el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <router-link to="">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>

        </el-dropdown>

      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
// 引入pinia
import { useStore } from '@/store/index'
import { storeToRefs } from 'pinia'
// 面包屑
import Breadcrumb from './Breadcrumb.vue'
// 全屏切换
import FullScreen from './functionList/FullScreen.vue'


// 声明pinia对象
const store = useStore()
let { isCollapse } = storeToRefs(store)


const opendStateChange = () => {
  store.isCollapseChange(!isCollapse.value)
}

const logout = () => {
  console.log('退出登录');

}



</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
}

.left-box {
  height: 100%;
  display: flex;
  align-items: center;

  .menu-icon {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background-color: var(--system-header-item-hover-color);
    }

    i {
      color: var(--system-header-text-color);
    }
  }
}

.right-box {
  display: flex;
  justify-content: center;
  align-items: center;

  .function-list {
    display: flex;

    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }

  .user-info {
    margin-left: 20px;

    .el-dropdown-link {
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}

.head-fold {
  font-size: 20px;
}

.user-avatar {
  float: left;
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.user-name {
  color: #606266;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 40px;
  font-size: 14px;
  margin-left: 6px;
  line-height: 40px;
  cursor: pointer;
  float: left;
}

.avatar-wrapper {
  margin-top: 5px;
  position: relative;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}
</style>