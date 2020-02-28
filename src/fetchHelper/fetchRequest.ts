import axios, {AxiosRequestConfig} from 'axios';
import FetchException from './fetchException';
import {ExceptionTypes, HttpMethods} from './consts/index';
import { systemReportError } from '../actions/index';
import FetchResponse from './fetchResponse';

type paramsMethodsType =
  | 'get'
  | 'delete'
  | 'head'
  | 'options'

type bodyMethodsType =
	| 'post'
	| 'put'
	| 'patch'

const paramsMethods = ['get', 'delete', 'head', 'options']

// 用于创建fetch请求
class FetchRequest {

  static dispatch: any;

  /**
   * 绑定store到Request
   * @param store - redux store
   */
  static connectToRedux(store: any) {
    FetchRequest.dispatch = store.dispatch;
  }

  /**
   * 预处理fetch请求头
   */
  static preHandleHeader(path: string, data: any, headers: any) {
    return {};
  }

  /**
   * 预处理fetch请求响应头
   */
  static preHandleResponse(error: Error, refetch: any) {
    return false;
  }

  private _fetch = async (
    method: paramsMethodsType | bodyMethodsType | 'form',
    path: string,
    data: any,
    headers: any,
  ) => {
    const isForm = method === 'form'
    let fetchConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        ...FetchRequest.preHandleHeader(path, data, headers),
        ...headers,
      }
    }

    const requestMethod = isForm ? 'post' : method
    try {
      let resJson
      if (paramsMethods.indexOf(method)  === -1) {
        fetchConfig = { params: data, ...fetchConfig }
        resJson = await axios[requestMethod as paramsMethodsType](path, fetchConfig)
      } else {
        resJson = await axios[requestMethod as bodyMethodsType](path, data, fetchConfig)
      }
      const response = new FetchResponse(resJson);
        if (!response.success) {
          throw new FetchException(response.message, ExceptionTypes.SERVICE, {
            code: response.code,
            path,
            res: {
              ...response,
            },
          });
        }
        return {
          ...response,
        };
    } catch (error) {
      const refetch= () => this._fetch(method, path, data, headers)
      if (!FetchRequest.preHandleResponse(error, refetch)) {
        if (FetchRequest.dispatch && error instanceof FetchException) {
          FetchRequest.dispatch(systemReportError(error));
        }
        throw error;
      }
    }
  }
}

export default FetchRequest;
