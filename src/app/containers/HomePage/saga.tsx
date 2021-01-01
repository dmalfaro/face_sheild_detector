import axios, { AxiosRequestConfig } from 'axios';
import { TakeableChannel } from 'redux-saga';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { setClassificationRequested, actions } from './slice';
import { SagaPayloadType } from './types';

function* fetchClassification({ payload }: { payload: SagaPayloadType }) {
  yield put(actions.setLoading(true));
  const { url, base64 } = payload;

  const config: AxiosRequestConfig = { method: 'post', url, data: { base64 } };

  const result = yield call(() => axios(config));

  const {
    data: { status, ...restResult },
  } = result;

  if (status === 200) {
    yield put(actions.setClassificationResponse(restResult));
  }

  yield put(actions.setLoading(false));
}

export default function* homepageSaga() {
  yield all([
    takeLatest(
      (setClassificationRequested.type as unknown) as TakeableChannel<unknown>,
      fetchClassification,
    ),
  ]);
}
