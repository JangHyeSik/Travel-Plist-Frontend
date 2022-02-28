import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import { fetchUserData } from "../user/userSlice";

function* login({ payload }) {
  const { email, displayName } = payload;

  try {
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

function* watchLogin() {
  yield takeLatest(loginRequest, login);
}

export function* authSaga() {
  yield all([fork(watchLogin)]);
}
