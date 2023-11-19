import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { defaultLocale } from '../app';

interface AppSettingsState {
  locale: 'fi-FI' | 'en-US'
}

const defaultState: AppSettingsState = {
  locale: defaultLocale
};

const localStorageKey = 'app-settings';
const localStorageValue = localStorage.getItem(localStorageKey);

const initialState: AppSettingsState = localStorageValue
  ? JSON.parse(localStorageValue) as AppSettingsState
  : defaultState;

const reducers = {
  setLocale: (state: AppSettingsState, action: PayloadAction<AppSettingsState['locale']>) => {
    state.locale = action.payload;

    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers
});

export const selectLocale = (state: RootState): AppSettingsState['locale'] =>
  state.appSettings.locale;

export const {
  setLocale
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
