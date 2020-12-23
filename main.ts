/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import fetch from 'node-fetch';
import { ITokenGenerateBodyReq, ISendMessageBodyReq } from './interface';

const toastBasicEndpoint = 'https://api-push.cloud.toast.com/push/v2.4/appkeys/';
const toastPushCheckEndpoint = 'https://collector-push.cloud.toast.com';
export default class toastPushApi {
  appKey: string;

  secretKey: string;

  constructor(key:string, secret:string) {
    this.appKey = key;
    this.secretKey = secret;
  }

  async generateToken(body:ITokenGenerateBodyReq) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  }

  // RES
  //   {
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode": 0,
  //         "resultMessage" : "success"
  //     }
  // }

  // get token info
  async getTokenInfo(pushType:string, token:string) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/tokens/${token}?pushType=${pushType}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  }

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
  async getTokenInfobyUID(uid:string) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/tokens?uid=${uid}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Secret-Key': `${this.secretKey}`,
      },
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  }

  // RES
  //   {
  //     "tokens": [{
  //         "pushType" : "FCM",
  //         "isNotificationAgreement": true,
  //         "isAdAgreement": true,
  //         "isNightAdAgreement": true,
  //         "timezoneId" : "Asia/Seoul",
  //         "country": "KR",
  //         "language": "ko",
  //         "uid" : "User ID",
  //         "token" : "Token",
  //         "updatedDateTime": "2017-08-12T01:04:18.000+09:00",
  //         "adAgreementDateTime": "2017-08-12T01:04:19.000+09:00",
  //         "nightAdAgreementDateTime": "2017-08-12T01:04:19.000+09:00",
  //         "deviceId" : "X3LOdJSQdNzCCvcbiSPZTGK1M9srPU5EumRD",
  //         "activatedDateTime" : "2017-08-12T01:04:19.000+09:00"
  //     }],
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode": 0,
  //         "resultMessage" : "success"
  //     }
  // }

  async getInvaildToken(pageIndex?: number, pageSize?: number, from?: string, to?:string, messageId?: number) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/invalid-tokens`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Secret-Key': `${this.secretKey}`,
      },
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  } // TODO : 인자 어떻게 처리할건지 !!

  // RES
  //   {
  //     "header" : {
  //         "resultCode" : 0,
  //         "resultMessage" : "success",
  //         "isSuccessful" : true
  //     },
  //     "invalidTokens" : [{
  //             "messageId" : 0,
  //             "uid" : "uid",
  //             "token" : "invalid-token",
  //             "pushType" : "FCM",
  //             "createdDateTime" : "2017-02-08T19:39:04.000+09:00"
  //         }
  //     ]
  // }

  // remove Token
  async removeToken(pushType:string, token:string) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/tokens/${token}?pushType=${pushType}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Secret-Key': `${this.secretKey}`,
      },
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  }

  // RES
  //   {
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode" : 0,
  //         "resultMessage" : "Success."
  //     }
  // }

  // MESSAGE
  // send Message

  async sendMessage(body:ISendMessageBodyReq) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/messages`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Secret-Key': `${this.secretKey}`,
      },
      body: JSON.stringify(body),
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  }

  // RES
  //   {
  //     "message" : {
  //         "messageId" : 0,
  //         "messageIdString": "0"
  //     },
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode": 0,
  //         "resultMessage" : "success"
  //     }
  // }

  // messageList

  async getMessageList(pageIndex?: number, pageSize?: number, from?: string, to?:string, deliveryType?: string, messageStatus?: string) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/messages`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Secret-Key': `${this.secretKey}`,
      },
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  } // TODO : 인자 어떻게 처리할건지 !!

  // RES
  //   {
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode": 0,
  //         "resultMessage" : "success"
  //     },
  //     "messages" : [{
  //         "messageId" : 0,
  //         "messageIdString": "0",
  //         "target" : {
  //         "type" : "ALL"
  //         },
  //         "content" : {
  //             "default" : {
  //                 "title": "title",
  //                 "body": "body"
  //             }
  //         },
  //         "messageType" : "AD",
  //         "contact": "1588-1588",
  //         "removeGuide": "매뉴 > 설정",
  //         "timeToLiveMinute": 60,
  //         "createdDateTime": "2017-02-13T09:30:00.000+09:00",
  //         "completedDateTime": "2017-02-13T09:30:00.000+09:00",
  //         "targetCount": 1000,
  //         "sentCount": 1000,
  //         "messageStatus": "COMPLETE",
  //         "provisionedResourceId": "[a-zA-Z0-9]{16}"
  //     }],
  //     "toatalCount": 1
  // }

  async getMessageInfo(messageId: string) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/messages/${messageId}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Secret-Key': `${this.secretKey}`,
      },
    });
    if (await response.status !== 200) {
      return (`${await response.status}, ${await response.body} `);
    }
    const value = await response.json();
    return value;
  }
  // RES
  //   {
  //     "message" : {
  //         "messageId" : 0,
  //         "messageIdString": "0",
  //         "target" : {
  //         "type" : "ALL"
  //         },
  //         "content" : {
  //             "default" : {
  //                 "title": "title",
  //                 "body": "body"
  //             }
  //         },
  //         "messageType" : "AD",
  //         "contact": "1588-1588",
  //         "removeGuide": "매뉴 > 설정",
  //         "timeToLiveMinute": 60,
  //         "createdDateTime": "2017-02-13T09:30:00.000+09:00",
  //         "completedDateTime": "2017-02-13T09:30:00.000+09:00",
  //         "targetCount": 1000,
  //         "messageStatus": "COMPLETE",
  //         "provisionedResourceId": "[a-zA-Z0-9]{16}"
  //     },
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode": 0,
  //         "resultMessage" : "success"
  //     }
  // }
}
