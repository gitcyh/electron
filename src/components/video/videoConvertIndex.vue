<template>
  <div class="container">
    <div class="item" @click="open('videoConvert')">
        <router-link target="_self" to="/videoConvert">视频转换</router-link>
        
    </div>
    
    <div class="item">
      视频截图
    </div>
    <div class="item">
      敬请期待
    </div>

  </div>

</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter();

const open = function(){
  router.push({
    path:'/videoConvert'
  })
}

</script>


<style scoped>
.container{
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: row;
 
}
.item{
  width: 200px;
  height: 200px;
  background-color: #027df0;
  margin-right: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  color: #ffffff;
  font-size: 18px;
}
.item a{
  color: #ffffff;
}
</style>
