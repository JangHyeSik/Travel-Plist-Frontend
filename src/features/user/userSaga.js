import axios from "axios";
import { put, all, fork, takeLatest } from "redux-saga/effects";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  createTravelRequest,
  createTravelSuccess,
  createTravelFailure,
  createTravelDetailRequest,
  createTravelDetailSuccess,
  createTravelDetailFailure,
  createTravelDiaryRequest,
  createTravelDiarySuccess,
  createTravelDiaryFailure,
  deleteTravelRequest,
  deleteTravelSuccess,
  deleteTravelFailure,
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
      process.env.REACT_APP_TRAVEL_URL,
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

function* createTravelDetail({ payload }) {
  const {
    travelId,
    travellogid,
    travelPlaces,
    travelDetails,
    coordinates,
    token,
  } = payload;

  try {
    const response = yield axios.put(
      `${process.env.REACT_APP_TRAVEL_URL}/${travelId}/${travellogid}`,
      {
        travelPlaces,
        travelDetails,
        coordinates,
      },
      { headers: { Authorization: token } }
    );

    const { updatedTravel } = response.data;

    yield put(createTravelDetailSuccess({ updatedTravel }));
  } catch (err) {
    yield put(createTravelDetailFailure(err));
  }
}

function* createTravelDiary({ payload }) {
  const {
    travelid,
    travellogid,
    traveldiaryid,
    formData,
    travelDiaryText,
    photoUrl,
    recordedAudioUrl,
    token,
  } = payload;

  try {
    const response = yield axios.put(
      `${process.env.REACT_APP_TRAVEL_URL}/${travelid}/${travellogid}/${traveldiaryid}`,
      formData,
      {
        headers: {
          Authorization: token,
        },
        params: {
          travelDiaryText,
          photoUrl,
          recordedAudioUrl,
        },
      }
    );

    const { updatedTravel } = response.data;

    yield put(createTravelDiarySuccess({ updatedTravel }));
  } catch (err) {
    yield put(createTravelDiaryFailure(err));
  }
}

function* deleteTravel({ payload }) {
  const { userId, travelId, token } = payload;

  try {
    const response = yield axios.delete(
      `${process.env.REACT_APP_TRAVEL_URL}/${travelId}`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          userId,
        },
      }
    );

    yield put(
      deleteTravelSuccess({ deletedTravel: response.data.deletedTravel })
    );
  } catch (err) {
    yield put(deleteTravelFailure(err));
  }
}

function* watchCreateTravel() {
  yield takeLatest(createTravelRequest, createTravel);
}

function* watchCreateTravelDetail() {
  yield takeLatest(createTravelDetailRequest, createTravelDetail);
}

function* watchCreateTravelDiary() {
  yield takeLatest(createTravelDiaryRequest, createTravelDiary);
}

function* watchDeleteTravel() {
  yield takeLatest(deleteTravelRequest, deleteTravel);
}

function* watchWeather() {
  yield takeLatest(fetchWeatherRequest, fetchWeatherData);
}

export function* userSaga() {
  yield all([
    fork(watchWeather),
    fork(watchCreateTravel),
    fork(watchCreateTravelDetail),
    fork(watchCreateTravelDiary),
    fork(watchDeleteTravel),
  ]);
}
