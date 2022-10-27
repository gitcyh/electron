import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import pinia from './pinia/store'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.mount('#app');
