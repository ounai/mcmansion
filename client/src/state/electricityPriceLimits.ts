import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

export interface ElectricityPriceLimitsState {
  cheap: number
  moderate: number
  expensive: number
  veryExpensive: number
}

const defaultState: ElectricityPriceLimitsState = {
  cheap: 2,
  moderate: 6,
  expensive: 10,
  veryExpensive: 20
};

const getRounded = (n: number): number => Math.round(n * 100) / 100;

const localStorageKey = 'electricity-price-limits';
const localStorageValue = localStorage.getItem(localStorageKey);

const initialState: ElectricityPriceLimitsState = localStorageValue
  ? JSON.parse(localStorageValue) as ElectricityPriceLimitsState
  : defaultState;

interface SetterPayload {
  key: keyof ElectricityPriceLimitsState,
  value: number
}

const reducers = {
  setElectricityPriceLimit: (state: ElectricityPriceLimitsState, action: PayloadAction<SetterPayload>) => {
    const rounded = getRounded(action.payload.value);

    state[action.payload.key] = rounded;

    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
};

const electricityPriceLimitsSlice = createSlice({
  name: 'electricityPriceLimits',
  initialState,
  reducers
});

export const selectElectricityPriceLimits = (state: RootState): ElectricityPriceLimitsState =>
  state.electricityPriceLimits;

export const {
  setElectricityPriceLimit
} = electricityPriceLimitsSlice.actions;

export default electricityPriceLimitsSlice.reducer;
