<template>
  <p>Current component: B</p>
  <span>Message is: {{ msg }}</span>
  <input v-model="msg">
</template>


<script setup lang="ts">
import { ref } from 'vue';
let msg = ref('');
</script>