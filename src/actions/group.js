import * as api from "../api/index";
import {
  CREATE_NEW_GROUP,
  DELETE_GROUP,
  GET_GROUP,
} from "../constants/actionType";

export const getAllGroup = () => async (dispatch) => {
  try {
    const { data } = await api.getAllGroup();
    dispatch({ type: GET_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createNewGroup = (groupInfo) => async (dispatch) => {
  try {
    const { data } = await api.createNewGroup(groupInfo);
    dispatch({ type: CREATE_NEW_GROUP, payload: groupInfo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    const { data } = await api.deleteGroup(groupId);
    dispatch({ type: DELETE_GROUP, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
