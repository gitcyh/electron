import {createRouter,createWebHashHistory} from 'vue-router'

import videoConvert from '../components/video/videoConvert.vue'
import videComponent from '../components/video/videoConvertIndex.vue'

const routes = [
    {path:'/',component:videComponent},
    {path:'/videoConvert',component:videoConvert},
]

const router = createRouter({
    history:createWebHashHistory(),  
    routes,
})
export default router;