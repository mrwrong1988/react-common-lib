import {some, pick} from 'lodash';
import {ResponseCodes} from './consts/index';

const SuccessCodes = pick(ResponseCodes, ['SUCCESS']);

export default class FetchResponse {


  static isSuccess(code: string | number) {
    return some(SuccessCodes, value => value === code);
  }

  static parseHeader(res: any) {
    return { code: res.code || ResponseCodes.UNKNOWN, message: res.message || '' };
  }

  static parseBody(res: any) {
    return res.data;
  }

  header: any;
  body: any;
  code: string | number;
  message: string;
  success: boolean;

  constructor(res: any) {
    this.header = FetchResponse.parseHeader(res);
    this.body = FetchResponse.parseBody(res);
    this.code = this.header.code;
    this.message = this.header.message;
    this.success = FetchResponse.isSuccess(this.code);
  }
}
