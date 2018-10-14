import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:3000', // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
/*        if (store.getters.token) {
            config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }*/
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.code !== 20000) {
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default service