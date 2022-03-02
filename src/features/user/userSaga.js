import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  createTravelRequest,
  createTravelSuccess,
  createTravelFailure,
} from "./userSlice";

function* fetchWeatherData({ payload }) {
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

function* createTravel({ payload }) {
  const { title, startDate, endDate, token, userId } = payload;

  try {
    const response = yield axios.post(
      process.env.REACT_APP_CREATE_TRAVEL_URL,
      {
        title,
        startDate,
        endDate,
        userId,
      },
      { headers: { Authorization: token } }
    );

    const { newTravel } = response.data;

    yield put(createTravelSuccess({ newTravel }));
  } catch (err) {
    yield put(createTravelFailure(err));
  }
}

function* watchCreateTravel() {
  yield takeLatest(createTravelRequest, createTravel);
}

function* watchWeather() {
  yield takeLatest(fetchWeatherRequest, fetchWeatherData);
}

export function* userSaga() {
  yield all([fork(watchWeather), fork(watchCreateTravel)]);
}
