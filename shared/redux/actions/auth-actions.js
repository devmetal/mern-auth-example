import * as ActionTypes from '../constants/constants';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';

export function requestLogin(creds) {
  return {
    type: ActionTypes.REQUEST_LOGIN,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function loginSuccess(user) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
  };
}

export function loginFailure(message) {
  return {
    type: ActionTypes.LOGIN_FALIURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function requestCheckToken() {
    return {
        type: ActionTypes.REQUEST_CHECK_TOKEN,
        isFetching: true,
        isAuthenticated: false
    };
}

export function tokenValid() {
    return {
        type: ActionTypes.TOKEN_VALID,
        isFetching: false,
        isAuthenticated: true
    };
}

export function tokenInvalid() {
    return {
        type: ActionTypes.TOKEN_INVALID,
        isFetching: false,
        isAuthenticated: false
    };
}

export function checkToken(sToken) {
    return (dispatch) => {
        const token = typeof window === 'undefined' ? sToken : localStorage.getItem('token');
        
        if (!token) {
            return Promise.resolve(dispatch(tokenInvalid()));
        }
        
        dispatch(requestCheckToken());
        return fetch(`${baseURL}/auth/me`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: new Headers({
                'Authorization': `JWT ${token}`
            })
        })
        .then((response) => {
            if (response.status === 401) {
                dispatch(tokenInvalid());
                return Promise.reject();
            }
            return response.json()
        })
        .then((response) => {
            const { user } = response;
            if (!user.ok) {
                dispatch(tokenInvalid());
                return Promise.reject();
            }
            
            dispatch(tokenValid());
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(creds),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      const { user, message } = response;
      if (!user.ok) {
        dispatch(loginFailure(message));
        return Promise.reject(message);
      }

      localStorage.setItem('token', user.token);
      dispatch(loginSuccess(user));
    })
    .catch((err) => {
      console.log(err);
    });
  };
}
