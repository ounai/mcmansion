import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { roomNames } from '../app';

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
    state.selections = action.payload;

    localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
  },
  toggleRuuviTagSelection: (state: RuuviTagSelectionsState, action: PayloadAction<string>) => {
    if (!state.selections.find(tag => tag.tagId === action.payload)) {
      state.selections.push({
        tagId: action.payload,
        name: roomNames[0]
      });
    } else {
      state.selections = state.selections.filter(({ tagId }) => tagId !== action.payload);
    }

    localStorage.setItem(localStorageKey, JSON.stringify(state.selections));
  },
  setRuuviTagName: (state: RuuviTagSelectionsState, action: PayloadAction<RuuviTagSelection>) => {
    state.selections = state.selections.map(selection => selection.tagId === action.payload.tagId ? action.payload : selection);

    localStorage.setItem(localStorageKey, JSON.stringify(state.selections));
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
  setRuuviTagSelections,
  toggleRuuviTagSelection,
  setRuuviTagName
} = ruuviTagSelectionsSlice.actions;

export default ruuviTagSelectionsSlice.reducer;
