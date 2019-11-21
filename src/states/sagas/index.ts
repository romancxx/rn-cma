import { all } from 'redux-saga/effects';
import auth from '@states/sagas/auth/index';


export default function* rootSaga() {
    yield all([
        auth,
    ]);
}