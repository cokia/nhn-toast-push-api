import fetch from 'node-fetch';

const toast_appkey = 'xjrdxV3H1NMEFdDb';
const toast_secretkey = 'lliOwRne';
const toast_basic_endpoint = 'https://api-push.cloud.toast.com';
const toast_push_check_endpoint = 'https://collector-push.cloud.toast.com';

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

fetch('https://api-push.cloud.toast.com/push/v2.4/appkeys/${toast_appkey}/tokens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  body: JSON.stringify({
    oldToken: 'oldToken', // origin token (optional)
    token: 'token', // token
    isNotificationAgreement: true, // boolean
    isAdAgreement: true, // boolean
    isNightAdAgreement: true, // boolean
    pushType: 'FCM', // enum 'FCM', 'APNS', 'APNS_SANDBOX', 'TENCENT', 'APNS_VOIP', 'APNS_SANDBOXVOIP', 'ADM'
    timezoneId: 'Asia/Seoul', // IANA timezone style
    uid: 'uid', // userid (max 64, no emoji)
    country: 'KR', // ISO 3166
    language: 'ko', // ISO 639-1
    deviceId: 'deviceId', // device id (max 36)
  }),
}).then((res) => res.json())
  .then((json) => console.log(json));

// RES
//   {
//     "header" : {
//         "isSuccessful" : true,
//         "resultCode": 0,
//         "resultMessage" : "success"
//     }
// }
