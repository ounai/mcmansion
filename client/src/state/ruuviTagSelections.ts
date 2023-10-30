import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

import type { RuuviTagSelection } from '../ruuviTags';

interface RuuviTagSelectionsState {
  selections: RuuviTagSelection[]
}

const localStorageKey = 'ruuvi-tag-selections';
const localStorageValue = localStorage.getItem(localStorageKey);

const initialState: RuuviTagSelectionsState = {
  selections: localStorageValue
    ? JSON.parse(localStorageValue) as RuuviTagSelection[]
    : []
};

const reducers = {
  setRuuviTagSelections: (state: RuuviTagSelectionsState, action: PayloadAction<RuuviTagSelection[]>) => {
    localStorage.setItem(localStorageKey, JSON.stringify(action.payload));

    state.selections = action.payload;
  }
};

const ruuviTagSelectionsSlice = createSlice({
  name: 'ruuviTagSelections',
  initialState,
  reducers
});

export const selectRuuviTagSelections = (state: RootState): RuuviTagSelection[] =>
  state.ruuviTagSelections.selections;

export const {
  setRuuviTagSelections
} = ruuviTagSelectionsSlice.actions;

export default ruuviTagSelectionsSlice.reducer;
