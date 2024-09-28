import {
  ADD_SIDE_BAR_MENU,
  EMPTY_SIDE_BAR_MENU,
} from '../Constants/SideBarMenuConstants';

const AddToLocalStorageSideBar = localStorage.getItem('_sideBarAdd');

// initial product add to localstorage
const initialStateSideBar = {
  sideBarAdd: JSON.parse(AddToLocalStorageSideBar)
    ? JSON.parse(AddToLocalStorageSideBar)
    : null,
};

// sidebar menu reducer
export const addToSideBarMenuReducer = (
  state = initialStateSideBar,
  action
) => {
  // code
  switch (action.type) {
    case ADD_SIDE_BAR_MENU:
      return {
        ...state,
        sideBarAdd: action.payload,
      };

    case EMPTY_SIDE_BAR_MENU:
      return {
        ...state,
        sideBarAdd: null,
      };

    default:
      return state;
  }
};
