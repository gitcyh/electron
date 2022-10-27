<template>
  <div class="container">
    <div class="container_top">
      <div class="top_item" @click="open('videoConvert')">
        <router-link target="_self" to="/videoConvert">视频转换</router-link>
        <span>视频格式转换支持腾讯爱奇艺等</span>
      </div>
      <div class="top_item">
        音频转换
         <span>音频裁剪 格式转换支持酷狗等</span>
      </div>
      <div class="top_item">
        视频压缩
        <span>压缩视频大小一键搞定</span>
      </div>
    </div>
    <div class="container_bottom">
      <div class="bottom_item">
       视频水印
       <span>视频增加或去水印</span>
      </div>
      <div class="bottom_item">
        视频分割
        <span>视频切割 画面裁剪</span>
      </div>
      <div class="bottom_item">
       视频合并
       <span>多段视频自由组合 合并成一段</span>
      </div>
      <div class="bottom_item">
       视频转GIF
       <span>截取视频片段 制作成GIF动图</span>
      </div>
      <div class="bottom_item">
       屏幕录制
       <span>支持全屏和区域录制 系统和麦克风录音</span>
      </div>
      <div class="bottom_item">
       视频配乐
       <span>增加视频背景音乐</span>
      </div>
      <div class="bottom_item">
       视频美化
       <span>调整视频色调 支持多种滤镜</span>
      </div>
      <div class="bottom_item">
        视频截图
        <span>逐帧截图 连续截图 输出长图</span>
      </div>
      <div class="bottom_item">
        语音文字
        <span>文字与语音互转</span>
      </div>
      <div class="bottom_item">
        视频字幕
        <span>视频字幕配置</span>
      </div>
      <div class="bottom_item">
        翻译
        <span>中英文翻译</span>
      </div>
      <div class="bottom_item">
        视频播放器
        <span>支持文件 电视节目和直播</span>
      </div>
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
  flex-direction: column;
  overflow: hidden;
}
.container_top,.container_bottom{
  width:100%;
  margin:auto 10px;
  display: grid;
  align-content: start;
  gap: 20px 0;
  margin-top: 20px;
}
.container_top{
  grid-template-columns: repeat(3, 1fr);
}
.container_bottom{
  grid-template-columns: repeat(4, 1fr);
}
.top_item,.bottom_item{

  margin-right: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  font-size: 18px;
}
.top_item{
  height: 200px;
  background-color: #027df0;
  color: #ffffff;
}
.top_item span,.bottom_item span{
  font-size: 10px;
  padding-top:10px;
}
.bottom_item{
  height: 140px;
  background-color: #8ec6fa;
  color: #000000;

}
.top_item a{
  color: #ffffff;
}
</style>
