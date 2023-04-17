<template>
  <div class="layout-container">
    <p>Current component: A</p>
    <span>count: {{ count }}</span>
    <button @click="count++">+</button>
    <h1>CompA</h1>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
let count = ref(0) 
</script>

<style lang="scss" scoped></style>
