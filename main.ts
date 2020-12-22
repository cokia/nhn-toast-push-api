/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import fetch from 'node-fetch';
import { ITokenGenerateBodyReq } from './interface';

const toastBasicEndpoint = 'https://api-push.cloud.toast.com/push/v2.4/appkeys/';
const toastPushCheckEndpoint = 'https://collector-push.cloud.toast.com';
export default class toastPushApi {
  appKey: string;

  secretKey: string;

  constructor(key:string, secret:string) {
    this.appKey = key;
    this.secretKey = secret;
  }

  // token generate
  async generateToken(body:ITokenGenerateBodyReq) {
    await fetch(`${toastBasicEndpoint}${this.appKey}/tokens`, {
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
}

// get token info
// const toastPushApi.token.readToken = function(token:string,pushType:string){
//   fetch('${toast_basic_endpoint}/push/v2.4/appkeys/${toast_appkey}/tokens/${token}?pushType=${pushType}', {
//     headers: {
//         'Content-Type': 'application/json;charset=UTF-8'
//     },
//   }).then((res) => res.json())
//     .then((json) => console.log(json));
//   }
// RES
//   {
//     "token" : {
//         "pushType" : "FCM",
//         "isNotificationAgreement" : true,
//         "isAdAgreement" : true,
//         "isNightAdAgreement" : true,
//         "timezoneId" : "Asia/Seoul",
//         "country" : "KR",
//         "language" : "ko",
//         "uid" : "User ID",
//         "token" : "Token",
//         "updatedDateTime" : "2017-08-12T01:04:18.000+09:00",
//         "adAgreementDateTime" : "2017-08-12T01:04:19.000+09:00",
//         "nightAdAgreementDateTime" : "2017-08-12T01:04:19.000+09:00",
//         "deviceId" : "X3LOdJSQdNzCCvcbiSPZTGK1M9srPU5EumRD",
//         "activatedDateTime" : "2017-08-12T01:04:19.000+09:00"
//     },
//     "header" : {
//         "isSuccessful" : true,
//         "resultCode" : 0,
//         "resultMessage" : "success"
//     }
// }

// get Token info from UID
// const toastPushApi.token.readTokenFromUID = function(uid:string){
// fetch('${toast_basic_endpoint}/push/v2.4/appkeys/${APP_KEY}/tokens?uid=${uid}', {
//     headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         'X-Secret-Key': '${secretkey}'
//     },
//   }).then((res) => res.json())
//     .then((json) => console.log(json));
//   }
