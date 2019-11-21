
export const LOCALE_CHANGE = "LOCALE_CHANGE";
export const THEME_CHANGE = "THEME_CHANGE";

export function localeChange(locale: string) {
  return {
    type: LOCALE_CHANGE,
    payload: locale
  };
}

export function themeChange(theme: any) {
  return {
    type: THEME_CHANGE,
    payload: theme
  };
}
