import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

export interface ElectricityPriceLimits {
  cheap: number
  moderate: number
  expensive: number
  veryExpensive: number
}

interface ElectricityPriceSettingsState {
  margin: number
  limits: ElectricityPriceLimits
}

const defaultState: ElectricityPriceSettingsState = {
  margin: 0,
  limits: {
    cheap: 2,
    moderate: 6,
    expensive: 10,
    veryExpensive: 20
  }
};

const localStorageKey = 'electricity-price-settings';
const localStorageValue = localStorage.getItem(localStorageKey);

const initialState: ElectricityPriceSettingsState = localStorageValue
  ? JSON.parse(localStorageValue) as ElectricityPriceSettingsState
  : defaultState;

interface SetElectricityPriceLimitPayload {
  key: keyof ElectricityPriceSettingsState['limits'],
  value: number
}

const reducers = {
  setElectricityPriceMargin: (state: ElectricityPriceSettingsState, action: PayloadAction<number>) => {
    const rounded = Math.round(action.payload * 100) / 100;

    state.margin = rounded;

    localStorage.setItem(localStorageKey, rounded.toString());
  },
  setElectricityPriceLimit: (state: ElectricityPriceSettingsState, action: PayloadAction<SetElectricityPriceLimitPayload>) => {
    const rounded = Math.round(action.payload.value * 100) / 100;

    state.limits[action.payload.key] = rounded;

    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
};

const electricityPriceSettingsSlice = createSlice({
  name: 'electricityPriceSettings',
  initialState,
  reducers
});

export const selectElectricityPriceMargin = (state: RootState): number =>
  state.electricityPriceSettings.margin;

export const selectElectricityPriceLimits = (state: RootState): ElectricityPriceSettingsState['limits'] =>
  state.electricityPriceSettings.limits;

export const {
  setElectricityPriceMargin,
  setElectricityPriceLimit
} = electricityPriceSettingsSlice.actions;

export default electricityPriceSettingsSlice.reducer;
