import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

import ruuviTagSelections from './ruuviTagSelections';
import electricityPriceMargin from './electricityPriceMargin';
import electricityPriceLimits from './electricityPriceLimits';

export const store = configureStore({
  reducer: {
    ruuviTagSelections,
    electricityPriceMargin,
    electricityPriceLimits
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
