import fetch from 'node-fetch';
import {ITokenGenerateBodyReq } from './interface'
const toast_basic_endpoint = 'https://api-push.cloud.toast.com';
const toast_push_check_endpoint = 'https://collector-push.cloud.toast.com';

const toastPushApi = function (appkey, secretkey) {
  this.appkey = key;
  this.secretkey = secret;

  _.bindAll(this);
};

fetch('https://github.com/')
  .then((res) => res.text())
  .then((body) => console.log(body));

fetch('https://api.github.com/users/github')
  .then((res) => res.json())
  .then((json) => console.log(json));

fetch('https://httpbin.org/post', { method: 'POST', body: 'a=1' })
  .then((res) => res.json()) // expecting a json response
  .then((json) => console.log(json));

const body = { a: 1 };

fetch('https://httpbin.org/post', {
  method: 'post',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
})
  .then((res) => res.json())
  .then((json) => console.log(json));

// token

// token generate
const toastPushApi.token.generateToken = function(body:ITokenGenerateBodyReq){
fetch('https://api-push.cloud.toast.com/push/v2.4/appkeys/${toast_appkey}/tokens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  body: JSON.stringify(body),
}).then((res) => res.json())
  .then((json) => console.log(json));
}
// RES
//   {
//     "header" : {
//         "isSuccessful" : true,
//         "resultCode": 0,
//         "resultMessage" : "success"
//     }
// }

// token read
const toastPushApi.token.generateToken = function(token:string){
  fetch('https://api-push.cloud.toast.com/push/v2.4/appkeys/${toast_appkey}/tokens/${token}?pushType=${PUSH_TYPE}', {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
  }).then((res) => res.json())
    .then((json) => console.log(json));
  }
  // RES
  //   {
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode": 0,
  //         "resultMessage" : "success"
  //     }
  // }
  