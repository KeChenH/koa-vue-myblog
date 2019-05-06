import axios from 'axios'
import qs from "qs"
const axiosHttp = axios.create({
  baseURL: 'http://localhost:3001',
});
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截器
axiosHttp.interceptors.request.use(config => {
  if (config.method === 'post') {
    // 序列化
    config.data = qs.stringify(config.data);
  }
  let token = localStorage.getItem('koaToken')
  config.headers = {
    'authorization': 'Bearer ' + token
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截器
axiosHttp.interceptors.response.use(response => {
  if(response.data.status==50014){
    alert('未授权，请重新登录(401)')
    window.location='/'
  }
  return response.data
}, err => {
  //==============  错误处理  ====================
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)';
        break;
      case 401:
        err.message = '未授权，请重新登录(401)';
        break;
      case 403:
        err.message = '拒绝访问(403)';
        break;
      case 404:
        err.message = '请求出错(404)';
        break;
      case 408:
        err.message = '请求超时(408)';
        break;
      case 500:
        err.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        err.message = '网络错误(502)';
        break;
      case 503:
        err.message = '服务不可用(503)';
        break;
      case 504:
        err.message = '网络超时(504)';
        break;
      case 505:
        err.message = 'HTTP版本不受支持(505)';
        break;
      default:
        err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  return Promise.reject(err) // 返回接口返回的错误信息
});

export default axiosHttp
