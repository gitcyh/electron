<template>
 <div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>

   
 </div>
</template>

<script setup lang="ts">
import './assets/common.css';
</script>

<style scoped>

</style>
