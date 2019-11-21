import { AxiosResponse } from "axios";
import { AsyncStorage } from "react-native";
import { NEW_WORKOUT, NEW_WORKOUT_SUCCESS, NEW_WORKOUT_FAIL } from "@states/actions/workout";

export interface ISetInfo {
    title: string;
    exercices: IExerciceInfo[];
    id:string;
}

export const durationChoices = [
    { text: 'min' },
    { text: 'sec' },
    { text: '' },
];

export const weightChoices = [
    { text: 'KG' },
    { text: 'LBS' },
    { text: '' },
];

export const InitialDuration: IDurationInfo = {
    unit: "",
    value: ""
}

export const InitialWeight: IWeightInfo = {
    unit: "",
    value: ""
}


export interface IDurationInfo {
    unit: string;
    value: string;
}

export interface IWeightInfo {
    unit: string;
    value: string;
}

export interface IExerciceInfo {
    title: string;
    reps?: string;
    sets?: string;
    rest?: IDurationInfo;
    duration?: IDurationInfo;
    weight?: IWeightInfo;
    id:string;
}


export const workoutPersistConfig = {
    key: "workout",
    storage: AsyncStorage
};

export interface IWorkout {
    workoutInfo: ISetInfo[]
    title:string;
    duration:IDurationInfo;
}

export interface IWorkoutState {
    workouts: IWorkout[]
}

const initialState: IWorkoutState = {
    workouts: [],
};

export default function workoutReducer(
    state: IWorkoutState = initialState,
    action: { type: string; payload: AxiosResponse; error: any }
): IWorkoutState {
    switch (action.type) {
        case NEW_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload.data as IWorkout]
            };

        case NEW_WORKOUT_SUCCESS:
            return {
                ...state,

            };

        case NEW_WORKOUT_FAIL:
            return {
                ...state,

            };

        default:
            return state;
    }
}
