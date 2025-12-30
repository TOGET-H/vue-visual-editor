<script setup>
  import data from './data.json'
  import { ref } from 'vue';
  import editor from './packages/editor';

  const state = ref(data)




</script>

<template>
<div class="app">
  <editor :data="state"></editor>
</div>
</template>

<style scoped>
  .app{
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
  }
</style>
