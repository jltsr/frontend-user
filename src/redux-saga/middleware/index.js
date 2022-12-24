import { takeEvery, all } from 'redux-saga/effects';
import * as ActionTypeUser from '../constants/User';

import {handleSignup,handleSignin, handleLogout, handleGetUser} from './UserSaga'

function *watchAll() {
  yield all([
    takeEvery(ActionTypeUser.SIGNUP_REQUEST, handleSignup),
    takeEvery(ActionTypeUser.SIGNIN_REQUEST, handleSignin),
    takeEvery(ActionTypeUser.LOGOUT_REQUEST, handleLogout),
    takeEvery(ActionTypeUser.GET_USER_REQUEST, handleGetUser)
  ])
}

export default watchAll;


