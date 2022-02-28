import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import { fetchUserData } from "./userSlice";

function* watchUser() {
  yield takeLatest(fetchUserData);
}

export function* userSaga() {
  yield all([fork(watchUser)]);
}
