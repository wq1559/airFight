
import axios from 'axios';

const instance = axios.create({
    baseURL: '',
})

instance.interceptors.request.use(function (config) {  //暂时不做任何配置
    return config;
  }, function (error) {
    return Promise.reject(error.toString());
  });

instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error.toString());
  });


instance.defaults.withcredentials = true;
instance.defaults.timeout = 150000;


export default instance;