<script lang="ts" setup>
// 获取子路由
const props = defineProps(['chil'])
</script>

<template>
  <template v-for="val in props.chil">
    <el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
      <template #title>
        <span>{{ val.meta.title }}</span>
      </template>
      <!-- 组件递归自身 -->
      <sub-menu :chil="val.children" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item :index="val.path" :key="val.path">
        <span>{{ val.meta.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>



<style lang="scss" scoped>
.el-sub-menu {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-menu-item i,
.el-sub-menu__title i {
  padding-right: 8px;
}
</style>
