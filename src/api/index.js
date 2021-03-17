import axios from 'axios'
import Env from './env';

let token = '';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

axios.interceptors.request.use(function (config) {
    let user = JSON.parse(localStorage.getItem('access-user'));
    if (user) {
        token = user.userToken;
    }
    config.headers.common['token'] = token;
    return config;
},function (error) {
    console.log("error: ");
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    
    if (response.data && response.data.code) {
      
      if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
        //未登录
        response.data.msg = "登录信息已失效，请重新登录";
        localStorage.removeItem('access-user');
        alert(response.data.msg);
        var url = window.location.host
        window.location.href = "/login";
      }
      if (parseInt(response.data.code) === -1) {
        alert("请求失败");
      }
    }
    return response;
  }, function (error) {
    // Do something with response error
    console.dir(error);
    alert("服务器端出现未知错误");
    return Promise.reject(error);
  })

let base = Env.baseURL;
//通用方法
export const POST = (url, params) => {
    // const getTimestamp = new Date().getTime();
    return axios.post(`${base}${url}`, params).then(res => res.data)
  }
  
  export const GET = (url, params) => {
    // const getTimestamp = new Date().getTime();
    return axios.get(`${base}${url}`).then(res => res.data)
  }
  
//   export const PUT = (url, params) => {
//     return axios.put(`${base}${url}`, params).then(res => res.data)
//   }
  
//   export const DELETE = (url, params) => {
//     return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
//   }
  
//   export const PATCH = (url, params) => {
//     return axios.patch(`${base}${url}`, params).then(res => res.data)
//   }