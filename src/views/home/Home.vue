<template>
  <div>
    <el-card class="box-card">
      <el-input v-model="input" placeholder="首页测试keep-alive" />
      <p>首页</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref,inject } from 'vue'
const input = ref('')
</script>


<style lang="scss" scoped>
.box-card {
  margin: 5px;
}
</style>