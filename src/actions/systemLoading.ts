import {createAction} from 'redux-actions'

export enum ActionType {
  show = '@@system/SHOW_LOADING',
  hide = '@@system/HIDE_LOADING',
}

export const systemShowLoading = createAction(ActionType.show)
export const systemHideLoading = createAction(ActionType.hide)

