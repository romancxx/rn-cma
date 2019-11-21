import { locales, en } from "@locales/index";
import { AsyncStorage } from "react-native";
import { dark } from '@eva-design/eva';
import { LOCALE_CHANGE, THEME_CHANGE } from "@states/actions/settings";

export interface ISettingsState {
  locale: string;
  messages: any;
  theme:any;
}

const initialState: ISettingsState = {
  locale: "en",
  messages: en,
  theme: dark,
};


export const settingsPersistConfig = {
  key: "settings",
  storage: AsyncStorage
};

export default function settingsReducer(
  state: ISettingsState = initialState,
  action: any
) {
  switch (action.type) {
    case LOCALE_CHANGE:
      return {
        ...state,
        locale: action.payload,
        messages: locales[action.payload] || en
      };
      case THEME_CHANGE:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
    }
}
