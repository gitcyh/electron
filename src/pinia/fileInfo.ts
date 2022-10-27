import { defineStore } from "pinia";


export const useFileInfoStore = defineStore('fileInfo',{
    state:()=>{
        return{
            fileList:[],
            outputPath:'C:/'
        }
    },
    getters:{},
    actions:{},
})
