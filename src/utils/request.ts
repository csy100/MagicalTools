import axios from "axios";
import {ElMessage} from "element-plus";
import {BASE_URL} from "@/utils/type.ts";

const request = axios.create({
    //基础路径
    baseURL: BASE_URL,
    timeout: 60000, //超时的时间的设置
    headers: {
        'Content-Type': 'application/json'
    }
})

let token = localStorage.getItem("token");
request.interceptors.request.use(
    config => {
        if(token) config.headers['authorization'] = token
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

request.interceptors.response.use((response) => {
    // 判断执行结果
    if (!response.data.success) {
        ElMessage({
            type: 'error',
            message: response.data.error
        })
        return Promise.reject(response.data.error)
    }

    return response.data;
}, (error) => {
    if (error.response !== undefined && error.response.status === 401) {
        // 用户未登录或凭证无效，提醒用户需要先登录
        ElMessage({
            message: '首次登录或登录信息已过期，请登录！',
            type: 'warning'
        })
        // localStorage.removeItem('token');
        localStorage.clear();
    }
    return Promise.reject(error);
})

export default request;