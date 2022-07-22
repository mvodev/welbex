import SET_TOTAL_PAGES from './tableCardReducer';

const setTotalPages = (payload) => ({
  type: SET_TOTAL_PAGES,
  payload,
});

export default setTotalPages;
