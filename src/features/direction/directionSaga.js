import axios from "axios";
import { delay, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  fetchDirectionDataRequest,
  fetchDirectionDataSuccess,
  fetchDirectionDataFailure,
} from "./directionSlice";

function* fetchDirectionLocation({ payload }) {
  const { publicTransportDirectionData, travelMode, startPoint, endPoint } =
    payload;

  try {
    yield delay(3000);

    if (publicTransportDirectionData) {
      yield put(
        fetchDirectionDataSuccess({
          directionData: publicTransportDirectionData,
        })
      );
    } else {
      const response = yield axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/${travelMode}/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`
      );

      const directionData = {
        ...response.data.routes[0],
        directionMode: travelMode,
        address: [startPoint.address, endPoint.address],
      };

      yield put(fetchDirectionDataSuccess({ directionData }));
    }
  } catch (err) {
    fetchDirectionDataFailure(err);
  }
}
function* watchFetchDirectionLocation() {
  yield takeLatest(fetchDirectionDataRequest, fetchDirectionLocation);
}

export function* directionSaga() {
  yield all([fork(watchFetchDirectionLocation)]);
}
