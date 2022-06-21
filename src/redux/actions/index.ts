import types from "../../utils/actionTypes";

export const loginUser = (userInfo: any) => ({
  type: types.LOGIN_USER,
  payload: { ...userInfo },
});

export const addUser = (userInfo: any) => ({
  type: types.ADD_USER,
  payload: { ...userInfo },
});
export const logoutUser = (userInfo: any) => ({
  type: types.LOGOUT_USER,
  payload: { ...userInfo },
});
