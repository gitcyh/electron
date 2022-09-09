<template>
  <div class="list_container">
    <div class="list_left">
      <div class="fileImg"></div>
        <div class="fileData">
           <el-tooltip :content="state.fileData.fileName" effect="customized">
            <div class="fileName textOverflow">
              {{fileData.fileName}}
            </div>
           </el-tooltip>
          
          <div class="fileType">
            <label class="label-w" for="type">格式：{{state.fileData.type}}</label>
            <label for="px">分辨率：{{state.fileData.width}}*{{state.fileData.height}}</label>
          </div>
          <div class="fileSize">
            <label class="label-w" for="time">时长：{{state.fileData.formatTime}}</label>
            <label for="size">大小：{{state.fileData.size}}</label>
          </div>
        </div>
    </div>
    <div class="list_icon">
      <el-icon><right /></el-icon>
    </div>
    <div class="list_right">
      <div class="fileData">
        <el-tooltip :content="state.fileData.name" effect="customized">
          <div class="fileName textOverflow">{{state.fileData.name}}</div>
        </el-tooltip>
        <div class="fileType">
          <label class="label-w" for="type">格式：{{state.fileData.selectType}}</label>
          <label for="px">分辨率：{{state.fileData.width}}*{{state.fileData.height}}</label>
        </div>
        <div class="fileSize">
          <label class="label-w" for="time">时长：{{state.fileData.formatTime}}</label>
          <label for="time">转换格式：</label>
          <el-select v-model="state.fileData.selectType"  placeholder="Select" size="small" style="width:85px">
            <el-option v-for="item in state.fileType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="list_btn">
        <el-progress type="circle" v-if="!state.fileData.isComplete" :width="80" :percentage="state.fileData.progress" />
        <el-button type="primary" v-if="!state.fileData.isComplete" @click="startConvert(state.fileData)" :disabled="state.fileData.isConverting" >{{state.fileData.isConverting ? '正在转换' : '开始转换'}}</el-button>
        <el-button type="primary" v-if="state.fileData.isComplete"><el-icon><video-play /></el-icon>播放</el-button>
        <el-button type="primary" v-if="state.fileData.isComplete" @click="openFloder(state.fileData)"><el-icon><folder-opened /></el-icon>打开文件夹</el-button>  
     </div>
    </div>
    
  </div>
  
</template>
<style>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
.el-progress span {
  font-size: 16px;
}
</style>
<script>
import {VideoPlay,FolderOpened,Right} from '@element-plus/icons-vue';
import FileConvert from '../FileConvert.js';

import {defineComponent, onUnmounted, reactive} from 'vue'

export default defineComponent({
  name: 'videoList',
  props:{
    fileData:Object,
    outparentPath:String,
  },
  components:{
    VideoPlay:VideoPlay,
    FolderOpened:FolderOpened,
    Right:Right,
  },
  setup(props,context){
    const state = reactive({
      fileData: props.fileData,
      outparentPath: props.outparentPath,
      fileType:['mp4','flv','ogg','webm','avi'],
      selectType:'mp4'
    })

    const startConvert = function(data){
      if(!data.isConverting){
        FileConvert.convertAll([data],props.outparentPath);
      }
    }
    const openFloder = function(fileData){
      let exec = require('child_process').exec;
      exec(`explorer.exe /select,"${state.outparentPath}\\${fileData.name}.${state.selectType}"`);
    }

    return {
      state,
      startConvert,
      openFloder
    }
  }
})

</script>


<style scoped>
.list_container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin: 4px;
}
.list_left{
  display:flex;
}
.list_right{
   display:flex;
}
.textOverflow{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.fileItem{
  width: 100%;
  height:80px;
  border: 1px solid red;
  display:flex;
  flex-direction: row;
  overflow-x:hidden;
 
}
.fileLeft{
  width: 40%;
  display:flex;
  flex-direction: row;
}
.fileRight{
  width: 40%;
}
.fileData{
  margin-left: 8px;
  text-align: left;
}
.fileImg{
  width: 100px;
  height: 80px;
  background: cornflowerblue;
  background: url('../../assets/fileImg.jpeg') no-repeat;
  cursor: pointer;
}

.fileName{
  height: 26px;
  width:200px;
}
.fileType{
  height: 26px;
  font-size: 14px;
}

.fileSize{
  height: 26px;
  font-size: 14px;
}
.label-w{
   width: 110px;
   display: inline-block;
}

.fileButton{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.fileButton button{
  margin-top:23px;
}
.play{
  width: 44px;
  margin-right: 5px;

}
 .open{
  width: 100px;
}

.list_btn{
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
