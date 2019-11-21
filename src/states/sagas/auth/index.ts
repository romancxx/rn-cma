import { all, fork } from 'redux-saga/effects';
import signIn from './signIn'

export default all([
  fork(signIn),
]);
