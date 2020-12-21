/* eslint-disable max-len */
export interface ITokenGenerateBodyReq {
    token: string; // token
    oldToken?: string; // origin token (optional)
    pushType: string; // enum 'FCM', 'APNS', 'APNS_SANDBOX', 'TENCENT', 'APNS_VOIP', 'APNS_SANDBOXVOIP', 'ADM'
    isNotificationAgreement: boolean; // boolean
    isAdAgreement: boolean; // boolean
    isNightAdAgreement: boolean; // boolean
    timezoneId: string; // IANA timezone style (Asia/Seoul)
    country: string; // ISO 3166
    language: string; // ISO 639-1
    uid: string; // userid (max 64, no emoji)
    deviceId: 'deviceId', // device id (max 36)
  }
