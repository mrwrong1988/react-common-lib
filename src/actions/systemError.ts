export const SYSTEM_REPORT_ERROR = '@@system/REPORT_ERROR';
export const SYSTEM_CLEAN_ERROR = '@@system/CLEAN_ERROR';

export function systemReportError(error: Error) {
  return {
    type: SYSTEM_REPORT_ERROR,
    payload: error
  };
}

export function systemCleanError() {
  return {
    type: SYSTEM_CLEAN_ERROR
  };
}
