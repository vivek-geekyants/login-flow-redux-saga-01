import { call, put } from "redux-saga/effects";
import { addUser } from "../../actions";
import { requestGetUser, requestAddUser } from "../requests/user";

interface UserInfoArray {
  config: object;
  data: Array<object>;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

interface UserPayload {
  email: string;
  name: string;
  password: string;
}
interface ActionType {
  type: String;
  payload: UserPayload;
}

interface userLoginResponse {
  data: any;
}

export function* handleLoginUser(action: ActionType) {
  try {
    const response: UserInfoArray = yield call(requestGetUser, action.payload);
    const data: any = { ...response.data };
    console.log("getUser:", data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successfull");
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddUser(action: ActionType) {
  try {
    const response: userLoginResponse = yield call(
      requestAddUser,
      action.payload
    );
    const data = { ...response.data };
    console.log(data.status, data);
    if (data.status === "error") {
      alert(data.error);
    } else {
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }
}
