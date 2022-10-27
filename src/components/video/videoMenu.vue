<template>
    <div class="menu">
        <div class="menu_item">
            <router-link target="_self" to="/videoConvert">视频转换</router-link>
        </div>
        <div class="menu_item">音频转换</div>
        <div class="menu_item">视频压缩</div>
        <div class="menu_item">视频水印</div>
        <div class="menu_item">视频分割</div>
        <div class="menu_item">视频合并</div>
        <div class="menu_item">视频转GIF</div>
        <div class="menu_item">屏幕录制</div>
        <div class="menu_item">视频配乐</div>
        <div class="menu_item">视频美化</div>
        <div class="menu_item">视频截图</div>
        <div class="menu_item">语音文字</div>
        <div class="menu_item">视频字幕</div>
        <div class="menu_item">翻译</div>
        <div class="menu_item">视频播放器</div>
    </div>
</template>

<script>
export default {
    name:'videoMenu'
}
</script>

<style scoped>
.menu{
    display: flex;
    flex-direction: column;

}
.menu_item{
    height: 50px;
    display: flex;
    padding-left: 10px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    background-color: rgb(231, 235, 238);
}
.menu_item:hover{
    background-color: rgb(31, 179, 248);
}

</style>