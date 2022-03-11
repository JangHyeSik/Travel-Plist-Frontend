import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "./weatherSlice";

function* fetchWeather({ payload }) {
  const { latitude, longitude } = payload;

  try {
    const response = yield axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    const { weather } = response.data;

    yield put(fetchWeatherSuccess(weather[0].main));
  } catch (err) {
    fetchWeatherFailure(err);
  }
}
function* watchFetchWeather() {
  yield takeLatest(fetchWeatherRequest, fetchWeather);
}

export function* weatherSaga() {
  yield all([fork(watchFetchWeather)]);
}
