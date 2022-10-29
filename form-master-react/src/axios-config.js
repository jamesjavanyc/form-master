// import store from '@/store';
import axios from "axios";


const axiosService = axios.create({
    headers:{
        'Content-Type': 'application/json'
    },
    timeout: 5000,
    withCredentials: true,
    crossDomain:true,
    'Access-Control-Allow-Credentials':true,
});

// request 请求拦截器
axiosService.interceptors.request.use(
    config => {
        //设置header
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
        // 让每个请求携带自定义token 
        // if (store.getters.token) {
        //     // header添加token
        //     config.headers["Authorization"] = store.getters.token;
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// respone 响应拦截器
axiosService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let errObj
        if (error.response.status === 400) {
            errObj={
                message: "参数信息有误",
                center: true
            };
            return;
        } else if (error.response.status === 401) {
            errObj={
                message: "用户未登录",
                center: true
            };
            //router.push("/login");
            window.location.replace("/login")
            return;
        } else if (error.response.status === 404) {
            errObj={
                message: "连接失败",
                center: true
            };
            return;
        } else if (error.response.status === 500) {
            errObj={
                message: "服务器内部错误",
                center: true
            };
            return;
        } else if (error.response.status === 560) {
            errObj={
                message: "数据库异常",
                center: true
            };
            return;
        }
        return Promise.reject(error);
    }
);

export default axiosService;
