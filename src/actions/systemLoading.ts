export const SYSTEM_SHOW_LOADING = '@@system/SHOW_LOADING';
export const SYSTEM_HIDE_LOADING = '@@system/HIDE_LOADING';

export function systemShowLoading(text: string) {
  return {
    type: SYSTEM_SHOW_LOADING,
    payload: text
  };
}

export function systemHideLoading() {
  return {
    type: SYSTEM_HIDE_LOADING
  };
}
