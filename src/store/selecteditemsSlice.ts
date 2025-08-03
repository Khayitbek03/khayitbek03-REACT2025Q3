import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SelectedItem = {
  name: string;
  height: number;
  weight: number;
  url: string;
};

interface SelectedState {
  items: SelectedItem[];
}

const initialState: SelectedState = { items: [] };

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<SelectedItem>) {
      const exists = state.items.find((i) => i.name === action.payload.name);
      if (exists) {
        state.items = state.items.filter((i) => i.name !== action.payload.name);
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll(state) {
      state.items = [];
    },
  },
});

export const { toggleItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
