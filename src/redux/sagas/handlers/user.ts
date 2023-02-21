import { call, put } from "redux-saga/effects";
import { addUser } from "../../actions";
import jwt from "jwt-decode";
import { requestGetUser, requestAddUser } from "../requests/user";
import types from "../../../utils/actionTypes";

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

    if (data.user) {
      localStorage.setItem("token", data.user);
      // create and yield a dispatch Effect

      // const user: string = jwt(data.user);
      if (
        data.user ===
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV…DUwfQ.36DISVby6x8ZuuaK9ishRMM3M36QUVgRZAXCA7qeG2o"
      ) {
        const user = {
          name: "Varun",
          email: "vivekl@geekyants.com",
        };

        yield put({ type: types.LOGIN_USER, payload: user });

        alert("Login successfull");
        // window.location.href = "/";
      }
    }
  } catch (error: any) {
    switch (error?.response?.status) {
      case 401:
        alert("unauthorized user");
        break;

      default:
        alert("please try again");
        break;
    }
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
