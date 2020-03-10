import {createAction} from 'redux-actions'

export enum ActionType {
  report = '@@system/REPORT_ERROR',
  clean = '@@system/CLEAN_ERROR',
}

export const systemReportError = createAction(ActionType.report, (error?: Error) => error)
export const systemCleanError = createAction(ActionType.clean)
