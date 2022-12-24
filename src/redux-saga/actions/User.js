import * as ActionType from '../constants/User'

export const doSignupRequest = (payload) => ({
    type: ActionType.SIGNUP_REQUEST,
    payload,
});

export const doSignupSucceed = (payload) => ({
    type: ActionType.SIGNUP_SUCCEED,
    payload,
});

export const doSignupFailed = (payload) => ({
    type: ActionType.SIGNUP_FAILED,
    payload,
});

export const doSigninRequest = (payload) => ({
    type: ActionType.SIGNIN_REQUEST,
    payload,
});

export const doSigninSucceed = (payload) => ({
    type: ActionType.SIGNIN_SUCCEED,
    payload,
});

export const doSigninFailed =(payload) => ({
    type: ActionType.SIGNIN_FAILED
})

export const doLogoutRequest = (payload) => ({
    type: ActionType.LOGOUT_REQUEST,
    payload,
});

export const doLogoutSucceed = (payload) => ({
    type: ActionType.LOGOUT_SUCCEED,
    payload,
});
export const doLogoutFailed =(payload) => ({
    type: ActionType.LOGOUT_FAILED
})

export const doShowAuthMessage = (message) => ({
    type: ActionType.SHOW_MESSAGE,
    payload: message
});

export const doGetUserRequest =(payload)=>({
    type : ActionType.GET_USER_REQUEST,
    payload
})

export const doGetUserSucceed =(payload)=>({
    type : ActionType.GET_USER_SUCCEED,
    payload
})
export const doGetUserFailed =(payload) => ({
    type: ActionType.GET_USER_FAILED
})