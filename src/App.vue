<script setup>
  import data from './data.json'
  import { provide, ref } from 'vue';
  import Editor from './packages/editor';
  import  {registerConfig} from './utils/editor-config.jsx';
  const state = ref(data)

  provide('Config', registerConfig);


</script>

<template>
<div class="app">
  <Editor v-model="state"></Editor>
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
