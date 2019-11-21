import { IWorkout } from "@states/reducers/workout";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

export const NEW_WORKOUT = "NEW_WORKOUT";
export const NEW_WORKOUT_SUCCESS = "NEW_WORKOUT_SUCCESS";
export const NEW_WORKOUT_FAIL = "NEW_WORKOUT_FAIL";

export function newWorkout(workout: IWorkout) {
  console.log(workout)
  return {
    type: NEW_WORKOUT,
    payload: { data: workout }
  };
}

