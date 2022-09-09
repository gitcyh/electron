<template>
    <div class="toolbtn">
        <div class="toolbtn_left">
        <el-button @click="addFile()" type="primary"><el-icon><document-add/></el-icon>添加文件</el-button>
        <el-button @click="addFolder()" type="primary"><el-icon><folder-add/></el-icon>添加文件夹</el-button>
    </div>
    <div class="toolbtn_right">
        <el-button @click="clearList()" type="danger"><el-icon><delete/></el-icon>清空列表</el-button>
    </div>
    </div>
</template>

<script>
import { DocumentAdd, FolderAdd, Delete } from '@element-plus/icons-vue';
import { defineComponent, onMounted } from 'vue';
const ipcRenderer = require('electron').ipcRenderer
import FileConvert from '../FileConvert.js';
export default defineComponent({
    name:'videoHead',
    components:{
        DocumentAdd:DocumentAdd,
        FolderAdd:FolderAdd,
        Delete:Delete,
    },
    setup(props,context){

        const addFile = function(){
            ipcRenderer.send('open-directory-dialog',{
                action:"addFile",
                type:['openFile','multiSelections']
            });
        }
        const addFolder = function(){
             ipcRenderer.send('open-directory-dialog',{
                action:"addFolder",
                type:['openDirectory']
            });
        }
        const getFile = function(e,file){
            if(file.length>0){
                FileConvert.getFile(e,file).then(data=>{
                    context.emit("addParentFile",data)
                }).catch(error=>{
                    console.log(error);
                })
            }
        }
        const getFolder = function(e,folder){
            if(folder){
               context.emit("addParentFolder",folder)
            }
        }
        const clearList = function(){
            context.emit('clearParentList');
        }

        onMounted(function(){
            ipcRenderer.on('selectedFile',getFile);
            ipcRenderer.on('selectedFolder',getFolder);
        })
        return {
            addFile,
            addFolder,
            getFile,
            getFolder,
            clearList
        }
    }
})

</script>

<style scoped>
.toolbtn{
  height: 50px;
  background: rgb(231, 226, 226);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
}
.toolbtn_left{
    width: 80%;
}
.toolbtn_right{
    align-items: right;
}
</style>