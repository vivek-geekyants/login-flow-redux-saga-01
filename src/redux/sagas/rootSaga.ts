import { all, takeLatest } from "redux-saga/effects";
import { handleLoginUser, handleAddUser } from "./handlers/user";

//watcher saga to look for emmited actions
export function* watcherSaga() {
  yield takeLatest("LOGIN_USER", handleLoginUser);
  yield takeLatest("ADD_USER", handleAddUser);
}
