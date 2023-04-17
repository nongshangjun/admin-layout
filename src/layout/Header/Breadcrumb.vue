<template>
  <el-breadcrumb class="app-breadcrumb hidden-sm-and-down" separator="/">
    <el-breadcrumb-item v-for="item in routers" :key="item.path">
      {{ item?.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter()

// 当前路由的匹配记录
const routers = computed(() => {
  // 过滤掉没有meta的 
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
</script>

<style lang="scss" scoped >
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: var(--system-header-breadcrumb-text-color);
    cursor: text;
  }

  a {
    color: var(--system-header-text-color);
  }
}

</style>