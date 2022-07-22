export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';

const initialState = {
  totalElements: 27,
};

const tableCardReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalElements: action.payload,
      };
    default:
      return state;
  }
};

export default tableCardReducer;
