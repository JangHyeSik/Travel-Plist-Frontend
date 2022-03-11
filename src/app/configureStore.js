import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { all } from "redux-saga/effects";
import auth from "../features/auth/authSlice";
import user from "../features/user/userSlice";
import weather from "../features/weather/weatherSlice";
import { authSaga } from "../features/auth/authSaga";
import { userSaga } from "../features/user/userSaga";
import { weatherSaga } from "../features/weather/weatherSaga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ auth, user, weather });
const persistedReducer = persistReducer(persistConfig, rootReducer);

function* rootSaga() {
  yield all([authSaga(), userSaga(), weatherSaga()]);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
