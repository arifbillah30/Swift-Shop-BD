import {
  ADD_SIDE_BAR_MENU,
  EMPTY_SIDE_BAR_MENU,
} from '../Constants/SideBarMenuConstants.js';

// add side bar menu
export const addSideBarMenu = (name) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SIDE_BAR_MENU,
    payload: name,
  });

  localStorage.setItem(
    '_sideBarAdd',
    JSON.stringify(getState().addToSideBar.sideBarAdd)
  );
};

// empty side bar menu
export const emptySideBarMenu = () => async (dispatch, getState) => {
  dispatch({
    type: EMPTY_SIDE_BAR_MENU,
    payload: null,
  });

  localStorage.setItem(
    '_sideBarAdd',
    JSON.stringify(getState().addToSideBar.sideBarAdd)
  );
};
