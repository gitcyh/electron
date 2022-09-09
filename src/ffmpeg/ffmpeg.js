const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

if(process.env.NODE_ENV == "development"){
    console.log("开发环境",path.join(process.cwd(),'src/plugin/ffmpeg.exe'))
    ffmpeg.setFfmpegPath(path.join(process.cwd(),'src/plugin/ffmpeg.exe'))
    ffmpeg.setFfprobePath(path.join(process.cwd(),'src/plugin/ffprobe.exe'))

}else{
    console.log("生产环境",path.join(process.cwd(),'resources/plugin/ffmpeg.exe'))
    ffmpeg.setFfmpegPath(path.join(process.cwd(),'resources/plugin/ffmpeg.exe'))
    ffmpeg.setFfprobePath(path.join(process.cwd(),'resources/plugin/ffprobe.exe'))
}

export default ffmpeg
