export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT = "LOGOUT";

export function login(username:string, password:string): any {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    },
  };
}

export function loginSuccess(): any {
  return {
    type: LOGIN_SUCCESS,
    payload: {},
  };
}

export function loginFail(error: any): any {
  return {
    error,
    type: LOGIN_FAIL,
  };
}

export function logout(): any {
  return {
    type: LOGOUT,
  };
}