import * as ActionType from '../constants/User';

const INIT_STATE = {
    
    userProfile:{},
    users: [],
    isLogout : false,
    isLoading : true,
    isLoggedIn : false,
    isSuccess: false,
    token : localStorage.getItem('@token'),
    message : ''
}

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_USER_REQUEST:{
            return { ...state }
        }
        case ActionType.GET_USER_SUCCEED:{
            return applyGetUserSucceed(state, action)
        }
        case ActionType.SIGNUP_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionType.SIGNUP_SUCCEED: {
            return applyAddSignupSucceed(state, action)
        }
        case ActionType.SIGNIN_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionType.SIGNIN_SUCCEED: {
            return applyGetSigninSucceed(state, action)
        }
        case ActionType.LOGOUT_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionType.LOGOUT_SUCCEED: {
            return applyGetSignoutSucceed(state, action)
        }
        case ActionType.SIGNUP_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }
        case ActionType.SHOW_MESSAGE: {
            return {
                ...state,
                message : action.payload.message,
                isLoggedIn : false
            };
        }
        default:
            return state;
    }

}

const applyAddSignupSucceed = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.user_email,
        isLoading: false,
        message : '',
        isSuccess: true
    }
}
const applyGetUserSucceed = (state, action) => {
    return {
        ...state,
        users: action.payload,
        isLoading:false
      }
    }

const applyGetSigninSucceed = (state, action) => {
    const { payload } = action;
    const { profile } = payload
    return {
        ...state,
        userProfile: {...profile},
        isLoading: false,
        isLoggedIn : true,
        isLogout : false,
        message : ''
    }
}

const applyGetSignoutSucceed = (state, action) => {
    return {
        ...state,
        userProfile: {
            user_id:"",
            firstname : "",
            lastname : "",
            email : "",
            pass : ""
        },
        isLoading: false,
        isLoggedIn : false,
        isLogout : true,
        message : "",
    }
}


export default userReducer