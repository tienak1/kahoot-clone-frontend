import { CREATE_NEW_GROUP, GET_GROUP } from "../constants/actionType";

const initialState = {
  group: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP:
      return { ...state, group: action.payload };
    case CREATE_NEW_GROUP:
      return { ...state, group: action.payload };
    default:
      return state;
  }
};

export default reducer;
