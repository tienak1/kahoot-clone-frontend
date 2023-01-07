import * as api from "../api/index";
import { CREATE_NEW_PRESENTATON } from "../constants/actionType";

export const createNewPresentation =
  (newPresentation, history) => async (dispatch) => {
    try {
      const data = await api.createNewPresentation(newPresentation);
      dispatch({
        type: CREATE_NEW_PRESENTATON,
        payload: data,
      });
      history.push(`/presentation/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
