import {
  ADD_SETTING,
  EMPTY_SETTING,
  REMOVE_SETTING,
} from '../Constants/SettingConstants';

const settingLocalStorage = localStorage.getItem('_settingItem');

// initial setting to local Storage
const initialStateLocalStorage = {
  posSetting: JSON.parse(settingLocalStorage)
    ? JSON.parse(settingLocalStorage)
    : {},
};

// setting local storage reducer
export const settingReducers = (state = initialStateLocalStorage, action) => {
  switch (action.type) {
    case ADD_SETTING:
      const existsItem = state.settingItem.find(
        (x) => x.name === action.payload.name
      );
      if (existsItem) {
        return {
          ...state,
          settingItem: state.settingItem.map((x) => {
            if (x.name === existsItem.name) {
              return x;
            }
            return x;
          }),
        };
      } else {
        return {
          ...state,
          settingItem: [...state.settingItem, action.payload],
        };
      }

    case REMOVE_SETTING:
      return {
        ...state,
        settingItem: state.settingItem.filter((x) => x.name !== action.payload),
      };

    case EMPTY_SETTING:
      return {
        ...state,
        settingItem: [],
      };

    default:
      return state;
  }
};
