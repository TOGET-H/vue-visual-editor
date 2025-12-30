import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
// import router from './router'

const app = createApp(App)

app.use(createPinia())
// app.use(router)

app.mount('#app')


//构建假数据，测试渲染位置
// 配置组件对应的关系{preview：xxx,render:xxx,props:xxx}  --- IGNORE ---
