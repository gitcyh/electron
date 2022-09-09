<template>
  <div class="main">
    <div class="top">
      <div class="left">
        left
      </div>
      <div class="main_right">
        <div class="nav">
          <router-link to="/">首页</router-link><span>></span><span>视频转换</span>
        </div>
        <videoHead @clearParentList="clearList" @addParentFile="addFile" @addParentFolder="addFloder" :outparentPath="state.outPath" />
        <div class="list" @dragover="fileDragover" @drop="fileDrop">
         <videoList v-for="(item,index) in state.list" :key="index" :fileData="item" :outparentPath="state.outPath"></videoList>
         <el-upload :on-success="success" ref="eluplod"  :http-request="upload"  v-if="state.list.length == 0" class="upload-demo"  drag  action="#"
            accept=".mp4,.ogg,.webm,.qlv,.flv,.qsv,.avi,.ifox" :before-upload="beforeUpload" :show-file-list="false" multiple>
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              将文件拖动到这里或当前页面
              <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">支持mp4,ogg,webm,qlv,ifox,flv,qsv,avi视频格式</div>
            </template>
         </el-upload>
        </div>
        <videoFooter :parentFiles="state.list" :outparentPath="state.outPath"  @changeOutPath="changeOutPath" />
      </div>
    </div>

    <div class="main_footer">footer</div>
  </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue';
import videoHead from './videoHead.vue';
import videoFooter from './videoFooter.vue';
import videoList from "./videoList.vue";
import FileConvert from '../FileConvert.js';

import {defineComponent, reactive,ref} from 'vue'

export default defineComponent({
  name: "videoConvert",
  components: {
    videoList: videoList,
    UploadFilled:UploadFilled,
    videoHead:videoHead,
    videoFooter:videoFooter,
  },

  setup(){
    let elupload = ref(null);
    let show = ref(false);
    const state = reactive({
      list:[],
      outPath:"C:/Users/16430/Desktop"
    })

    const fileDragover = function(e) {
      e.preventDefault();
    }

    const fileDrop = function(e) {
      e.preventDefault();
      let file = Array.from(e.dataTransfer.files);
      file.forEach(item=>{
        if(FileConvert.checkFileType(item.name)){
        FileConvert.getFile("",[item.path]).then(data=>{
          state.list = state.list.concat(data);
        }).catch(error=>{
            console.log(error);
          })
        }
      })
    }

    const upload = function(data){
      let file = [data.file.path];
      FileConvert.getFile("",file).then(data=>{
        state.list = state.list.concat(data);
      }).catch(error=>{
            console.log(error);
        })
    }

    const changeOutPath = function(path){
      state.outPath = path;
    }

    const addFloder = function(data){
      if(data.length>0){
        let files = FileConvert.getFileList(data[0]);
        FileConvert.getFile("",files).then(data=>{
          state.list = state.list.concat(data);
        }).catch(error=>{
          console.log(error);
        })
      }
    }

    const clearList = function(){
      state.list = [];
    }

    const addFile = function(data){
      state.list = state.list.concat(data);
    }

    const beforeUpload = function(file) {
      if(event.type == "drop"){
        return false;
      }else{
        return FileConvert.checkFileType(file.name);
      }
    }

    const success = function(){
      elupload.value.clearList();
    }

    return{
      state,
      fileDragover,
      fileDrop,
      upload,
      changeOutPath,
      addFloder,
      addFile,
      clearList,
      beforeUpload,
      success,
      show

      
    }
  }
})

</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-size: 12px;
}
.top{
  display: flex;
  flex-direction: row;
  height: 95%;
}
.main_right{
  display: flex;
  width: 88%;
  flex-direction: column;
}
.left{
  width: 12%;
  border: 1px solid red;
}
.nav{
  height: 30px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
}

.list{
  height: 100%;
  background: rgb(231, 226, 226);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.main_footer{
  height: 5%;
  border: 1px solid rgb(19, 207, 19);
}
.upload-demo{
  margin: auto;
}


</style>

