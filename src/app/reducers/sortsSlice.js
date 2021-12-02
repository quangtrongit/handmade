import { createSlice } from "@reduxjs/toolkit";

export const sortsSlice = createSlice({
  name: 'sortTerms',
  initialState: '',
  reducers: {
    sortByCategory: (state, action) => {
      console.log(action.payload);
      return action.payload
    }
  }
});
export const selectSortTerms = state => state.sortTerms;

export const { sortByCategory } = sortsSlice.actions;

export default sortsSlice.reducer;