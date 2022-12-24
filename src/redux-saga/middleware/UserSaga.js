import {
    all, call, fork, put, takeEvery, takeLatest,
  } from 'redux-saga/effects';

import apiUser from '../../api/api-user'
import {  
    doSignupSucceed,doSignupFailed,
    doSigninSucceed,doSigninFailed,
    doLogoutSucceed,doShowAuthMessage,
    doGetUserSucceed,doGetUserFailed
    
} from '../actions/User';

function* handleGetUser(){
    try {
        const result = yield call(apiUser.userlist)
        yield put(doGetUserSucceed(result))
    } catch (error) {
        yield put(doGetUserFailed(error))
    }
}
function* handleSignup(action) {
    const {payload} = action;
    try {
        const result = yield call(apiUser.signup,payload);
        yield put(doSignupSucceed(result.data));
    } catch (error) {
        yield put(doSignupFailed(error));
    }
}

function* handleSignin(action) {
    const {payload} = action;
    try {
        const result = yield call(apiUser.signin,payload);
        if (Object.keys(result.data.profile).length === 0){
            yield put(doShowAuthMessage({message : 'user or password not match, try again'}));
        }
        else{
            localStorage.setItem('@token', result.data.token);
            yield put(doSigninSucceed(result.data));
        }
        //localStorage.setItem('@profile', JSON.stringify(result.data.profile));
     
    } catch (error) {
        yield put(doShowAuthMessage({message : 'user or password not match, try again'}));
    }
}

function* handleLogout(action) {
    const {payload} = action;
    try {
        localStorage.clear();
        yield put(doLogoutSucceed(payload));
    } catch (error) {
        yield put(doSignupFailed(error));
    }
}

export  {
    handleSignup,
    handleSignin,
    handleLogout,
    handleGetUser
}