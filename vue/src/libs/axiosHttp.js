import axios from 'axios'
import qs from "qs"
const axiosHttp = axios.create({
  baseURL: 'http://localhost:3001',
});
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//添加请求拦截器
axiosHttp.interceptors.request.use(config => {
  //在发送请求之前做某事
  if (config.method === 'post') {
    // 序列化
    config.data = qs.stringify(config.data);
  }
  let token = localStorage.getItem('koaToken')
  config.headers = {
    'authorization':'Bearer '+token
  }
  return config;
}, error => {
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axiosHttp.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error) // 返回接口返回的错误信息
});

export default axiosHttp
