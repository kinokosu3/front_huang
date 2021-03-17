import * as API from './'
export default {
  
  //验证手机号是否已注册
  // isExistUser: params => {
  //   return API.GET('login/isExistUser', params);
  // },
  test: params =>{
      return API.GET('test',params);
  },
  //注册
  register: params => {
    return API.POST('login/userRegister', params);
  },
  //密码登录
  login: params => {
    return API.POST('login', params);
  }
}