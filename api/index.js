import fetch from './fetch'

// export default class Api {
//
//   static getScore(params){
//     return fetch({
//       method:'GET',
//       url:'/score',
//       params:params
//     })
//   }
//
//   static fetchData(params){
//     return fetch({
//       method:'GET',
//       url:'/fetch',
//       params
//     })
//   }
//
// }

  export function getScore(params){
    return fetch({
      method:'GET',
      url:'/score',
      params:params
    })
  }

  export function fetchData(params){
    return fetch({
      method:'GET',
      url:'/fetch',
      params
    })
  }
