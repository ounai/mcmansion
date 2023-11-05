import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { minTransitUpdateIntervalSeconds } from '../app';

interface TransitSettingsState {
  updateIntervalSeconds: number
  numberOfDepartures: number
}

const defaultState: TransitSettingsState = {
  updateIntervalSeconds: 20,
  numberOfDepartures: 6
};

const localStorageKey = 'transit-settings';
const localStorageValue = localStorage.getItem(localStorageKey);

const initialState: TransitSettingsState = localStorageValue
  ? JSON.parse(localStorageValue) as TransitSettingsState
  : defaultState;

const reducers = {
  setTransitUpdateIntervalSeconds: (state: TransitSettingsState, action: PayloadAction<number>) => {
    state.updateIntervalSeconds = Math.max(minTransitUpdateIntervalSeconds, action.payload);

    localStorage.setItem(localStorageKey, JSON.stringify(state));
  },
  setTransitNumberOfDepartures: (state: TransitSettingsState, action: PayloadAction<number>) => {
    state.numberOfDepartures = action.payload;

    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
};

const transitSettingsSlice = createSlice({
  name: 'transitSettings',
  initialState,
  reducers
});

export const selectTransitUpdateIntervalSeconds = (state: RootState): number =>
  state.transitSettings.updateIntervalSeconds;

export const selectTransitNumberOfDepartures = (state: RootState): number =>
  state.transitSettings.numberOfDepartures;

export const {
  setTransitUpdateIntervalSeconds,
  setTransitNumberOfDepartures
} = transitSettingsSlice.actions;

export default transitSettingsSlice.reducer;
