<template>
  <div>
    <el-icon :size="18" @click="toggle">
      <component :is="isFullscreen ? 'Aim' : 'FullScreen'" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  font-size: 18px;

  &:focus {
    outline: none;
  }
}
</style>
