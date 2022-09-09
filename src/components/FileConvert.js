const fs = require('fs');
const path = require('path')
import ffmpeg from '../ffmpeg/ffmpeg';

export default class FileConvert {
    constructor() {

    }

    // 调用ffprobe查询视频可用信息如时长分辨率等
    static getFileInfo(file) {
        let promise = new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file, function (err, metadata) {
                resolve(metadata);
            });
        })
        return promise;
    }


    static getSize(duration_ts) {
        let size = parseInt(duration_ts / 1024 / 1024);
        let size_ext = size + "M";
        if (size >= 1024) {
            size_ext = (size / 1024).toFixed(2) + 'GB';
        }
        return size_ext;
    }

    static getName(file) {
        let fileName = FileConvert.getFileName(file)
        return fileName.substring(0, fileName.lastIndexOf('.'), fileName.length)
    }

    static getFileName(file) {
        return file.substring(file.lastIndexOf('\\') + 1, file.length);
    }

    static getFileType(file) {
        return file.substring(file.lastIndexOf('.') + 1, file.length);
    }

    static getTime(time){
        let result = parseInt(time);
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return `${h}:${m}:${s}`;
    }

    static getFile(e, file) {
        // let fileObj = [];
        // if (file.length == 0) {
        //     return fileObj;
        // }
        return new Promise((resolve,reject)=>{
            let fileObj = [];
            let promise = [];
            file.forEach(item => {
                promise.push(FileConvert.getFileInfo(item));
            })
            Promise.all(promise).then(datas => {
                datas.forEach((data,index)=>{
                    let format = data.format;
                    let streams = data.streams[0];
                    let size = format.size;
                    let width = streams.width;
                    let height = streams.height;
                    let time = format.duration;
                    let path = file[index] || format.filename;
                    let obj = {
                        name:FileConvert.getName(path),//文件名不带格式
                        fileName: FileConvert.getFileName(path),//文件名带格式的
                        type: FileConvert.getFileType(path),//文件类型
                        size: FileConvert.getSize(size),//文件大小M或GB
                        width:width,
                        height:height,
                        formatTime:FileConvert.getTime(time),//格式化后的时间00:00:00
                        time:time,//总时间秒
                        path: path,//文件路径带格式
                        isComplete:false,//是否转换完成
                        progress:0,//转换进度
                        isConverting:false,//是否正在转换中
                        selectType: "mp4",//要转换的格式默认mp4
                    };
                    fileObj.push(obj);
                })
                resolve(fileObj);
            }).catch(err => {
                reject(err)
                console.log(err)
            });
        })
    }

    static checkFileType(name){
        let type =FileConvert.getFileType(name);
        let videoTyps = ['mp4','ogg','webm','qlv','flv','qsv','avi','ifox','kux'];
        return videoTyps.includes(type);

    }

    //获取文件夹下的所有文件
    static getFileList(path){
        let fileList = [];
        FileConvert.readFileList(path,fileList);
        return fileList;
    }
    static readFileList(path,fileList){
        let files = fs.readdirSync(path);
        files.forEach(item=>{
            let stat = fs.statSync(path+"/"+item);
            if(stat.isDirectory()){
                FileConvert.readFileList(path+"/"+item,fileList);
            }else{
                if(FileConvert.checkFileType(item)){
                    fileList.push(path+"/"+item);
                }
            }
        })
    }

    static convertAll(list,outPath){
        list.forEach(item=>{
            ffmpeg(item.path)
            .audioCodec('copy')
            .videoCodec('libx264')
            .preset('divx')
            .fps(25)
            .output(outPath + "/"+ item.name + "." + item.selectType)
            .on('codecData', data => {
                // 获取视频的信息
                console.log('codecData:', data)
              })
            .on('error', (err, stdout, stderr) => {
                console.error(err);
                console.error(stdout);
                console.error(stderr);
            })
            .on('start', (str) => { 
                console.log('开始：', str) 
            })
            .on('progress', (progress) => { 
                let time = progress.timemark;
                if(time){
                    let timeArr = time.split(":");
                    let all = Number(timeArr[0])*60*60+Number(timeArr[1])*60+Number(timeArr[2]);
                    let percent = parseInt(all/item.time * 100);
                    item.progress = percent;
                    item.isConverting = true;
                }
            })
            .on('end', (str) => {
                item.isComplete = true;
                item.isConverting = false;     
                console.log('finished');
            })
            .run()
        })
    }
}
