import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
