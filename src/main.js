import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css';
import { obsTimeFormat } from "./uitls/stringFormat";

const app = createApp(App)

app.use(router)

// 全局挂载解析obsTime的方法
app.provide('obsTimeFormat', obsTimeFormat)

app.mount('#app')
