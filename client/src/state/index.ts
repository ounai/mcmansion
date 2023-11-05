import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

import ruuviTagSelections from './ruuviTagSelections';
import electricityPriceSettings from './electricityPriceSettings';

export const store = configureStore({
  reducer: {
    ruuviTagSelections,
    electricityPriceSettings
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
