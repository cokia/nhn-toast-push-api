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

export interface ISendMessageBodyReq {
    target : {
        type:string,
        to?: string[], // target.type이 수신자 UID 목록(최대 10,000 개) 또는 TAG 조건
        // "target.type"에 'TAG'로 설정시 "target.to"에 태그 아이디와 3개의 조건과 1개의 괄호('()')를 넣은 조건을 설정할 수 있습니다.
        pushTypes?: string[],
        countries?: string[]
    },
    content : {
        default : {
            title?:string,
            body?: string,
            notiifcation?:object, // FCM에서 사용하는 notification 필드
            style? : {
              useHtmlStyle?:boolean, // 'true'로 설정하면 iOS에서 HTML이 제거된 메시지가 표시됩니다.
            }
        }
    },
    messageType?: string, // NOTIFICATION, AD
    contact?: string, // messageType이 AD이면 경우 필수, 숫자(0-9)와 하이픈(Hypen, -)만 가능합니다.
    removeGuide?: string, // AD의 경우 필수
    timeToLiveMinute?: number, // 단위는 분입니다. 범위는 1에서 60까지다. 기본 값은 10 입니다.
    provisionedResourceId?: string,
    adWordPosition?: string, // 'TITLE', 'BODY' 광고 표시 문구 위치. 기본 값은 'TITLE' 입니다.
    statsId?: string
  }
