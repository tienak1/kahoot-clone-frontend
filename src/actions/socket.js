import { CREATE_SOCKET } from "../constants/actionType";

export const createSocket = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SOCKET, payload: data });
  } catch (error) {
    console.log(error);
  }
};
