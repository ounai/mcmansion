import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

interface ElectricityPriceMarginState {
  margin: number
}

const localStorageKey = 'electricity-price-margin';
const localStorageValue = localStorage.getItem(localStorageKey);

const initialState: ElectricityPriceMarginState = {
  margin: localStorageValue
    ? Number(localStorageValue)
    : 0
};

const reducers = {
  setElectricityPriceMargin: (state: ElectricityPriceMarginState, action: PayloadAction<number>) => {
    state.margin = action.payload;

    localStorage.setItem(localStorageKey, action.payload.toString());
  }
};

const electricityPriceMarginSlice = createSlice({
  name: 'electricityPriceMargin',
  initialState,
  reducers
});

export const selectElectricityPriceMargin = (state: RootState): number =>
  state.electricityPriceMargin.margin;

export const {
  setElectricityPriceMargin
} = electricityPriceMarginSlice.actions;

export default electricityPriceMarginSlice.reducer;
