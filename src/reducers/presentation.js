import { CREATE_NEW_PRESENTATON } from "../constants/actionType";

const initialState = {
  presentation: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_PRESENTATON:
      return { ...state, presentation: action.payload };
    default:
      return state;
  }
};
export default reducer;
