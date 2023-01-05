import {
  ADD_MEMBER,
  CHANGE_ROLE,
  CREATE_NEW_GROUP,
  DELETE_GROUP,
  DELETE_MEMBER_FROM_GROUP,
  GET_GROUP,
  INVITE_MEMBER,
} from "../constants/actionType";

const initialState = {
  group: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP:
      return { ...state, group: action.payload };
    case CREATE_NEW_GROUP:
      return { ...state, group: action.payload };
    case DELETE_GROUP:
      return { ...state, group: action.payload };
    case ADD_MEMBER:
      return { ...state, group: action.payload };
    case CHANGE_ROLE:
      return { ...state, group: action.payload };
    case DELETE_MEMBER_FROM_GROUP:
      return { ...state, group: action.payload };
    case INVITE_MEMBER:
      return { ...state, group: action.payload };
    default:
      return state;
  }
};

export default reducer;
