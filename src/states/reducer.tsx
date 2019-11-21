import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import settingsReducter, { ISettingsState, settingsPersistConfig } from "@states/reducers/settings";
import authReducer, { IAuthState, authPersistConfig } from "./reducers/auth";
import workoutReducer, { workoutPersistConfig, IWorkoutState } from "./reducers/workout";

export interface IAppState {
  auth: IAuthState;
  settings: ISettingsState;
  workout: IWorkoutState;
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducter),
  workout: persistReducer(workoutPersistConfig, workoutReducer)
});
