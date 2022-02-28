import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  fetchUserData,
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
} from "./userSlice";

function* fetchWeatherData({ payload }) {
  const { latitude, longitude } = payload;

  try {
    const response = yield axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    const { weather } = response.data;
    console.log(weather);

    yield put(getWeatherSuccess(weather[0].main));
  } catch (err) {
    getWeatherFailure(err);
  }
}

// function* watchUser() {
//   yield takeLatest(fetchUserData);
// }

function* watchWeather() {
  yield takeLatest(getWeatherRequest, fetchWeatherData);
}

export function* userSaga() {
  yield all([fork(watchWeather)]);
}
