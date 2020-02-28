import {ExceptionTypes} from './consts/index';

export default class FetchException {
  name: string
  message: string
  type: ExceptionTypes
  data: any

  constructor(message: string, type = ExceptionTypes.HTTP, data = {}) {
    this.name = 'Fetch_Exception';
    this.message = message;
    this.type = type;
    this.data = data;
  }
}
