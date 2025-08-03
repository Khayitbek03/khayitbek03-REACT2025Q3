import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Item = {
  name: string;
  height: number;
  weight: number;
};

type SelectedItemsState = {
  items: Item[];
};

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelectItem(state, action: PayloadAction<Item>) {
      const index = state.items.findIndex(
        (item) => item.name === action.payload.name,
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll(state) {
      state.items = [];
    },
  },
});

export const { toggleSelectItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
