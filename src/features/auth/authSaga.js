import axios from "axios";
import { delay, put, all, fork, takeLatest } from "redux-saga/effects";
import { fetchUserData, logout } from "../user/userSlice";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
} from "./authSlice";

function* loginUser({ payload }) {
  const { email, displayName } = payload;

  try {
    yield delay(4000);

    const response = yield axios.post(process.env.REACT_APP_AUTH_URL, {
      email,
      displayName,
    });

    const { token, user } = response.data.data;

    sessionStorage.setItem("token", token);

    yield put(loginSuccess());
    yield put(fetchUserData({ user }));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* logoutUser() {
  yield put(loginSuccess());
  yield put(logout());
}

function* watchUserLogin() {
  yield takeLatest(loginRequest, loginUser);
}

function* watchUsesrLogout() {
  yield takeLatest(logoutRequest, logoutUser);
}

export function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUsesrLogout)]);
}
