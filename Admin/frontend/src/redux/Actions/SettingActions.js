import {
  ADD_SETTING,
  EMPTY_SETTING,
  REMOVE_SETTING,
} from '../Constants/SettingConstants';

export const addSetting = (settingData) => (dispatch, getState) => {
  dispatch({ type: ADD_SETTING, payload: settingData });

  localStorage.setItem(
    '_settingItem',
    JSON.stringify(getState().setting.settingItem)
  );
};

export const removeSetting = (name) => (dispatch, getState) => {
  dispatch({ type: REMOVE_SETTING, payload: name });
  localStorage.setItem(
    '_settingItem',
    JSON.stringify(getState().setting.settingItem)
  );
};

export const emptySetting = () => (dispatch, getState) => {
  dispatch({ type: EMPTY_SETTING, payload: {} });
  localStorage.setItem(
    '_settingItem',
    JSON.stringify(getState().setting.settingItem)
  );
};
