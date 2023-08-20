import {createApp} from 'vue'
import '@/style.css'
import App from '@/App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from "@/router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/utils/permission.ts'
import store from "@/store";

const app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router);
app.use(store);

app.mount('#app');