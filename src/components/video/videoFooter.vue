<template>
  <div class="output">
    <div class="output_left">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="输出路径" class="formItem">
          <el-input
            disabled
            style="width: 300px"
            v-model="state.props.outparentPath"
          ></el-input>
        </el-form-item>
        <el-form-item class="formItem">
          <el-button type="primary" @click="changePath()"
            ><el-icon><document-add /></el-icon>更改目录</el-button
          >
          <el-button type="primary" @click="openfloder()"
            ><el-icon><folder-add /></el-icon>打开文件夹</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="output_right">
      <el-button type="danger" @click="convertAll()">全部转换</el-button>
    </div>
  </div>
</template>

<script>
import { DocumentAdd, FolderAdd } from "@element-plus/icons-vue";
import { computed, defineComponent, onMounted, reactive, watch } from "vue";
import FileConvert from "../FileConvert.js";
const ipcRenderer = require("electron").ipcRenderer;

export default defineComponent({
  name: "videoFooter",
  props: {
    parentFiles: Array,
    outparentPath: String,
  },
  components: {
    DocumentAdd: DocumentAdd,
    FolderAdd: FolderAdd,
  },
  setup(props, context) {
    const state = reactive({
      props,
    });
    onMounted(function () {
      ipcRenderer.on("changeOutPath", getPath);
    });
    const changePath = function () {
      ipcRenderer.send("open-directory-dialog", {
        action: "changePath",
        type: ["openDirectory"],
      });
    };
    const getPath = function (e, path) {
      if (path.length > 0) {
        context.emit("changeOutPath", path[0]);
      }
    };
    const convertAll = function () {
      FileConvert.convertAll(
        state.props.parentFiles,
        state.props.outparentPath
      );
    };
    const openfloder = function () {
      let exec = require("child_process").exec;
      exec(`explorer.exe /cd,"${state.props.outparentPath}\\"`);
      // const { shell } = require("electron").remote;
      // shell.showItemInFolder(this.outparentPath+"\\")
    };
    const outPath = computed(function () {
      return state.props.outparentPath;
    });

    return {
      state,
      changePath,
      getPath,
      convertAll,
      openfloder,
      outPath,
    };
  },
});
</script>

<style scoped>
.demo-form-inline {
  height: 40px;
}
.formItem {
  margin-top: 5px;
}
.output{
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
}
</style>