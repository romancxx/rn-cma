import { takeLatest, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import {
    LOGIN,
} from '@states/actions/auth';
import { Alert } from 'react-native';
import { loginFail, loginSuccess } from '@states/actions/auth';
import { userLogin } from '@api/auth';


function* signInWorker({ payload: { username, password } }: AnyAction) {
    try {
        // yield call(userLogin,
        //     {
        //         username: username,
        //         password: password
        //     })
        yield put(loginSuccess());

    } catch (e) {
        Alert.alert('Failed to login');
        yield put(loginFail(e.message));
    }
}

function* signInWatcher(): SagaIterator {
    yield takeLatest(LOGIN, signInWorker);
}

export default signInWatcher;
