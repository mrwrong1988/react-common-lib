export enum ExceptionTypes {
  HTTP = 'http error',
  SERVICE = 'services error',
}

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  FORM = 'form',
}

export enum ResponseCodes {
  UNKNOWN = -1,
  SUCCESS = 0,
  FAILED = 1,
}
