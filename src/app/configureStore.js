import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import auth from "../features/auth/authSlice";
import user from "../features/user/userSlice";
import { authSaga } from "../features/auth/authSaga";
// import { userSaga } from "../features/user/userSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ auth, user });

function* rootSaga() {
  yield all([authSaga()]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
