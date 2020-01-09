import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from './store'
import {isDev} from "./env";
import Cookies from "js-cookie";


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {

    if(!response.hasOwnProperty('data') || !response.data){
      response.data = {}
      response.data.errorCode = 0
    }

    const res = response.data


    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {

      if(res.code === 66001){

        if(!isDev){
          //清空cookies
          Cookies.set('Users_ID', '')
          Cookies.set('Stores_Bind_User_ID', '')//为了区分其他的user_id，所以弄了这个代表店铺的user_id
          Cookies.set('Stores_ID', '')
          Cookies.set('access_token', '')

          setTimeout(() => {
            location.href = '/member/login.php';
          },1000)
        }

      }

      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
    error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }

)

export default service