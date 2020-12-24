/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import fetch from 'node-fetch';
import {
  ITokenGenerateBodyReq, ISendMessageBodyReq, INewReservedMessageScheduleBodyReq, INewReservedMessageBodyReq,
} from './interface';

const toastBasicEndpoint = 'https://api-push.cloud.toast.com/push/v2.4/appkeys/';
// const toastPushCheckEndpoint = 'https://collector-push.cloud.toast.com';
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
  // get failed message list
  async getFailedMessageList(messageId?: string, messageErrorType?:string, messageErrorCause?:string, from?: string, to?:string, limit?:number) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/message-errors`, {
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
  //     "messageErrors" : [{
  //             "messageId" : 0,
  //             "messageIdString" : "0",
  //             "pushType" : "FCM",
  //             "messageErrorType" : "ClientError",
  //             "messageErrorCause" : "INVALID_CERTIFICATE",
  //             "payload" : {
  //                 "data" : {
  //                     "title" : "title",
  //                     "body" : "body"
  //                 }
  //             },
  //             "createdDateTime" : "2017-05-18T15:47:00.000+09:00",
  //             "tokens" : [{
  //                     "uid" : "uid-1",
  //                     "token" : "token-1"
  //                 }
  //             ]
  //         }
  //     ],
  //     "header" : {
  //         "isSuccessful" : true,
  //         "resultCode" : 0,
  //         "resultMessage" : "Success."
  //     }
  // }
  // get log from logging function
  async getLog(messageId?: string, uid?: string, token?: string, pushType?:string, from?:string, to?:string, limit?:number) { // 로깅을 활성화 한 상태에서만 호출 가능
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/logs/message?`, {
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
  } // TODO: 인자 처리 어떻게 할지

  // RES

  // {
  //   "header" : {
  //       "resultCode" : 0,
  //       "resultMessage" : "success",
  //       "isSuccessful" : true
  //   },
  //   "data" : {
  //       "count" : 0,
  //       "logs" : [{
  //               "logType" : "message-result",
  //               "logSource" : "tc-push",
  //               "messageId" : "1",
  //               "body" : "{\"tokens\":[{\"uid\":\"gimbimloki\",\"token\":\"1\"}],\"payload\":{\"aps\":{\"alert\":{\"title\":\"title\",\"body\":\"body\"},\"mutable-content\":1}}}",
  //               "logTime" : "1",
  //               "pushType" : "APNS",
  //               "sendTime" : "1",
  //                               "searchKey1": "1746041784729856",
  //                           "searchKey2": "FCM",
  //                           "searchKey3": "SENT",
  //               "sentResult" : "SENT",
  //               "host" : "127.0.0.1",
  //               "appkey" : "APP_KEY",
  //               "logVersion" : "v2",
  //               "isNeedStored" : "bulk",
  //               "projectName" : "L&CS_APP_KEY",
  //               "SinkVersion" : "-",
  //               "projectVersion" : "v2.2"
  //           }
  //       ]
  //   }

  // new reserved message schedules

  async newReservedMessageSchedule(body: INewReservedMessageScheduleBodyReq) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/schedules`, {
      method: 'POST',
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
  //     "header" : {
  //         "resultCode" : 0,
  //         "resultMessage" : "success",
  //         "isSuccessful" : true
  //     },
  //     "schedules" : [
  //         "2016-12-01T12:00",
  //         "2016-12-01T17:00",
  //         "2016-12-15T12:00",
  //         "2016-12-15T17:00",
  //         "2017-01-01T12:00",
  //         "2017-01-01T17:00",
  //         "2017-01-15T12:00",
  //         "2017-01-15T17:00",
  //         "2017-02-01T12:00",
  //         "2017-02-01T17:00",
  //         "2017-02-15T12:00",
  //         "2017-02-15T17:00"
  //     ]
  // }

  // new reserved message

  async newReservedMessage(body: INewReservedMessageBodyReq) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/reservations`, {
      method: 'POST',
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
  //     "header" : {
  //         "resultCode" : 0,
  //         "resultMessage" : "success",
  //         "isSuccessful" : true
  //     },
  //     "reservation" : {
  //         "reservationId": 666810348995587,
  //         "reservationIdString": "666810348995587"
  //     }
  // }

  // list of reservation messages
  async reservedMessageList(pageIndex?:number, pageSize?:number, from?:string, to?:string, reservationStatus?:string) {
    const response = await fetch(`${toastBasicEndpoint}${this.appKey}/reservations`, {
      method: 'POST',
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
  //         "resultCode" : 0,
  //         "resultMessage" : "success",
  //         "isSuccessful" : true
  //     },
  //     "reservations" : [{
  //             "reservationId" : 666810348995587,
  //             "reservationIdString" : "666810348995587",
  //             "schedules" : [{
  //                     "scheduleId" : 2455708,
  //                     "scheduleIdString" : "2455708",
  //                     "reservationId" : 666810348995587,
  //                     "reservationIdString" : "666810348995587",
  //                     "deliveryDateTime" : "2016-12-30T12:40:00.000+09:00",
  //                     "timezoneOffset" : 0,
  //                     "scheduleStatus" : "READY"
  //                 }
  //             ],
  //             "isLocalTime" : false,
  //             "target" : {
  //                 "type" : "UID",
  //                 "to" : [
  //                     "uid"
  //                 ]
  //             },
  //             "content" : {
  //                 "default" : {
  //                     "title" : "default title",
  //                     "body" : "default body"
  //                 },
  //                 "ko" : {
  //                     "title" : "한국어 제목",
  //                     "body" : "한국어 내용"
  //                 }
  //             },
  //             "messageType" : "NOTIFICATION",
  //             "timeToLiveMinute" : 60,
  //             "createdDateTime" : "2016-12-30T10:34:40.000+09:00",
  //             "updatedDateTime" : "2016-12-30T10:34:40.000+09:00",
  //             "completedDateTime" : "2016-12-30T10:34:40.000+09:00",
  //             "reservationStatus" : "RESERVED"
  //         }
  //     ],
  //     "totalCount" : 1
  // }
}
