import axios, {AxiosRequestConfig} from 'axios';
import FetchException from './fetchException';
import {ExceptionTypes} from './consts/index';
import { systemReportError } from '../actions/index';
import FetchResponse from './fetchResponse';

type ParamsMethodsType =
  | 'get'
  | 'delete'
  | 'head'
  | 'options'

type BodyMethodsType =
	| 'post'
	| 'put'
  | 'patch'

export type MethodsType = ParamsMethodsType | BodyMethodsType | 'form'

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

  get = async (path: string, data: any, headers?: any) => this._fetch('get', path, data, headers)
  post = async (path: string, data: any, headers?: any) => this._fetch('post', path, data, headers)
  put = async (path: string, data: any, headers?: any) => this._fetch('put', path, data, headers)
  patch = async (path: string, data: any, headers?: any) => this._fetch('patch', path, data, headers)
  delete = async (path: string, data: any, headers?: any) => this._fetch('delete', path, data, headers)
  head = async (path: string, data: any, headers?: any) => this._fetch('head', path, data, headers)
  options = async (path: string, data: any, headers?: any) => this._fetch('options', path, data, headers)
  form = async (path: string, data: any, headers?: any) => this._fetch('form', path, data, headers)

  private _fetch = async (
    method: MethodsType,
    path: string,
    data: any,
    headers: any = {},
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
        resJson = await axios[requestMethod as ParamsMethodsType](path, fetchConfig)
      } else {
        resJson = await axios[requestMethod as BodyMethodsType](path, data, fetchConfig)
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
        return response.body;
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

export const api = new FetchRequest();

export default FetchRequest;
