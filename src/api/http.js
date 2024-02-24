/**
 * 网络请求配置
 */
import axios from "axios";



axios.defaults.timeout = 100000;
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = '/mock/';
} else if (process.env.NODE_ENV === 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '';
}

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8;';

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        if (response.data.errCode === 2) {
            console.log("过期");
        }
        return response;
    },
    (error) => {
        console.log("请求出错：", error);
    }
);

export function get(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                //关闭进度条
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
    });
}

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });;
    });
}

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
    });
}