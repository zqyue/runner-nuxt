import axios from 'axios'


const instance=axios.create({
  // baseURL:'http://'+process.env.HOST+':'+process.env.PORT,
  timeout: 15000,
  withCredentials: true,
  responseType: 'json',
})

instance.interceptors.request.use(function (config) {

  return config
},function (error) {

  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {

  return response.data

},function (error) {
  return Promise.reject(error)
})


export default instance



// axios.create({
//   baseURL:'http://'+process.env.HOST+':'+process.env.PORT,
//   timeout: 1000,
//   withCredentials: true,
//   responseType: 'json',
// })

// axios.interceptors.request.use(function (config) {
//   console.log('=====')
//   console.log(config)
//
//   return config
// },function (error) {
//
//   return Promise.reject(error)
// })
//
// axios.interceptors.response.use(function (response) {
//
//   return response
//
// },function (error) {
//   return Promise.reject(error)
//
// })
//
//
// export default axios



