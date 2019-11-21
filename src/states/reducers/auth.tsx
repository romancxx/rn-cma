import { AxiosResponse } from "axios";
import { AsyncStorage } from "react-native";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "@states/actions/auth";

export const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage
};

export interface IAuthState {
  loading: boolean;
  isAuth: boolean;
  error: any;
}

const initialState: IAuthState = {
  loading: false,
  isAuth: false,
  error: undefined
};

export default function authReducer(
  state: IAuthState = initialState,
  action: { type: string; payload: AxiosResponse; error: any }
): IAuthState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        isAuth: false,
        error: undefined
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        error: undefined
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
